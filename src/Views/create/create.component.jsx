import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeams, postDriver } from '../../redux/actions/index'
import {Link} from "react-router-dom"
import "./create.styles.css"

const Form = () => {

  //se suscribe al estado en allTeams
  const allTeams = useSelector(state => state.allTeams)
  
 //al montar pide todos los teams 
  const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(getTeams())
      },[])
     


//estado local para cada input
  const [state, setState] = useState({
    name:"",
    surname:"",
    description:"",
    nationality:"",
    image:"",
    dob:0,
    teams:[],
    
    
  })
//estado para los errores de cada input
  const [error, setError] = useState({
    name:"cannot be null",
    surname: "cannot be null",
    description:"cannot be null",
    nationality:"cannot be null",
    image:"cannot be null",
    dob:"cannot be null",
    teams:"",
    
    
  })
  //fucion que valida en cada onChange
  const validate = (stateAux, name)=>{
    if(name==="name"){
      if(stateAux.name==="") setError({...error, name:"incomplete name"})
      else setError({...error, name:""})
    }

    if(name==="surname"){
      if(stateAux.surname==="") setError({...error, surname:"incomplete surname."})
      else setError({...error, surname:""})
    }

    if(name==="description"){
      if(stateAux.description==="") setError({...error, description:"incomplete description."})
      else setError({...error, description:""})
    }

    if(name==="nationality"){
      if(stateAux.nationality==="") setError({...error, nationality:"incomplete nationality."})
      else setError({...error, nationality:""})
    }


    if(name==="dob"){
      if(stateAux.dob==="") setError({...error, dob:"incomplete date."})
      else setError({...error, dob:""})
    }
    


    if(name==="image"){
      const regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      if(regex.test(stateAux.image)){
        setError({...error, image:""})
      }else{
        setError({...error, image:"Not a URL."})
      }
    }

  }
//controlador de submit
  const disableFunction = ()=>{
    let disabledAux = true;
    for(let err in error){  
      if(error[err]==="") disabledAux = false;
      else{
        disabledAux = true;
        break;
      }
    }
    return disabledAux;
  }

 //en cada cambio actualiza el estado e invoca validate
  const handleChange = (event) =>{

    if(event.target.name==="teams"){
      if(state.teams.includes(event.target.value)) return//corta ejecucion
      setState({
        ...state,
        [event.target.name]: [...state[event.target.name], event.target.value]
                          //guardo copia del estado en propiedad teams concatenado con nuevo team
      })
    }
    
    else{
      setState({
        ...state,
        [event.target.name]: event.target.value
      })
    }

    validate({
      ...state,
      [event.target.name]: event.target.value
    }, event.target.name)
  }




  //saca team no deseado
  const handleDelete = (event) =>{
    setState({
      ...state, [event.target.name]:[...state[event.target.name].filter(t=> t!==event.target.id)]
    })
  }


  //despacha post 
  const handleSubmit = (event) =>{
    event.preventDefault()
    dispatch(postDriver(state))
  }


  return (

<div>
<Link to={"/home"}>  <p>HOME</p>    </Link>
    <div className='form-cont'>
      
      <form onSubmit={handleSubmit} className='form-cont-form'  >
        
        
        <h2>CREATE YOUR DRIVER!</h2>
        <label>Name: </label>
        <input name='name' onChange={handleChange} type="text" />
        <label className='form-error'>{error.name}</label>


        <label>Surname: </label>
        <input name='surname' onChange={handleChange} type="text" />
        <label className='form-error'>{error.surname}</label>


        <label>Description: </label>
        <input name='description' onChange={handleChange} type="text" />
        <label className='form-error'>{error.description}</label>


        <label>Nationality: </label>
        <input name='nationality' onChange={handleChange} type="text" />
        <label className='form-error'>{error.nationality}</label>


        
        <label>Image URL: </label>
        <input name='image' onChange={handleChange} type="text" />
        <label className='form-error' >{error.image}</label>

        <label>Date of Birth: </label>
        <input name='dob' onChange={handleChange} type="date" />
        <label className='form-error' >{error.dob}</label>



        <label>Team: </label>
        <select onChange={handleChange} name='teams'>
        {allTeams?.map(t=>  <option value={t.name} key={t.Id}> {  t.name  } </option>   )}
        

        </select>
        <div>
          {
            state.teams.map((t)=> <div key={t}> {t} 
            <button className='buttonn' name='teams' id={t}  onClick={handleDelete}>X</button>
            
            
            </div> )
          }

        </div>
        

        <input disabled={disableFunction()} type="submit" />
      </form>
    </div>
    </div>
  )
}

export default Form