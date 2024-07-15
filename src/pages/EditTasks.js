import React, { useState, useEffect } from "react";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import {
  cilCheck,
  cilClock,
  cilPencil,
  cilPlus,
  cilTrash,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const EditTasks = ({
  handleIncrementTT,
  handleDecrementTT,
  handleIncrementCT,
  handleDecrementCT,
  handleIncrementPT,
  handleDecrementPT,
}) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [modalVisible, setModalVisibility] = useState(false);
  const [addTasks, setAddTasks] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: "",
    taskName: "",
    startDate: "",
    DueDate: "",
    status: "Pending",
  });

  const [newTask, setNewTask] = useState({
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    taskName: "",
    startDate: "",
    DueDate: "",
    status: "Pending",
  });

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [statusDropdown, setStatusDropdown] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const openEditModal = (task) => {
    setEditedTask(task);
    setModalVisibility(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const { id, taskName, DueDate, startDate, status } = editedTask;
    if (!id || !taskName || !DueDate || !startDate || !status) {
      alert("Please fill out all required fields.");
      return;
    }

    // Validation for taskName (no numbers or special characters)
    if (!/^[a-zA-Z\s]*$/.test(taskName)) {
      alert("Task Name cannot contain numbers or special characters.");
      return;
    }

    // Date validation (basic check for format)
    if (!isValidDate(startDate) || !isValidDate(DueDate)) {
      alert("Invalid date format. Please enter valid dates.");
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === editedTask.id ? { ...editedTask } : task
    );
    setTasks(updatedTasks);
    setModalVisibility(false);
  };

  const isValidDate = (dateString) => {
    // Basic check for date format (YYYY-MM-DD)
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  };

  const openAddModal = () => {
    setNewTask({
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      taskName: "",
      startDate: "",
      DueDate: "",
      status: "Pending",
    });
    setAddTasks(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const { taskName, DueDate, startDate, status } = newTask;
    if (!taskName || !DueDate || !startDate || !status) {
      alert("Please fill out all required fields.");
      return;
    }

    // Validation for taskName (no numbers or special characters)
    if (!/^[a-zA-Z\s]*$/.test(taskName)) {
      alert("Task Name cannot contain numbers or special characters.");
      return;
    }

    // Date validation (basic check for format)
    if (!isValidDate(startDate) || !isValidDate(DueDate)) {
      alert("Invalid date format. Please enter valid dates.");
      return;
    }

    setTasks([...tasks, newTask]);
    setAddTasks(false);
    handleIncrementTT();
    handleIncrementPT();
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "edit") {
      setEditedTask((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (type === "add") {
      setNewTask((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const closeModal = () => {
    setModalVisibility(false);
    setAddTasks(false);
  };

  const openConfirmDeleteModal = (id) => {
    setTaskToDelete(id);
    setConfirmDeleteVisible(true);
  };

  const handleDeleteConfirm = (confirm) => {
    if (confirm) {
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
      setTasks(updatedTasks);
      alert("Task will be deleted.");
    } else {
      alert("Task deletion canceled.");
    }
    setConfirmDeleteVisible(false);
    setTaskToDelete(null);
    handleDecrementTT();
    // Update counts based on previous and new status
    const deletedTask = tasks.find((task) => task.id === taskToDelete);
    const e = deletedTask.status;
    switch (e) {
      case "Completed":
        handleDecrementCT(); // Decrement completed tasks
        break;
      case "Pending":
        handleDecrementPT(); // Decrement pending tasks
        break;
      default:
        break;
    }
  };

  const handleStatusSelect = (status, taskId) => {
    // Find the task being updated in the tasks array
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    // Determine previous status
    const prevStatus = taskToUpdate.status;

    // Update the task in the tasks array
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
    setStatusDropdown(null);

    // Update counts based on previous and new status
    switch (prevStatus) {
      case "Completed":
        handleDecrementCT(); // Decrement completed tasks
        break;
      case "Pending":
        handleDecrementPT(); // Decrement pending tasks
        break;
      default:
        break;
    }

    switch (status) {
      case "Completed":
        handleIncrementCT(); // Increment completed tasks
        break;
      case "Pending":
        handleIncrementPT(); // Increment pending tasks
        break;
      default:
        break;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CIcon icon={cilCheck} />;
      case "Pending":
        return <CIcon icon={cilClock} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="tableContainer">
        <CTable striped hover responsive className="mt-4">
          <CTableHead className="sticky-header">
            <CTableRow>
              <CTableHeaderCell>
                <span className="table_header">TaskName</span>
              </CTableHeaderCell>
              <CTableHeaderCell>
                <span className="table_header">startDate</span>
              </CTableHeaderCell>
              <CTableHeaderCell>
                <span className="table_header">DueDate</span>
              </CTableHeaderCell>
              <CTableHeaderCell>
                <span className="table_header">Edit</span>
              </CTableHeaderCell>
              <CTableHeaderCell>
                <span className="table_header">Delete</span>
              </CTableHeaderCell>
              <CTableHeaderCell>
                <span className="table_header">Status</span>
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {tasks.map((task) => (
              <CTableRow key={task.id}>
                <CTableDataCell className="table_data_cell">
                  {task.taskName}
                </CTableDataCell>
                <CTableDataCell className="table_data_cell">
                  {task.startDate}
                </CTableDataCell>
                <CTableDataCell className="table_data_cell">
                  {task.DueDate}
                </CTableDataCell>
                <CTableDataCell className="table_data_cell">
                  <CButton size="sm" onClick={() => openEditModal(task)}>
                    <CIcon className="edit_icon" icon={cilPencil} size="xl" />
                  </CButton>
                </CTableDataCell>
                <CTableDataCell className="table_data_cell">
                  <CButton
                    size="sm"
                    onClick={() => openConfirmDeleteModal(task.id)}
                  >
                    <CIcon className="edit_icon" icon={cilTrash} size="xl" />
                  </CButton>
                </CTableDataCell>
                <CTableDataCell className="table_data_cell">
                  <CDropdown
                    className="m-0"
                    visible={statusDropdown === task.id}
                    onClick={() =>
                      setStatusDropdown(
                        statusDropdown === task.id ? null : task.id
                      )
                    }
                  >
                    <CDropdownToggle
                      style={{ borderColor: "#800020" }}
                      onClick={() => setStatusDropdown(task.id)}
                    >
                      {getStatusIcon(task.status)}
                    </CDropdownToggle>
                    <CDropdownMenu placement="bottom-start">
                      <CDropdownItem
                        onClick={() => handleStatusSelect("Completed", task.id)}
                        active={
                          task.id === selectedTaskId &&
                          selectedStatus === "Completed"
                        }
                      >
                        <CIcon icon={cilCheck} /> Completed
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => handleStatusSelect("Pending", task.id)}
                        active={
                          task.id === selectedTaskId &&
                          selectedStatus === "Pending"
                        }
                      >
                        <CIcon icon={cilClock} /> Pending
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <div style={{ textAlign: "center" }}>
          <CButton
            size="sm"
            style={{ borderRadius: "12px", backgroundColor: "#3498db" }}
            onClick={openAddModal}
          >
            <CIcon className="edit_icon" icon={cilPlus} size="xl" />
            <span>Add Task</span>
          </CButton>
        </div>
      </div>

      <CModal
        visible={modalVisible}
        onClose={closeModal}
        size="lg"
        centered
        backdrop="static"
      >
        <CModalHeader closeButton>
          <CModalTitle>Edit Task</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditSubmit}>
            <CFormLabel htmlFor="taskName">TaskName</CFormLabel>
            <CFormInput
              type="text"
              id="taskName"
              name="taskName"
              value={editedTask.taskName}
              onChange={(e) => handleInputChange(e, "edit")}
              required
            />
            <CFormLabel htmlFor="startDate">startDate</CFormLabel>
            <CFormInput
              type="text"
              id="startDate"
              name="startDate"
              value={editedTask.startDate}
              onChange={(e) => handleInputChange(e, "edit")}
              required
            />
            <CFormLabel htmlFor="DueDate">DueDate</CFormLabel>
            <CFormInput
              type="text"
              id="DueDate"
              name="DueDate"
              value={editedTask.DueDate}
              onChange={(e) => handleInputChange(e, "edit")}
              required
            />
            <CButton type="submit" color="primary">
              Save Changes
            </CButton>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={addTasks}
        onClose={closeModal}
        size="lg"
        centered
        backdrop="static"
      >
        <CModalHeader closeButton>
          <CModalTitle>Add New Task</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleAddSubmit}>
            <CFormLabel htmlFor="taskName">TaskName</CFormLabel>
            <CFormInput
              type="text"
              id="taskName"
              name="taskName"
              value={newTask.taskName}
              onChange={(e) => handleInputChange(e, "add")}
              required
            />
            <CFormLabel htmlFor="startDate">startDate</CFormLabel>
            <CFormInput
              type="text"
              id="startDate"
              name="startDate"
              value={newTask.startDate}
              onChange={(e) => handleInputChange(e, "add")}
              required
            />
            <CFormLabel htmlFor="DueDate">DueDate</CFormLabel>
            <CFormInput
              type="text"
              id="DueDate"
              name="DueDate"
              value={newTask.DueDate}
              onChange={(e) => handleInputChange(e, "add")}
              required
            />

            <CButton type="submit" color="primary">
              Add Task
            </CButton>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        visible={confirmDeleteVisible}
        onClose={() => setConfirmDeleteVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this task?</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => handleDeleteConfirm(true)}>
            Yes, Delete
          </CButton>
          <CButton color="secondary" onClick={() => handleDeleteConfirm(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default EditTasks;
