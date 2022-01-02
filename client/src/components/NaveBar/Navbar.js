import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-brand btn">Electricity Billing System</button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {props.page !== "Home" && (
                <button className="nav-link btn">
                  Home
                </button>
              )}
            </li>
            <li className="nav-item">
              {props.page !== "Add User" && (
                <button  className="nav-link btn">
                  Add User
                </button>
              )}
            </li>
            <li className="nav-item">
              {props.page !== "View User" && (
                <button  className="nav-link btn">
                  View Users
                </button>
              )}
            </li>

            <li className="nav-item">
              {props.page !== "Create Bill" && (
                <button  className="nav-link btn">
                  Create Bill
                </button>
              )}
            </li>
            <li className="nav-item">
              {props.page !== "View Bill" && (
                <button className="nav-link btn">
                  View Bills
                </button>
              )}
            </li>
            <li className="nav-item">
              {props.page !== "Update Zone" && (
                <button  className="nav-link btn">
                  History
                </button>
              )}
            </li>
            <li className="nav-item">
              {props.page !== "Create Zone" && (
                <button o className="nav-link btn">
                  Create Zone
                </button>
              )}
            </li>
            <li className="nav-item">
              <button  className="nav-link btn">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
