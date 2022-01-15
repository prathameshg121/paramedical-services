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
import SideContainer from "./SideContainer";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
// import "./Header.css";


export default function Osm(props) {
  const [servicetype, setservicetype] = useState("");

  const [latlongDisplay, setlatlongDisplay] = useState("");

  let [stateval, setstate] = useState("");

  let [serv, setserv] = useState({});

  let [filterData, setfilterData] = useState([]);

  let [BloodData, setBloodData] = useState([]);
  let [VaccinData, setVaccinData] = useState([]);

  let [radiusValue, setradiusValue] = useState(100);
  const [nearByMe, setnearByMe] = useState(false);
  const [districtshow, setdistrictshow] = useState(false)
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
         setservicetype("Request")
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
        // console.log(res.data);
        setfilterData(res.data);
        //  setVaccinData(res.data)
        //  setservicetype("Vaccination")
      })
      .catch((error) => {
        console.log("get req by date Data not found");
      });
  }
  //   useEffect(() => { getrequestbyservice

  // }, [])


  function getRequestByState() {
   
    var data = {
      district : stateval
    }
    console.log("data + of state " + stateval);
    axios
      .post(`http://localhost:5000/request/getrequestbysatate`, data)
      .then((res) => {
        console.log("healthFacilities found req by facility ");
        console.log(res.data);
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
        // console.log(radius);
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

    // console.log(bbox[1] + "box 1");

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

        console.log(radiusValue >= getRadius)
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


  function handleStateChange(event){
    setstate(event.target.value);
  }
  function displaystateblock(){
    setdistrictshow(!districtshow)
  }
      //create initial menuCollapse state using useState hook
      const [menuCollapse, setMenuCollapse] = useState(false)

      //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
      //condition checking to change state from true to false and vice versa
      menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const [showservices, setshowservices] = useState(false)

    function showDropDownOfService(){
  setshowservices(!showservices)
    }

    const [showSearchItems, setshowSearchItems] = useState(false)
    function showSearchIcon(){
      setshowSearchItems(!showSearchItems);
    }

    const [DisplayRequest, setDisplayRequest] = useState(false)

    function showRequest(){
      setDisplayRequest(!DisplayRequest);
    }

    const [DisplaySearchOfReq, setDisplaySearchOfReq] = useState(false)
    function showSearchRequestshow(){
      setDisplaySearchOfReq(!DisplaySearchOfReq)
    }

  return (
    <div>
   {/* <SideContainer/> */}

   
      <div>
{/*     
        <div class="sidebar">
         

          <a
            style={{ color: "#3edbf0", cursor: "pointer" }}
            onClick={getVacciData}
          >
            Vaccine Center
          </a>

          <a
            style={{ color: "#3edbf0", cursor: "pointer" }}
            onClick={getBloodData}
          >
            Blood Center
          </a>

          <hr />
         
          {nearByMe ? (
            <div class="near-by-container">
              <p style={{ color: "#3edbf0" }}>Near by services</p>
              <h6 style={{ color: "#3edbf0" }}>Enter Radius in Km</h6>
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
              <h4>Find From the date </h4>
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


          <a
            class="button round blue"
            style={{ width: "50%" }}
            onClick={displaystateblock}
          >Find By District </a>
            {
              districtshow?(
                <div class="near-by-container">
              <h4>Find by state </h4>
              <select
        class="form-select nnnm"
        onChange={handleStateChange}
        aria-label="Default select example"
        name="state"
        
       
      >
        <option selected>All</option>
        <option value="Ahmednagar">Ahmednagar</option>
        <option value="Akola">Akola</option>
        <option value="Amravati">Amravati</option>
        <option value="Aurangabad">Aurangabad</option>
        <option value="Beed">Beed</option>
        <option value="Bhandara">Bhandara</option>
        <option value="Buldhana">Buldhana</option>
        <option value="Chandrapur">Chandrapur</option>
        <option value="Dhule">Dhule</option>
        <option value="Gadchiroli">Gadchiroli</option>
        <option value="Gondia">Gondia</option>
        <option value="Hingoli">Hingoli</option>
        <option value="Jalgaon">Jalgaon</option>
        <option value="Jalna">Jalna</option>
        <option value="Kolhapur">Kolhapur</option>
        <option value="Latur">Latur</option>
        <option value="Mumbai-City">Mumbai-City</option>
        <option value="Mumbai-Suburban">Mumbai-Suburban</option>
        <option value="Nagpur">Nagpur</option>
        <option value="Nanded">Nanded</option>
        <option value="Nandurbar">Nandurbar</option>
        <option value="Osmanabad">Osmanabad</option>
        <option value="Palghar">Palghar</option>
        <option value="Parbhani">Parbhani</option>
        <option value="Pune">Pune</option>
        <option value="Raigad">Raigad</option>
        <option value="Ratnagiri">Ratnagiri</option>
        <option value="Sangli">Sangli</option>
        <option value="Satara">Satara</option>
        <option value="Sindhudurg">Sindhudurg</option>
        <option value="Solapur">Solapur</option>
        <option value="Thane">Thane</option>
        <option value="Wardha">Wardha</option>
        <option value="Washim">Washim</option>
        <option value="Yavatmal">Yavatmal</option>


       
        
       </select>
              <button
          style={{color:"black"}}
            onClick={getRequestByState}
          >
            Find
          </button>
            </div>
              ):("")
            }
      
        </div> 
        */} 
        <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "A" : "Analysis"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome style={{width:"30px"}} />} onClick={showDropDownOfService}>
                Services
              </MenuItem>
              {
                showservices ? (
                  <div>
                  <MenuItem> <div 
            onClick={getVacciData}>
                    <h4 style={{ color: "#00a4e6", cursor: "pointer" }}> Vaccination Center</h4>
                    </div>
                  </MenuItem>

                  <MenuItem>
                  <div
          
            onClick={getBloodData}
          >
             <h4 style={{ color: "#00a4e6", cursor: "pointer" }}>Blood Banks</h4>
          </div>
                  </MenuItem>
                  <MenuItem>
                  <div
           
           onClick={showSearchIcon}
          >
           
            <h4 style={{ color: "#00a4e6", cursor: "pointer" }}>Search</h4>
          </div>
                  </MenuItem>

                  {showSearchItems ? (
                    <div>
                    <MenuItem>
                      <div >
          
            <h5 onClick={handleNearby} >.   Find Nearby</h5>
          </div>
                      </MenuItem>
                      {nearByMe ? (
            <div class="near-by-container">
              <h6 style={{ color: "#0014f2" }}>Near by services</h6>
              <h6 style={{ color: "#0014f2" }}>Enter Radius in Km</h6>
              <input onChange={handleRadiusChange} value={radiusValue}></input>
              <button onClick={getDataUnderRadi} style={{ color: "black" }}>
                Find
              </button>
              
            </div>
          ) : (
            ""
          )}

          <MenuItem>
                      <div >
                      <h5  
            style={{ width: "50%" }}
            onClick={handleLatLongDisplay}>.  Find By Lat-Long</h5>
           
          </div>
          {latlongDisplay ? (
            <div class="near-by-container">
              <h5>Enter Coordinate </h5>
              <h5>details to Find Health</h5>
              <h5>Facilities.</h5>
              <DataInRadius sendLatLong={getLatLong} />
            </div>
          ) : (
            ""
          )}
          </MenuItem>
                    </div>
                     
                  ):("")
                    
                  }



                 
                  </div>
                 
                ) :("")
              }

              <MenuItem icon={<FaList />} onClick={showRequest}>Request</MenuItem>

              {DisplayRequest ? (
                <div>
                <MenuItem>
              <div
            style={{ color: "#00a4e6", cursor: "pointer" }}
            onClick={getRequestData}
          >
            <h4>Request Service</h4>
          </div>
              </MenuItem>
              
              <MenuItem>
              <div
            style={{ color: "#00a4e6", cursor: "pointer" }}
            onClick={showSearchRequestshow}
          >
            <h4>Search</h4>
          </div>
              </MenuItem>
              {DisplaySearchOfReq ? (
                <div>
                  <MenuItem
            onClick={showfindByDateBox}
          >
          <div>
          <h5>. Find By Date </h5>
          </div>
         
                  </MenuItem>
                  {
            findbyDate ? (
              <div class="near-by-container">
              <h4 style={{color:"#0014f2"}}>Find From the date </h4>
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

                  <MenuItem   
          
   
            onClick={displaystateblock}
          >
            <h5 >. Find By District </h5>
                  </MenuItem>
                  {
              districtshow?(
                <div class="near-by-container">
              <h4 style={{color:"#0014f2"}}>Find by District </h4>
              <select
        class="form-select nnnm"
        onChange={handleStateChange}
        aria-label="Default select example"
        name="state"
        
       
      >
        <option selected>All</option>
        <option value="Ahmednagar">Ahmednagar</option>
        <option value="Akola">Akola</option>
        <option value="Amravati">Amravati</option>
        <option value="Aurangabad">Aurangabad</option>
        <option value="Beed">Beed</option>
        <option value="Bhandara">Bhandara</option>
        <option value="Buldhana">Buldhana</option>
        <option value="Chandrapur">Chandrapur</option>
        <option value="Dhule">Dhule</option>
        <option value="Gadchiroli">Gadchiroli</option>
        <option value="Gondia">Gondia</option>
        <option value="Hingoli">Hingoli</option>
        <option value="Jalgaon">Jalgaon</option>
        <option value="Jalna">Jalna</option>
        <option value="Kolhapur">Kolhapur</option>
        <option value="Latur">Latur</option>
        <option value="Mumbai-City">Mumbai-City</option>
        <option value="Mumbai-Suburban">Mumbai-Suburban</option>
        <option value="Nagpur">Nagpur</option>
        <option value="Nanded">Nanded</option>
        <option value="Nandurbar">Nandurbar</option>
        <option value="Osmanabad">Osmanabad</option>
        <option value="Palghar">Palghar</option>
        <option value="Parbhani">Parbhani</option>
        <option value="Pune">Pune</option>
        <option value="Raigad">Raigad</option>
        <option value="Ratnagiri">Ratnagiri</option>
        <option value="Sangli">Sangli</option>
        <option value="Satara">Satara</option>
        <option value="Sindhudurg">Sindhudurg</option>
        <option value="Solapur">Solapur</option>
        <option value="Thane">Thane</option>
        <option value="Wardha">Wardha</option>
        <option value="Washim">Washim</option>
        <option value="Yavatmal">Yavatmal</option>


       
        
       </select>
              <button
          style={{color:"black"}}
            onClick={getRequestByState}
          >
            Find
          </button>
            </div>
              ):("")
            }
                </div>
              ) :("")}
                </div>
              
              ):("")}
             
             
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            
          </SidebarFooter>
        </ProSidebar>
      </div>

        <div class="content" id="home">
      
          <h2 style={{color:"Black"}}>{servicetype} Services</h2>
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
                    <p style={{ color: "red" }}> {serviceData.serviceName}</p>
                    <p>State : {serviceData.State}</p>
                    <p>PinCode {serviceData.Pincode}</p>
                    <p>Email :{serviceData.email || serviceData.Email_Nodal_Officer
}</p>
                    <p>{serviceData.Health_Facility_Name}</p>
                    <p>District :{serviceData.District}</p>
                    <p>{serviceData.Block_Name}</p>
                    <p>Address :{serviceData.Address}</p>
                    <p>Date :{serviceData.Date}</p>
                    <p>Lat :{serviceData.Latitude}</p>
                    <p>Long :{serviceData.Longitude}</p>
                    
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
