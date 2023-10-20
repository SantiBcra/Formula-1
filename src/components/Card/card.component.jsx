import {Link} from "react-router-dom"


import "./card.styles.css"

function Card({driver}) {
  const id = driver.id

  

    return (
      <div className="cardContainer">
        <Link to ={`/${id}`} >
        <div className="info">
          
          <h2>Name: {driver.name}</h2>
          
          <img className="img" src={driver.image}  alt={driver.name} />
          
          <h2>Teams: {driver.teams}</h2> 
          </div>
          


        </Link>
        </div>
      
    );
  }
  
  export default Card