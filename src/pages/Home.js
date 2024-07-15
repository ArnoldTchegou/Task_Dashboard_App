import React from "react";
import { CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react";

const Home = ({ taskReview }) => {
  return (
    <CRow className="justify-content-center">
      <CCol md="8">
        <CCard>
          <CCardHeader style={{ backgroundColor: "#0000FF" }}>
            <h3 style={{ color: "white", fontSize: "30px", fontWeight: 500 }}>
              Today's Overview
            </h3>
          </CCardHeader>
          <CCardBody>
            <p>
              <strong style={{ color: "black" }}>Total Tasks:</strong>{" "}
              <span
                style={{ color: "blue", fontSize: "30px", fontWeight: 500 }}
              >
                {taskReview.totalTasks}
              </span>
            </p>
            <p>
              <strong style={{ color: "black" }}>Completed Tasks:</strong>{" "}
              <span
                style={{ color: "blue", fontSize: "30px", fontWeight: 500 }}
              >
                {taskReview.completedTasks}
              </span>
            </p>
            <p>
              <strong style={{ color: "black" }}>Pending Tasks:</strong>{" "}
              <span
                style={{
                  color: "blue",
                  fontSize: "30px",
                  fontWeight: 500,
                }}
              >
                {taskReview.pendingTasks}
              </span>
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Home;
