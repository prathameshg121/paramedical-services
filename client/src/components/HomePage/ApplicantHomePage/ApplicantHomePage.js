import React,{useState} from "react";
import axios from "axios"
import { useHistory } from 'react-router';

function ApplicantHomePage(){
  const history = useHistory();
      const [ApplData, setApplData] = useState({
        email : "",
        password : "",
        gender :"",
        profession : "",
        FName :"",
        LName :"",
        UserName :"",
        City : "",
        zip :"",
      })

      function goToAppliProfile(){
          history.push("/AppliProfile")
      }

      function handleChange(event){
        const { name, value } = event.target;
        setApplData((preValues) => {
          return {
            ...preValues,
            [name]: value
          };
        });
          console.log(ApplData);
      }

      const PostData = async(e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/appli/signup',ApplData)
      }
    return (
        <div>
        <h2 onClick={goToAppliProfile}>Profile</h2>
        </div>
    
    )
}

export default ApplicantHomePage;