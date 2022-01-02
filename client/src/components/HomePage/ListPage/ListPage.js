import React,{useEffect, useState} from "react";
import axios from 'axios'


function ListPage({chooseProfe}){
let num = 0;
console.log(chooseProfe + "now set it")
  const [AppliData, setAppliData] = useState([{
    email : "",
    password : "",
    gender :"",
    profession : "",
    FName :"",
    LName :"",
    UserName :"",
    City : "",
    zip :"",
  }])


 

  useEffect(() => {
      
      axios
          .get(`http://localhost:5000/appli/profession/${chooseProfe}`)
          .then((res) => {
            
            setAppliData(res.data.applis);
          })
          .catch((error) => {
             console.log("Data not found")
          });


      
  }, [])

    return(
        <div>
          
            <table class="table table-sm table-dark">
            <thead>
    <tr class="bg-primary" >
      <th scope="col">#</th>
      <th scope="col">Email</th>
      <th scope="col">Name</th>
      <th scope="col">Profession</th>
      <th scope="col">City</th>
      <th scope="col">Gender</th>
      <th scope="col">UserID</th>
      <th scope="col">Higher</th>
    </tr>
  </thead>
  </table>
            {AppliData.map(data => 
            <div>
           
 
  <table class="table table-hover">
  <tbody>
    <tr>
      <th scope="row">{++num}</th>
      <td>{data.email}</td>
      <td>{data.FName} {data.LName}</td>
      <td>{data.profession}</td>
      <td>{data.City}</td>
      <td>{data.gender}</td>
      <td>{data.UserName}</td>
      <td><button  class="btn btn-primary" style={{width:"fit-content",  margin:"0 50%"}}>Higher</button></td>
      
    </tr>
  </tbody>
</table>

                
          
            </div>)}
            
        </div>
    )
}

export default ListPage;