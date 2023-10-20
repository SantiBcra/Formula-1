import { useEffect } from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";

import {getDrivers, getDriverByName, getTeams,
   filterByTeam,resetFilters,
   orderDrivers} from "../../redux/actions/index.js"

import Cards from "../../components/Cards/cards.component"
import NavBar from "../../components/NavBar/navBar.component"
import Paginationn from "../../components/pagination/paginationn.jsx"
import "./home.styles.css"



function Home() {

//se suscribe al estado global en allDrivers y teams 
const dispatch = useDispatch()
const allDrivers = useSelector(state => state.allDrivers)
const allTeams = useSelector(state => state.allTeams)


//estado local para paginado
const [currentPage, setCurrentPage] = useState(1);

const cardxPage = 9
const totalPages = Math.ceil(allDrivers.length / cardxPage);

//primer index -1 por ser array
const startIndex = (currentPage - 1) * cardxPage;


const endIndex = startIndex + cardxPage;

let currentCards = allDrivers.slice(startIndex, endIndex);


//estado local para barra de busqueda
const[searchString,setSearchString] = useState("")





//en el cambio modifico la palabra a buscar
const handleChange = (event) => { 
  event.preventDefault()
  setSearchString(event.target.value);
}
// despacho la action 
const handleSubmit = (event) => {
  setCurrentPage(1)
  event.preventDefault()
  dispatch(getDriverByName(searchString))
  
}



useEffect(() => {
  
// al montar pido teams y drivers
  dispatch(getTeams())
  if(allDrivers.length===0){
    dispatch(getDrivers());
  }
  }, [dispatch]);




  //cambia la current page
  function pageHandler(pageNumber) {
    setCurrentPage(pageNumber);
  }



  //despacha filtros
  const filters= (event) =>{
    setCurrentPage(1)
    dispatch(filterByTeam(event.target.value))
   
  }



  //manejador de prev y next
  const pagination = (event) =>{
    if (event.target.name === "next" && currentPage  * cardxPage < allDrivers.length ){
    setCurrentPage(currentPage +1)}
  else if(event.target.name=== "prev" && startIndex!==0 ) setCurrentPage(currentPage -1)
  }



  //recibe el nombre y despacha TODOS los ordenamientos
  const orderAz= (event) =>{
    dispatch(orderDrivers(event.target.name))
  }
 





    return (
      <div >
      <NavBar handleChange={handleChange} handleSubmit={handleSubmit}  />
      <div >
      <select onChange={filters} name="filter">
          {allTeams.map(t=>  <option value={t.name} key={t.Id}> {t.name} </option>   )}
        
      </select>

      <select onChange={filters} name="filterSource">
        
      <option value="db" > Data Base </option>
      <option value="api" > Api </option>
        
      </select>
      
      <button onClick={()=>dispatch(resetFilters())}>Reset Drivers</button> 

      </div>

      <button name="AZ" onClick={orderAz}>AZ</button>
      <button name="ZA" onClick={orderAz}>ZA</button>

      <button name="OLD-NEW" onClick={orderAz}>ORDER BY AGE DSC</button>
      <button name="NEW-OLD" onClick={orderAz}>ORDER BY AGE ASC</button>

      

      <Cards allDrivers ={currentCards} />

      <div>
     
      <button name="prev" onClick={pagination}>Prev Page</button>
      <button name="next" onClick={pagination}>Next Page</button>
      <Paginationn total={totalPages} page={pageHandler}/>

      </div>



      </div>
    
    
      
    )
  }
  
  export default Home