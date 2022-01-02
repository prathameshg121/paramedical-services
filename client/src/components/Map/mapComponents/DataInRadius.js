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
  <label >latitude</label>
    <input  class="form-control" style={{width:"70%"}} aria-describedby="emailHelp"onChange={handleChange} placeholder="latitude" name="latitude" value={coOrdinates.latitude} />
</div>

<div>
  
    <label >longitude</label>
    <input  class="form-control" style={{width:"70%"}}  id="exampleInputPassword1"onChange={handleChange} placeholder="longitude" name="longitude" value={coOrdinates.longitude} />
    </div>

<div>
    <label >Radius in Km</label>
    <input  class="form-control"onChange={handleChange} style={{width:"70%"}} placeholder="Radius" name="radius" value={coOrdinates.radius} />
</div>

    </div>
    <button type="submit" style={{width:"100px", margin:"5px"}} onClick={handleClick} class="btn btn-primary">Find </button>
  </div>

</form>
<br/>
         
        </div>
    )
}