import "./navBar.styles.css"
import{Link} from "react-router-dom"
function NavBar({handleChange, handleSubmit}) {
//recibe los handlers de searchBar

    return (
      <div className="searchBar">
      
      <form  onChange={(event) => handleChange(event)}>
        
      <input placeholder="Search"  />
      <button className="butto1" type="submit" onClick={handleSubmit}>Buscar</button>
      </form>
     
      

      <div>
        <Link to ={`/create`}>
        <button className="butto2">Create</button>
        </Link>
      </div>

      </div>

      
    )
  }
  
  export default NavBar