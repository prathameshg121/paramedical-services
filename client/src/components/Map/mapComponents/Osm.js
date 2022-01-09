import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import healthFacilities from "../data/healthServices.json";
import SearchControler from "./SearchControler";
import SearchBoxState from "./SearchBoxState";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "./constants";
import DataInRadius from "./DataInRadius";
import RequestService from "../../HomePage/Request/RequestService";

export default function Osm(props) {
  const [servicetype, setservicetype] = useState("");

  const [latlongDisplay, setlatlongDisplay] = useState("");

  let [state, setstate] = useState("");

  let [serv, setserv] = useState({});

  let [filterData, setfilterData] = useState([]);

  let [BloodData, setBloodData] = useState([]);
  let [VaccinData, setVaccinData] = useState([]);

  let [radiusValue, setradiusValue] = useState(100);
  const [nearByMe, setnearByMe] = useState(false);
  let userLat = "";
  let userLong = "";
  function getBloodData() {
    axios
      .get(`http://localhost:5000/service/bloodservice`)
      .then((res) => {
        console.log("healthFacilities found blood ");
        console.log(res.data[0]);
        setfilterData(res.data);
        setBloodData(res.data);
        setservicetype("Blood");
      })
      .catch((error) => {
        console.log("Blood Data not found");
      });
  }

  function getVacciData() {
    axios
      .get(`http://localhost:5000/covidservice/covidVacc`)
      .then((res) => {
        console.log("healthFacilities found blood ");
        console.log(res.data[0].Longitude);
        setfilterData(res.data);
        setVaccinData(res.data);
        setservicetype("Vaccination");
      })
      .catch((error) => {
        console.log("vaccin Data not found");
      });
  }

  function getRequestData() {
    axios
      .get(`http://localhost:5000/request/getAllRequest`)
      .then((res) => {
        console.log("healthFacilities found blood ");
        console.log(res.data[0].Longitude);
        setfilterData(res.data);
        //  setVaccinData(res.data)
        //  setservicetype("Vaccination")
      })
      .catch((error) => {
        console.log("Request Data not found");
      });
  }
  function getRequestDataByDate() {
    let SelectedDate = new Date(2012, 7, 15)
    console.log(Dateval)
    var data = {
      date : Dateval
    }
    axios
      .post(`http://localhost:5000/request/getrequestbydate`, data)
      .then((res) => {
        console.log("healthFacilities found req by date ");
        console.log(res.data);
        setfilterData(res.data);
        //  setVaccinData(res.data)
        //  setservicetype("Vaccination")
      })
      .catch((error) => {
        console.log("get req by date Data not found");
      });
  }
  //   useEffect(() => { 

  // }, [])


  function getRequestByService() {
   
    var data = {
      date : Dateval
    }
    axios
      .post(`http://localhost:5000/request/getrequestbydate`, data)
      .then((res) => {
        console.log("healthFacilities found req by facility ");
        console.log(res.data[0].Longitude);
        setfilterData(res.data);
        //  setVaccinData(res.data)
        //  setservicetype("Vaccination")
      })
      .catch((error) => {
        console.log("get req by facility not found");
      });
  }

  let [availabilityCount, setavailabilityCount] = useState(0);



  // --------------------------------------------------------------------
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        console.log(radius);
        const circle = L.circle(e.latlng, 100);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);
    userLat = bbox[1];
    userLong = bbox[0];
    const obje = {
      Latitude: userLat,
      Longitude: userLong,
    };
    // props.setlat(obje)

    console.log(bbox[1] + "box 1");

    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>
          You are here. <br />
          Map bbox: <br />
          <b>Southwest lng</b>: {bbox[0]} <br />
          <b>Southwest lat</b>: {bbox[1]} <br />
          <b>Northeast lng</b>: {bbox[2]} <br />
          <b>Northeast lat</b>: {bbox[3]}
        </Popup>
        {false ? <RequestService Lat={bbox[1]} Long={bbox[0]} /> : ""}
      </Marker>
    );
  }

  //   // -----------------------distance------

  function getDataUnderRadi() {
    if (servicetype === "Blood") {
      setfilterData(BloodData);
    } else {
      setfilterData(VaccinData);
    }
    setavailabilityCount(0);
    let count = 0;
    setfilterData((prevData) => {
      return prevData.filter((currUrser, index) => {
        // console.log(userLat +" latlong " +userLong )
        let getRadius = distance(
          currUrser.Latitude,
          userLat,
          currUrser.Longitude,
          userLong
        );

        // console.log(radiusValue >= getRadius)
        // if(radiusValue >= getRadius){
        //   count = count +1;
        //   console.log(getRadius + " radius " + radiusValue + " " + count);
        //   setavailabilityCount(count/2);
        // }

        return radiusValue >= getRadius;
      });
    });
  }
  function getLatLong(latLong) {
    console.log("this is the lata long");
    console.log(latLong);
    if (servicetype === "Blood") {
      setfilterData(BloodData);
    } else {
      setfilterData(VaccinData);
    }
    setavailabilityCount(0);
    let count = 0;
    setfilterData((prevData) => {
      return prevData.filter((currUrser, index) => {
        let getRadius = distance(
          currUrser.Latitude,
          latLong.latitude,
          currUrser.Longitude,
          latLong.longitude
        );
        // console.log(getRadius + " radius");
        // console.log(latLong.radius >= getRadius)
        // if(latLong.radius >= getRadius){
        //   count = count +1;
        //   console.log(getRadius + " radius " + latLong.radius + " " + count);
        //   setavailabilityCount(count/2);
        // }
        return latLong.radius >= getRadius;
      });
    });
  }

  function distance(lat1, lat2, lon1, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return c * r;
  }

  function handleRadiusChange(event) {
    setradiusValue(event.target.value);
  }

  function handleNearby() {
    setnearByMe(!nearByMe);
  }

  function handleLatLongDisplay() {
    setlatlongDisplay(!latlongDisplay);
  }
  
  const [Dateval, setDateval] = useState({
    dateval : new Date()})
  function handleDateVal(event){
setDateval(event.target.value)
  }
  const [findbyDate, setfindbyDate] = useState(false)
  function showfindByDateBox(){
 setfindbyDate(!findbyDate)
  }

  return (
    <div>
      {/* 
      <SearchBoxState getState={setState} />
     
     
    */}

      <div>
        <div class="sidebar">
         

          <a
            style={{ color: "#3edbf0", cursor: "pointer" }}
            onClick={getVacciData}
          >
            Vaccin Center
          </a>

          <a
            style={{ color: "#3edbf0", cursor: "pointer" }}
            onClick={getBloodData}
          >
            Blood Center
          </a>

          <hr />
          <a class="button round blue" onClick={handleNearby}>
            Find Nearby
          </a>
          {nearByMe ? (
            <div class="near-by-container">
              <p style={{ color: "#3edbf0" }}>Near by services</p>
              <h6>Enter Radius in Km</h6>
              <input onChange={handleRadiusChange} value={radiusValue}></input>
              <button onClick={getDataUnderRadi} style={{ color: "black" }}>
                Find
              </button>
            </div>
          ) : (
            ""
          )}

          <a
            class="button round blue"
            style={{ width: "50%" }}
            onClick={handleLatLongDisplay}
          >
            Find By LatLong
          </a>
          {latlongDisplay ? (
            <div class="near-by-container">
              <h4>Enter Coordinate details to Find Health Facilities </h4>
              <DataInRadius sendLatLong={getLatLong} />
            </div>
          ) : (
            ""
          )}

          <hr style={{ height: "10px", background: "blcak" }} />
          <h4>User Request</h4>
          <a
            style={{ color: "#3edbf0", cursor: "pointer" }}
            onClick={getRequestData}
          >
            Request Service
          </a>
            <hr/>
          <a
            class="button round blue"
            style={{ width: "50%" }}
            onClick={showfindByDateBox}
          >Find By Date </a>
          {
            findbyDate ? (
              <div class="near-by-container">
              <h4>Find Till the date </h4>
              <input type="date" onChange={handleDateVal} value={Dateval}></input>
              <button
          style={{color:"black"}}
            onClick={getRequestDataByDate}
          >
            Find
          </button>
            </div>
            ) : ("")
          }
        
        </div>

        <div class="content" id="home">
          <h2>{servicetype} Services</h2>
          {/* <h3>Availability : {availabilityCount}</h3> */}
          <MapContainer
            center={[17.3674, 76.5359]}
            zoom={7.2}
            scrollWheelZoom={true}
          >
            <SearchControler />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filterData.map((serviceData) => (
              <Marker
                key={serviceData.Sr_No}
                position={[serviceData.Latitude, serviceData.Longitude]}
                icon={icon}
              >
                <Popup position={[serviceData.Latitude, serviceData.Longitude]}>
                  <div>
                    <h2 style={{ color: "red" }}>{serviceData.serviceName}</h2>
                    <h4>{serviceData.State}</h4>
                    <h4>{serviceData.Pincode}</h4>
                    <h4>{serviceData.email}</h4>
                    <h4>{serviceData.Health_Facility_Name}</h4>
                    <h4>{serviceData.District}</h4>
                    <h4>{serviceData.Block_Name}</h4>
                    <h4>{serviceData.Address}</h4>
                    <h4>{serviceData.Date}</h4>
                    <h4>{serviceData.Latitude}</h4>
                    <h4>{serviceData.Longitude}</h4>
                    
                  </div>
                </Popup>
              </Marker>
            ))}
            <LocationMarker />
          </MapContainer>
          <div id="Info">{/* <Home/> */}</div>
          <div className="about-container-div" id="about">
            {/* <About/> */}
          </div>
        </div>
      </div>
    </div>
  );
}
