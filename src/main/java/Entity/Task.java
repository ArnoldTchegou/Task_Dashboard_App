package Entity;

import Enum.Status;
import Exceptions.InvalidDateFormatException;
import Exceptions.InvalidNameLength;
import Util.EntityManagerUtil;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Access(AccessType.FIELD)
@IdClass(TaskPrimaryKey.class)
@Entity
@Table(name = "task")
public class Task {
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Id
    @Column(name = "task_id")
    private int taskid;

    @Id
    @Column(name = "Task_Name", length = 10)
    private String taskName;

    @Column(name = "Task_Description", length = 20)
    private String taskDescription;

    @Column(name = "Task_start_Date")
    private LocalDate taskstartDate;

    @Column(name = "Task_end_Date")
    private LocalDate taskendDate;

    @Column(name = "Task_Status", length = 10)
    @Enumerated(EnumType.STRING)
    private Status taskStatus;

    public AppUser getUser() {
        return user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }


    @OneToOne(mappedBy = "task")
    private AppUser user;

    @Transient
    private static EntityManager entityManager = EntityManagerUtil.getEntityManager();

    @PrePersist
    public void prePersist() {
        if (this.taskid == 0) {
            Integer maxId = (Integer) entityManager.createQuery(
                    "SELECT COALESCE(MAX(t.taskid), 0) FROM Task t"
            ).getSingleResult();
            this.setTaskid(maxId + 1);
        }
        entityManager.close();
    }

    private void setTaskid(int taskid) {
        this.taskid = taskid;
    }


    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) throws InvalidNameLength {
        try {
            validateNameLength(taskName, 10);
            this.taskName = taskName;
        }
        catch (InvalidNameLength e) {
            throw new InvalidNameLength(e.getMessage());
        }
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) throws InvalidNameLength {
        try {
            this.validateNameLength(taskDescription, 20);
            this.taskDescription = taskDescription;
        }
        catch (InvalidNameLength e) {
            throw new InvalidNameLength(e.getMessage());
        }

    }

    public LocalDate getTaskstartDate() {
        return taskstartDate;
    }

    public void setTaskstartDate(LocalDate taskstartDate) throws InvalidDateFormatException {
        this.taskstartDate = validateDate(taskstartDate.toString());
    }

    public LocalDate getTaskendDate() {
        return taskendDate;
    }

    public void setTaskendDate(LocalDate taskendDate) throws InvalidDateFormatException{
        this.taskendDate = validateDate(taskendDate.toString());
    }

    public int getTaskid() {
        return taskid;
    }

    /**
     * Validates if the input Name has correct length.
     * @param name The date string to validate.
     * @throws InvalidNameLength if the date length is incorrect.
     */
    public void validateNameLength(String name, int length) throws InvalidNameLength {
        if (name.length() > length) {
            throw new InvalidNameLength("parameter " +name+ " is too long for size " + length);
        }
    }

    /**
     * Validates if the input date string matches the format "yyyy-MM-dd".
     * @param dateStr The date string to validate.
     * @return LocalDate if valid.
     * @throws InvalidDateFormatException if the date format is incorrect.
     */
    public static LocalDate validateDate(String dateStr) throws InvalidDateFormatException {
        try {
            // Parse the date using the specified formatter
            return LocalDate.parse(dateStr, DATE_FORMATTER);
        } catch (DateTimeParseException e) {
            // Throw custom exception if parsing fails
            throw new InvalidDateFormatException("Invalid date format. Expected format is yyyy-MM-dd.");
        }
    }

    public Status getTaskStatus() {
        return taskStatus;
    }

    /**
     * Sets the task status based on the provided index.
     * @param statusidx The index of the status (0: ONGOING, 1: COMPLETED, 2: PENDING).
     * @throws IndexOutOfBoundsException if the index is invalid.
     */
    public void setTaskStatus(int statusidx) {
        Status[] statuses = Status.values();
        if (statusidx < 0 || statusidx >= statuses.length) {
            throw new IndexOutOfBoundsException("Invalid status index: " + statusidx);
        }
        this.taskStatus = statuses[statusidx];
    }

    public String toString(){
        return taskName + ": " + taskDescription+" : " + taskstartDate + " : " + taskendDate + " : " + taskStatus;
    }
}
