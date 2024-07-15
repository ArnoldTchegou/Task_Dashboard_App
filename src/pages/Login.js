import React, { useState } from "react";
import { useAuth } from "./Authenticate";
import { useNavigate, useLocation } from "react-router-dom";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilEnvelopeClosed } from "@coreui/icons";

export const Login = () => {
  const [user, setUser] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  const handleLogin = () => {
    auth.login(user);
    navigate(redirectPath, { replace: true });
  };

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <div className="heading">Task Manager</div>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                      className="text-body-secondary"
                    >
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText className="inputicons">
                        <CIcon
                          size={"xl"}
                          icon={cilEnvelopeClosed}
                          className="icons"
                        />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e) => setUser(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={5}>
                        <div>
                          <CButton
                            className="email"
                            type="button"
                            onClick={handleLogin}
                          >
                            Login
                          </CButton>
                        </div>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white login-background py-5"
                style={{ width: "44%", backgroundColor: "#0000FF" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <div className="signup">Sign up</div>
                    <span style={{ fontSize: "18px", fontWeight: 500 }}>
                      Welcome to Your Task Manager
                    </span>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
