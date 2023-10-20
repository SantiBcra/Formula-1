import Card from "../Card/card.component"
import { useSelector } from "react-redux"
 import { useState } from "react"
 import "./cards.styles.css"


 
function Cards({allDrivers}) {

const Drivers = allDrivers
  
//caso de searchByName sin resultados
if(Drivers=="No existe")return(<div className="error"> <h1>  Not found drivers</h1></div> )
  

else{

  return (
     
    <div className="cardsContainer">
    
    {Drivers?.map((driv) => {
    return <Card key={driv.id} driver={driv}/> 
    })}
    </div>
    

  )}}

  export default Cards