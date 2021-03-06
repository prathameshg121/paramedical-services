import React from "react";
import { useHistory } from "react-router";

import PropTypes from 'prop-types'
import { ContactUs } from "../ContactUs/ContactUs";


export default function Header(props) {
  let history = useHistory();
  function toContactUs(){
    history.push("./ContactUs")
  }

  function goToHome(){
    history.push("./")
  }
  function goToMap(){
    history.push("./map");
  }

  function goToRequest(){
    history.push("./requestService");
  }
  function goToServices(){
    history.push("./Services");
  }

  

  return (
    <div >
      <nav className=" header4 navbar navbar-sm navbar-expand-lg navbar-dark bg-dark h-5 ">
        <div className="container-fluid">
          <a className="my-0 h-100" href="#">
               
                <img src={require('./logo.jpg').default} height={50} width={100} />            
                {/* ParaHelp */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 ml-auto mr-3 mb-lg-0 style={}">
              <li className="nav-item">
                <a className="nav-link active"  aria-current="page" href="#" onClick={goToHome}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={goToMap}>
                  Map
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={goToRequest}>
                  Request
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={goToServices}>
                  Services
                </a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={toContactUs} href="#">
                  Contact Us
                </a>
              </li>

              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li> */}
            </ul>

            {props.searchBar? <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> : ""}
          </div>
        </div>
      </nav>
    </div>
  );
}


Header.defaultProps = {
    title : "ParaHelp",
    searchBar : false
}

Header.propTypes ={
    title : PropTypes.string,
    searchBar :PropTypes.bool.isRequired
}