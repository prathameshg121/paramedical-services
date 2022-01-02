import React,{userState} from "react";
import tempData from '../Constant/tempData'
import { useHistory } from "react-router-dom";
export default function ServicesCard({setchooseProfe}){
    const history = useHistory();
    function Card(props){
        return ( 
             <div class="card" style={{width: "18rem"}}>
      <img class="card-img-top" src={props.img} alt="Card image cap"></img>
      <div class="card-body">
        <h5 class="card-title">{props.name}</h5>
        <p class="card-text">This is the paramediacl service</p>
        <button  class="btn btn-primary" value={props.name} onClick={goToList}>Show List</button>
      </div>
    </div>)
    }
    
    function createCard(tempData){
        return <div>
            <Card name = {tempData.name}
                img = {tempData.imgURL}
                tele = {tempData.phone}
            />
    
        </div>
    }

    function goToList(e){
        const val = e.target;
        const n = val.value
        
        console.log(n)
        setchooseProfe(n);
        
        history.push("/ListPage");
    }

    return (
        <div className="card-container">
        {tempData.map(createCard)}
        </div>
    )
}