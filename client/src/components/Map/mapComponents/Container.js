import React from "react";
import Osm from "./Osm";
import Home from "./Home";
import About from "./About";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function Container(){



    return (

<div>
<div class="sidebar">
  <a class="active" href="#home">Map</a>
  <a href="#Info">Info</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
</div>

<div class="content" id = "home">
  <Osm/>
  <div id="Info">
  <Home/>
</div>
<div className="about-container-div" id="about">
  <About/>
</div>
</div>


</div>
    )
}