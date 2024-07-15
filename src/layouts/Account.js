import React from "react";
import { useAuth } from "../pages/Authenticate";
import { useNavigate } from "react-router-dom";
import EditTasks from "../pages/EditTasks";

const Account = ({
  handleIncrementTT,
  handleDecrementTT,
  handleIncrementCT,
  handleDecrementCT,
  handleIncrementPT,
  handleDecrementPT,
}) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };
  return (
    <div>
      <p style={{ color: "white", fontSize: "30px", fontWeight: 500 }}>
        Welcome {auth.user}
      </p>
      <EditTasks
        handleIncrementTT={handleIncrementTT}
        handleDecrementTT={handleDecrementTT}
        handleIncrementCT={handleIncrementCT}
        handleDecrementCT={handleDecrementCT}
        handleIncrementPT={handleIncrementPT}
        handleDecrementPT={handleDecrementPT}
      />
      <button onClick={handleLogout} className="email">
        Logout
      </button>
    </div>
  );
};

export default Account;
