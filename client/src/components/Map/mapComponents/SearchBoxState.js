import React, { useState } from "react";

export default function SearchBox(props) {
  const [stateName, setstateName] =  useState({
    state :"All",
    service: "All"
  });

  function handleChange(event) {
    console.log(event.target.value + "this is event value");
    const {name, value} = event.target
    setstateName(
      (prev)=>{
        return{
          ...prev,
          [name] :value
        }
      }
    );
  }
  function handleClick() {
    console.log(stateName + " state 7777777777777");
    props.getState(stateName);
  }

  return (
    <div className="searchBoxStyle">
    <div className="serch-items">
    <h4>Search by State</h4>
      <select
        class="form-select"
        onChange={handleChange}
        aria-label="Default select example"
        name="state"
      >
        <option selected>All</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Karnataka">Karnataka</option>
      </select>
</div>
<div className="serch-items">
      <h4>Search by Facility</h4>
      <select
        class="form-select"
       onChange={handleChange}
        aria-label="Default select example"
        name="service"
      >
        <option selected>All</option>
        <option value="Community Health Center">Community Health Center</option>
        <option value="SubCentre">SubCentre</option>
        <option value="Primary Health Centre">Primary Health Centre</option>
        <option value="District Hospital">District Hospital</option>
        <option value="Medical Colleges Hospital">Medical Colleges Hospital</option>
        <option value="Urban Health Centre">Urban Health Centre</option>
        <option value="M&CW Center">M&CW Center</option>
        <option value="Post Partum Unit">Post Partum Unit</option>
        <option value="Others">Others</option>
      </select>

      
</div>
<button type="button search-button" class="btn btn-primary" onClick={handleClick}><i class="fas fa-search"></i></button>
    </div>
  );
}
