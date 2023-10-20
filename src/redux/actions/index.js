import axios from "axios";


//pide todos los drivers
export const GET_DRIVERS = "GET_DRIVERS"

export const getDrivers = () => {
return async function(dispatch){
    try{

        const apiData = await axios.get("http://localhost:3001/drivers/");

    const drivers = apiData.data;
    return dispatch({type: GET_DRIVERS, payload: drivers});
    }
    catch (error) {
        alert(error.response.data.error)
    }

}
    
}

//pide driver por nombre
export const GET_DRIVERS_NAME = "GET_DRIVERS_NAME"
export const getDriverByName = (name) => {
    return async function(dispatch){
        
        const apiData = await axios.get(`http://localhost:3001/drivers/?name=${name}`);
    
        const driver = apiData.data;
        return dispatch({type: GET_DRIVERS_NAME, payload: driver});
         }}



//pide driver por id
export const GET_DRIVER_ID = "GET_DRIVER_ID"
export const getDriverDetail = (id) => {
    return async function(dispatch){
        try{

        const apiData = await axios.get(`http://localhost:3001/drivers/${id}`);
    
        const driver = apiData.data[0];
        return dispatch({type: GET_DRIVER_ID, payload: driver});

        }
        catch(error){
            alert(error.response.data.error)
    
    }}}


//pide todas las escuderias
export const GET_TEAMS = "GET_TEAMS"
export const getTeams = () => {
    return async function(dispatch){

        try{
           const apiData = await axios.get(`http://localhost:3001/teams`);
    
        const driver = apiData.data;
        return dispatch({type: GET_TEAMS, payload: driver}); 
        }
        catch(error){
            alert(error.response.data.error)
    
    }}}


//postea nuevo Driver
export const POST_DRIVER = "POST_DRIVER"
export function postDriver(state){
        return async function(dispatch){
            
            try {
                
                await axios.post("http://localhost:3001/drivers/", state)
                alert("Driver Creado!")
            } catch (error) {
                alert(error.response.data.error)
            }
        }
    }


//despacha pedido de alguno de TODOS los filtros
export const FILTER_BY_TEAM = "FILTER_BY_TEAM"

export const filterByTeam = (event) => {
return async function(dispatch){
    
        try{
         return dispatch({type: FILTER_BY_TEAM, payload: event});
    }
    
    catch (error) {
        alert("filters are not working")
    }
    
}
}


//despacha resetear drivers
export const RESET = "RESET"

export const resetFilters = () => {
return async function(dispatch){
   try{

    return dispatch({type: RESET});
   }
    catch(error){
        alert("Reset is not working")
    }
}
}


//pide alguno de TODOS los ordenamientos
export const ORDER_AZ = "ORDER_AZ"

export const orderDrivers = (event) => {
    return function(dispatch){
    try{

       dispatch({
        type:ORDER_AZ,
        payload:event
    }) 
    }
    catch(error){
        alert("orders are not working")
    }
    }
    }


//limpia estado de detalle
export const CLEAR_DETAIL = "CLEAR_DETAIL"
export function clearDetail() {
    return function (dispatch) {
      dispatch({
        type: CLEAR_DETAIL,
      });
    };
  }