import React from "react";
import { NavLink, Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1 style={{ color: "white", fontSize: "40px", fontWeight: 700 }}>
            Task Manager
          </h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="account">Account</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
