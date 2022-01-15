import "../styles.css";
import React,{useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WelcomPage from './WelcomPage/Welcompage'
import UserSignUp from './SignUp/UserSignUp';
import UserHomePage from "./HomePage/UserHomePage/UserHomePage"
import ApplicationPage from './HomePage/ApplicantHomePage/ApplicantHomePage'
import ListPage from "./HomePage/ListPage/ListPage";
import AppliSignUp from "./SignUp/AppliSignUp";
import AppliLogin from "./Login/AppliLogin";
import AppliProfile from "./Profile/AppliProfile"
import UserProfile from "./Profile/UserProfile"
import UserLogin from "./Login/UserLogin";
import Map from "./Map/mapComponents/Osm"
import ServicesCard from "./HomePage/DisplayServices/ServicesCard"
import RequestService from "./HomePage/Request/RequestService";
import { ContactUs } from "./HomePage/ContactUs/ContactUs";
import SideBar from "./Map/mapComponents/SideContainer"
export default function App() {
    const [chooseProfe, setchooseProfe] = useState("")
  const [latlongval, setlatlongval] = useState({
      Latitude :"",
      Longitude :""
  })

    return (

        <Router>
            <Route path ="/" exact>
            <WelcomPage />
            </Route>
            <Route path = "/UserSignUp" exact>
                <UserSignUp/>
            </Route>
            <Route path ="/UserLogin" exact>
                <UserLogin/>
            </Route>
            <Route path = "/UserHomePage" exact>
                <UserHomePage />
            </Route>
            <Route path= "/ApplicationPage" exact>
                <ApplicationPage />
            </Route>
            <Route path= "/ListPage" exact>
                <ListPage  chooseProfe = {chooseProfe}/>
            </Route>
            <Route path="/Services" exact>
            <ServicesCard setchooseProfe ={setchooseProfe}/>
            </Route>
            
            <Route path= "/AppliSignUp" exact>
                <AppliSignUp/>
            </Route>
            <Route path= "/AppliLogin" exact>
                <AppliLogin/>
            </Route>

            <Route path = "/AppliProfile" exact>
            <AppliProfile/>
            </Route>
            <Route path ="/UserProfile" exact>
                <UserProfile/>
            </Route>
            <Route path ="/map"  exact>
                <Map/>
            </Route>
            <Route path ="/requestService" exact>
                <RequestService/>
            </Route>
            <Route path ="/ContactUs" exact>
                <ContactUs/>
            </Route>
            <Route path ="/Sidebr" exact>
                <SideBar/>
            </Route>
        </Router>
        
      
        );
}
