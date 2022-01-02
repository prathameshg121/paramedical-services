import React,{useState} from "react";
import { useHistory } from 'react-router';
import map from "../../Map/mapComponents/Container"
import Services from "../DisplayServices/ServicesCard"

function UserHomePage(){

    const history = useHistory();

    function goToRequest(){
        history.push('/requestService')
    }

    function goToUserProfile(){
        history.push("/UserProfile")
    }
    function goToMap(){
        history.push("/map")
    }
    function goToServices(){
        history.push("/Services")
    }

    
    return (
        <div class="user-home-page">
            

                 
<header class="navhe">
    
    <div class="brand-title"></div>
    <nav>
        <ul class="nav_links">
            <li><i class="fas fa-laptop-medical fa-2x "></i></li>
            {/* <li><a href="#" onClick={goToUserProfile}>Profile</a></li> */}
            <li><a href="#" onClick={goToServices}>Services</a></li>
            <li><a href="#" onClick={goToMap}>Map</a></li>
            <li><a href="#" onClick={goToRequest} >Request</a></li>
            <li><a href="#">Aboutus</a></li>
        </ul>
    
    </nav>
    <div class="brand-title"></div>
</header>



<div id="carouselExampleControls" class="carousel slide" data-ride="carousel" >
  <div class="carousel-inner" >

  
    <div class="carousel-item active " >
    <div class="carousel-item-div">
    <div  >
      <img class="d-block "  src="http://tbpcollege.com/wp-content/uploads/2021/08/m1-800x450.jpg" alt="First slide"/>    
      </div>
      <div class="info-contex">
      <h3>Facility</h3>
      <p>High Quality Facility equipments are available, with the skilled service provider.</p>
      </div>
     
          </div>
      
    
 
    </div>
    <div class="carousel-item">
    <div class="carousel-item-div">
    <div  >
    <img class="d-block " style={{width:"90%", height:"100%"}} src="https://www.vmprofessionals.ae/wp-content/uploads/2018/11/healthcare-marketing-1.jpg" alt="Second slide"/>
     
      </div>
      <div class="info-contex">
      <h3>Services</h3>
      <p>All type of Paramediacal service are provided.</p>
      </div>
     
          </div>
    
     
    </div>
    <div class="carousel-item">

    <div class="carousel-item-div">
    <div  >
    <img class="d-block w-70" src="https://ak.picdn.net/shutterstock/videos/1026767669/thumb/1.jpg" alt="Third slide"/>
     
      </div>
      <div class="info-contex" >
      <h3 >Map</h3>
      <p>Search the nearby Paramediacal service on Once Click!</p>
      </div>
     
          </div>
    
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" style={{color:"black"}} aria-hidden="false"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

<section class="page-section cta" >
        <div class="container discription-container">
            <div class="row">
                <div class="col-xl-9 mx-auto">
                    <div class="text-center cta-inner rounded">
                        <h2 class="section-heading mb-4"><span class="section-heading-upper">Our Promise</span><span class="section-heading-lower">To You</span></h2>
                        <p class="mb-0">When you walk into our website for health services, we are dedicated to providing you with friendly service, a welcoming atmosphere, and above all else, excellent service  with the highly skilled people. If you are not satisfied, please let us know and we will do whatever we can to make things right!</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
           
          
        </div>
    )
}


export default UserHomePage;