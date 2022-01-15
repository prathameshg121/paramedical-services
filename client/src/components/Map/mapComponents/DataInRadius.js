import React,{useState} from "react";

export default function DataInRadius (props){

    const [coOrdinates, setcoOrdinates] = useState({
      latitude :"",
        longitude :"",
        radius :""
    })

    function handleChange(event){
        const {name, value} = event.target;
        setcoOrdinates(
          (prev)=>
          {
          return{
          ...prev,
          [name] :value
          }
        }
        );
        
    }
    function handleClick(event){
        props.sendLatLong(coOrdinates);

        event.preventDefault()
    }


    return(
        <div>
      <form>

  <div class="form-group" >
  <div style={{display:"inline-block"}}>
 
 <div>
  <h6 style={{color: "#0014f2"}}>Latitude</h6>
    <input  class="form-control" style={{width:"70%"}} aria-describedby="emailHelp"onChange={handleChange} placeholder="latitude" name="latitude" value={coOrdinates.latitude} />
</div>

<div>
  
    <h6 style={{color: "#0014f2"}}>longitude</h6>
    <input  class="form-control" style={{width:"70%"}}  id="exampleInputPassword1"onChange={handleChange} placeholder="longitude" name="longitude" value={coOrdinates.longitude} />
    </div>

<div>
    <h6 style={{color: "#0014f2"}} >Radius in Km</h6>
    <input  class="form-control"onChange={handleChange} style={{width:"70%"}} placeholder="Radius" name="radius" value={coOrdinates.radius} />
</div>
 <button type="submit" style={{width:"100px",}} onClick={handleClick} class="btn btn-primary">Find </button>
    </div>
   
  </div>

</form>
<br/>
         
        </div>
    )
}