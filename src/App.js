import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Account from "./layouts/Account";
import { RequireAuth } from "./pages/RequireAuth";
import { Login } from "./pages/Login";
import "./scss/style.scss";

const App = () => {
  // Initialize taskReview with default values if not found in localStorage
  const [taskReview, setTaskReview] = useState(() => {
    const savedTasks = localStorage.getItem("taskReview");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return {
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
      };
    }
  });

  // Save taskReview to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("taskReview", JSON.stringify(taskReview));
  }, [taskReview]);

  const handleIncrementTT = () => {
    setTaskReview((prev) => ({
      ...prev,
      totalTasks: prev.totalTasks + 1,
    }));
  };

  const handleDecrementTT = () => {
    setTaskReview((prev) => ({
      ...prev,
      totalTasks: prev.totalTasks - 1,
    }));
  };

  const handleIncrementCT = () => {
    setTaskReview((prev) => ({
      ...prev,
      completedTasks: prev.completedTasks + 1,
    }));
  };

  const handleDecrementCT = () => {
    setTaskReview((prev) => ({
      ...prev,
      completedTasks: prev.completedTasks - 1,
    }));
  };

  const handleIncrementPT = () => {
    setTaskReview((prev) => ({
      ...prev,
      pendingTasks: prev.pendingTasks + 1,
    }));
  };

  const handleDecrementPT = () => {
    setTaskReview((prev) => ({
      ...prev,
      pendingTasks: prev.pendingTasks - 1,
    }));
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home taskReview={taskReview} />} />
        <Route
          path="account"
          element={
            <RequireAuth>
              <Account
                handleIncrementTT={handleIncrementTT}
                handleDecrementTT={handleDecrementTT}
                handleIncrementCT={handleIncrementCT}
                handleDecrementCT={handleDecrementCT}
                handleIncrementPT={handleIncrementPT}
                handleDecrementPT={handleDecrementPT}
              />
            </RequireAuth>
          }
        />
        <Route path="login" element={<Login />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
