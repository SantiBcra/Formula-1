import "./landing.styles.css"
import {Link} from "react-router-dom"



function Landing() {
  

    return (
      <div  >
      <h1 className="tittle">WELCOME TO F1 </h1>

      <Link to={"/home"}>
      <button className="button">Start</button>
      </Link>

      </div>
    )
  }
  
  export default Landing


  