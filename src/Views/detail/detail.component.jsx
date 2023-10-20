import { useDispatch ,useSelector} from "react-redux";
import { useState } from "react"
import {getDriverDetail, clearDetail} from "../../redux/actions/index"
import { useParams } from "react-router-dom";
import { useEffect } from "react"
import { Link } from "react-router-dom";



import "./detail.styles.css"


export const Detail =() =>{

  const {id} = useParams();
  
  //se suscribe al state en detail
  const dispatch = useDispatch()
  const detail = useSelector((state) => state.detailDriver)
  


useEffect (() => {
//al montar pide driver con id
  dispatch(getDriverDetail(id));
  return () => {
  //al desmontar limpia el estado de detalle
    dispatch(clearDetail());
  };
}, [dispatch, id]);




    return (
      <div>

        <Link to={"/home"}>  <button>HOME</button>    </Link>
       <div className="detail">
        
        <div className="detail-cont">
         <h3>ID:{detail.id} </h3>
         <h1> {detail.name} {detail.surname}</h1>
         <h3> Nationality: {detail.nationality}</h3>
         <img className="img" src={detail.image}  alt={detail.name} />
         <h3> Description: {detail.description}</h3>
         <h3> Date of Birth: {detail.dob}</h3>
         <h3> Teams: {detail.teams}</h3> 
        </div>
       </div>
      </div>
    )
  }
  
  export default Detail


