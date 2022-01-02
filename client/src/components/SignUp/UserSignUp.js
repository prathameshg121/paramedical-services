import React,{useState} from "react";
import axios from "axios";
import { useHistory } from 'react-router';

 function UserSignUp(){
    let history = useHistory()
    const [userData, setUserData] = useState({
        email : "",
        password : "",
        confPassword :"",
        FName :"",
        LName :"",
       
    })

  
    function handleChange(event){
        const { name, value} = event.target;
        setUserData((preValues) => {
            return {
                ...preValues,
                [name] : value
            }
        })
     
    }

   function goToUserLogin(){
        history.push("/UserLogin")
    }
    const SignUp = async(e) =>{
        e.preventDefault();
        axios.post('http://localhost:5000/user/signup',userData).then((response)=>{
            console.log(response.data);
            if( response.data.message ==="User created"){
                console.log (userData);
                history.push("/UserLogin");
            }
        }) 
          
      //   
      }

    return(
        <div className="SignUp">
        <h2>User SignUp</h2>
        <div class="signup-form">
    <form>
		<h2>Sign Up</h2>
		<p>Please fill in this form to create an account!</p>
		<hr/>
        <div class="form-group">
			<div class="row">
				<div class="col"><input type="text" onChange={handleChange} class="form-control" name="FName" placeholder="First Name" value={userData.FName} required="required"/></div>
				<div class="col"><input type="text" onChange={handleChange} class="form-control" name="LName" placeholder="Last Name" value={userData.LName}  required="required"/></div>
			</div>        	
        </div>
        <div class="form-group">
        	<input type="email" class="form-control" onChange={handleChange} name="email" placeholder="Email"  value={userData.email}  required="required"/>
        </div>
		<div class="form-group">
            <input type="password" class="form-control" onChange={handleChange} name="password" placeholder="Password"  value={userData.password}  required="required"/>
        </div>
		<div class="form-group">
            <input type="password" class="form-control" onChange={handleChange} name="confPassword" placeholder="Confirm Password"  value={userData.confPassword}  required="required"/>
        </div>        
        <div class="form-group">
			<label class="form-check-label"><input type="checkbox" required="required"/> I accept the <a >Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
		</div>
		<div class="form-group">
            <button  type="submit" onClick={SignUp} class="btn btn-primary btn-lg">Sign Up</button>
        </div>
    </form>
	<div class="hint-text">Already have an account? <a onClick={goToUserLogin}>Login here</a></div>
</div>

        </div>

    );

}

export default UserSignUp;