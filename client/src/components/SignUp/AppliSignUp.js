import React,{useState} from "react";
import { useHistory } from "react-router";
import axios from "axios";

function AppliSignUp(){
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
      phoneNo :"",
    })

    function goToLogin(){
        history.push("/AppliLogin")
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
      axios.post('http://localhost:5000/appli/signup',ApplData).then((response)=>{
          console.log(response.data);
          if( response.data.message ==="Appli created"){
              history.push("/AppliLogin")
          }
      }) 
        
    //   
    }
  return (
      <div>
  
      <div class="appl-bag">
      <h2>Applicant Signup</h2> 
        <div class="signup-form">
      <form method="POST">
<div class="mb-3">
  <label for="exampleInputEmail1" class="form-label">Email address</label>
  <input onChange={handleChange} name="email" type="email" class="form-control" id="exampleInputEmail1" value={ApplData.email} aria-describedby="emailHelp"/>
  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
</div>
<div class="mb-3">
  <label for="exampleInputPassword1" class="form-label">Password</label>
  <input onChange={handleChange} type="password" name="password" value={ApplData.password} class="form-control" id="exampleInputPassword1"/>
</div>
{/* <div class="mb-3 form-check">
  <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
  <label class="form-check-label" for="exampleCheck1">Check me out</label>
</div> */}




<div  class="form-text">Select Gender.</div>
<select onChange={handleChange} class="form-select" aria-label="Default select example" name="gender" value={ApplData.gender}>
<option selected>Select Gender</option>
<option value="1">Male</option>
<option value="2">Femal</option>
<option value="3">Other</option>
</select>
<br/>
<div  class="form-text">Select the service.</div>
<select onChange={handleChange} class="form-select" aria-label="Default select example" name="profession" value={ApplData.profession}>
<option selected >Nurse</option>
<option value="Dialysis Therapist">Dialysis Therapist</option>
<option value="Physiotherapist">Physiotherapist</option>
<option value="Radiation Technologist">Radiation Technologist</option>
</select>
<br/><br/>
{/* <div class="form-check">
<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
<label class="form-check-label" for="flexRadioDefault1">
  Default radio
</label>
</div>
<div class="form-check">
<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
<label class="form-check-label" for="flexRadioDefault2">
  Default checked radio
</label>
</div> */}

<div class="col-md-4">
  <label for="validationCustom01" class="form-label">First name</label>
  <input onChange={handleChange} style={{width:"320px"}} type="text" class="form-control" id="validationCustom01" name="FName" value={ApplData.FName} required/>
  <div class="valid-feedback">
    Looks good!
  </div>
</div>
<div class="col-md-4">
  <label for="validationCustom02" class="form-label">Last name</label>
  <input onChange={handleChange}  style={{width:"320px"}} type="text" class="form-control" id="validationCustom02" name="LName" value={ApplData.LName} required/>
  <div class="valid-feedback">
    Looks good!
  </div>
</div>
<div class="col-md-4">
  <label for="validationCustomUsername" class="form-label">Username</label>
  <div class="input-group has-validation" style={{width:"320px"}}>
    {/* <span class="input-group-text" id="inputGroupPrepend">@</span> */}
    <input type="text"   class="form-control" onChange={handleChange}  name="UserName" value={ApplData.UserName} id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
    <div class="invalid-feedback">
      Please choose a username.
    </div>
  </div>
</div>
<div class="col-md-6">
  <label for="validationCustom03" class="form-label">City</label>
  <input type="text" class="form-control" style={{width:"250px"}} onChange={handleChange} name="City" value={ApplData.City} id="validationCustom03" required/>
  <div class="invalid-feedback">
    Please provide a valid city.
  </div>
</div>
{/* <div class="col-md-3">
  <label for="validationCustom04" class="form-label">State</label>
  <select class="form-select" id="validationCustom04" required>
    <option selected disabled value="">Choose...</option>
    <option>...</option>
  </select>
  <div class="invalid-feedback">
    Please select a valid state.
  </div>
</div> */}
<div class="col-md-3">
  <label for="validationCustom05" class="form-label">phoneNo</label>
  <input onChange={handleChange} style={{width:"320px"}} type="text" class="form-control" name="phoneNo" value={ApplData.phoneNo} id="validationCustom05" required/>
  <div class="invalid-feedback">
    Please provide a valid phoneNo.
  </div>
</div>
<div class="col-12">
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
    <label class="form-check-label" for="invalidCheck">
      Agree to terms and conditions
    </label>
    <div class="invalid-feedback">
      You must agree before submitting.
    </div>
  </div>
</div>
<div class="col-12">

</div>
<button type="submit" onClick={PostData} class="btn btn-primary">SignUp</button>
</form>
<p style={{margin:"0 100px"}}>Already have account <a onClick={goToLogin}>login</a></p>
</div>
</div>
      </div>
  )
}

export default AppliSignUp;