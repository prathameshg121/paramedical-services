import React,{useState} from "react";
import { useHistory } from "react-router";
import axios from "axios"

function AppliLogin(){
    const history = useHistory();

    function goToSignUp(){
        history.push("/AppliSignUp")
    }

    const [userData, setUserData] = useState({
      
        email : "",
        password :"",
       
   })
  
 

    function login(event){
        console.log (userData);
       
        axios.post("http://localhost:5000/appli/login", userData).then((response) => {
      console.log(response.data);
      console.log("Role " + response.data.appli.email);
      localStorage.clear();
      localStorage.setItem("userData", JSON.stringify(response.data));
    //   console.log(response.data.message)
      if (response.data.message === "Auth Successful!") {
   
        history.push("/ApplicationPage");
      } else {
        console.log("invalid User");
      }
    });

    setUserData({
      email: "",
      password: ""
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
    }

    

    return(
        <div className="SignUp">
         <h2>Applicant Login</h2>
        <div class="signup-form">
    <form>
		<h2>Login</h2>
		<p>Please fill in this form to Login!</p>
		<hr/>
      
        <div class="form-group">
        	<input type="email" class="form-control" onChange={handleChange} name="email" placeholder="Email"  value={userData.email}  required="required"/>
        </div>
		<div class="form-group">
            <input type="password" class="form-control" onChange={handleChange} name="password" placeholder="Password"  value={userData.password}  required="required"/>
        </div>
		     
        <div class="form-group">
			<label class="form-check-label"><input type="checkbox" required="required"/> I accept the <a >Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
		</div>
		<div class="form-group">
            <button  type="submit" onClick={login} class="btn btn-primary btn-lg">Login</button>
        </div>
    </form>
	<div class="hint-text">Crate Account <a onClick={goToSignUp} >SignUp</a></div>
</div>

        </div>
  


    )
}


export default AppliLogin;