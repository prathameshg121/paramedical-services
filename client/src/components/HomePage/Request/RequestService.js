import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap  } from "react-leaflet";
import { useHistory } from "react-router-dom";
import SearchControler from "../../Map/mapComponents/SearchControler";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../../Map/mapComponents/constants";

let count =0;

export default function RequestService(){


  let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();


    const history = useHistory()
    const [reqLoc, setreqLoc] = useState(false)
    const [requestData, setrequestData] = useState({
        FName:"",
        LName:"",
        email:"",
        serviceName :"",
        District:"",
        Date : newDate,
        Month : month,
        Year : year,
        Latitude:"",
        Longitude:"",
    })

  

    function updateLocation(){
      setreqLoc(true);
      if(requestData.Latitude != ""){
        window.location.reload();
      }
      
     
    }

   
    function handleChange(event){
       
        const { name, value } = event.target;
        setrequestData((preValues) => {
          return {
            ...preValues,
            [name]: value
          };
        });
          console.log(requestData);
      }

      const uploadRequest = async(e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/request/userRequest',requestData).then((response)=>{
            console.log(response.data);
            if( response.data.message ==="requeRequest_servicest created"){
                console.log (requestData);
                alert("Request Send Successfully")
            }
        }) 
          
      //   
      }
    
      let userLat ="";
      let userLong =""

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
        userLat  = bbox[1];
        userLong = bbox[0];
        
        if(userLong && count <5){
            // setlat(bbox[1]);
            // setlong(bbox[0]);
            setrequestData((preValues) => {
                return {
                  ...preValues,
                 Latitude : bbox[1],
                 Longitude :bbox[0],
                };
              });
        }
        
        count++;
        // console.log(lat + "box 1 in req" + long)
    //    console.log(count)
    //    if(count === 3){
    //     setreqLoc(false);
    //    }
        
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
            
          </Marker>
        );
      }
    

    
    // console.log("out of the  box "+ lat)
    
    // setrequestData((preValues) => {
    //     return {
    //       ...preValues,
    //       Latitude : lat,
    //       Longitude : long
    //     };
    //   });

    return(
        <div>

        {
            reqLoc ?(
                <div style={{width:"0px", height:"0px"}}>
        <MapContainer style={{width:"0px", height:"0px"}}
        center={[17.3674,76.5359]}
        zoom={7.2}
        scrollWheelZoom={true}
      >
        <SearchControler style={{width:"0px", height:"0px"}} />
        <TileLayer style={{width:"0px", height:"0px"}}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocationMarker/>
      </MapContainer>
       </div>
            )
            :
            ("")
        }


        
             <div className="SignUp">
        
        <h2>Request Service</h2>
       <div class="signup-form">
   <form>
      
       <p>Please fill in this form!</p>
       <hr/>
     
       <div class="form-group">
           <input type="name" class="form-control" onChange={handleChange}  name="FName" placeholder="First Name" value={requestData.FName}    required="required"/>
       </div>
       <div class="form-group">
           <input type="name" class="form-control" onChange={handleChange}  name="LName" placeholder="Last Name"  value={requestData.LName}  required="required"/>
       </div>

       <div class="form-group">
           <input type="email" class="form-control" onChange={handleChange}  name="email" placeholder="email" value={requestData.email}    required="required"/>
       </div>
       <div class="form-group">
           <input type="name" class="form-control" onChange={handleChange}  name="serviceName" placeholder="Service Name"  value={requestData.serviceName}  required="required"/>
       </div>
       <div class="form-group">
           <input type="name" class="form-control" onChange={handleChange}  name="District" placeholder="District"  value={requestData.District}  required="required"/>
           <select
        class="form-select"
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


        <div style={{display:"inline-flex"}}>
       <div class="form-group">
           <input type="name" class="form-control" style={{width:"70%"}} onChange={handleChange}  name="Latitude" placeholder="Latitude" value={requestData.Latitude}   required="required"/>

       </div>

       <div class="form-group">
       <input type="name" class="form-control" style={{width:"70%"}} onChange={handleChange} name="Longitude" placeholder="Longitude"  value={requestData.Longitude}  required="required"/>
       </div>
       </div>
            
     
       <div class="form-group">
           <button  type="submit" class="btn btn-primary btn-lg" onClick={uploadRequest}>Upload</button>
           <button   class="btn btn-primary btn-lg locate-btn-get" onClick={updateLocation} >Locate Me <i class="fas fa-map-marker-alt"></i></button>
       </div>
   </form>
 
</div>

       </div>

      
        </div>
    )
}