import {GET_DRIVERS, GET_DRIVERS_NAME, GET_DRIVER_ID,
     GET_TEAMS, FILTER_BY_TEAM , RESET, ORDER_AZ, CLEAR_DETAIL}  from "../actions/index"

const initialState = { allDrivers: [],allDriversBackUp: [], detailDriver:[], allTeams:[],  
    filteredDrives: [], filters: false,}


const rootReducer = (state = initialState ,action) => {
    
    switch (action.type){

        case GET_DRIVERS:

        return {...state, allDrivers: [...action.payload], allDriversBackUp: action.payload };


        case GET_DRIVERS_NAME:

        return {...state, allDrivers:action.payload}


        case GET_DRIVER_ID:

        return {...state, detailDriver:action.payload}


        case CLEAR_DETAIL:

        return {...state, detailDriver:[],}


        case GET_TEAMS:

        return {...state, allTeams:action.payload}




        //opera con todos los filtros
        case FILTER_BY_TEAM:


        

        if(action.payload === "db"){
        let dbDrivers = [...state.allDriversBackUp].filter(d=> d.created == true)
        return {...state, allDrivers:[...dbDrivers],
            filteredDrives: dbDrivers, filters:true,
        }}

        if(action.payload === "api"){
        let apiDrivers = [...state.allDriversBackUp].filter(d=> d.created == false)
        return {...state, allDrivers:[...apiDrivers],
            filteredDrives: apiDrivers, filters:true,
        }}
        
        else{
           let filterTeam = [...state.allDriversBackUp].filter(d => d.teams?.includes(action.payload))
        return {...state, allDrivers:[...filterTeam],
            filteredDrives: filterTeam, filters:true,
        }}
        



        case RESET:

        return {...state, allDrivers: [...state.allDriversBackUp],
            filters: false}

        


//opera con todos los ordenamientos
        case ORDER_AZ:
        switch (action.payload){


            case "AZ":
            let asc = []
            if(state.filters){
                
                 asc = [...state.filteredDrives].sort((prev,next)=> {
                    if (prev.name.toLowerCase() > next.name.toLowerCase()) return +1
                    if (next.name.toLowerCase() > prev.name.toLowerCase()) return -1
                    return 0
    
                })
                return{
                    ...state, allDrivers: [...asc],
                    filteredDrives: asc,
                    
                }


            } else{

                asc = [...state.allDriversBackUp].sort((prev,next)=> {
                    if (prev.name.toLowerCase() > next.name.toLowerCase()) return +1
                    if (next.name.toLowerCase() > prev.name.toLowerCase()) return -1
                    return 0
    
                })

                return{
                    ...state, allDrivers: [...asc],
                    allDriversBackUp: asc,
                    
                }}



            
           

            case "ZA":
                let dsc = []
                if(state.filters){

                    dsc = [...state.filteredDrives].sort((prev,next)=> {
                        if (prev.name.toLowerCase() > next.name.toLowerCase()) return -1
                        if (next.name.toLowerCase() > prev.name.toLowerCase()) return +1
                        return 0
        
                    })

                    return{
                        ...state, allDrivers: [...dsc],
                        filteredDrives: dsc,
                        
                    }


                } else{


                    dsc = [...state.allDriversBackUp].sort((prev,next)=> {
                        if (prev.name.toLowerCase() > next.name.toLowerCase()) return -1
                        if (next.name.toLowerCase() > prev.name.toLowerCase()) return +1
                        return 0
        
                    })

                    return{
                        ...state, allDrivers: [...dsc],
                        allDriversBackUp: dsc,
                        
                    }}


            
           



            case "OLD-NEW":
                let asce = []
                if(state.filters){

                    asce = [...state.filteredDrives].sort((prev,next)=> {
                    
                        if (prev.dob.slice(0,4) > next.dob.slice(0,4)) return +1
                        if (next.dob.slice(0,4) > prev.dob.slice(0,4)) return -1
                        return 0
                        
                    })

                    return{
                        ...state, allDrivers: [...asce],
                        filteredDrives: asce,
                        
                    }


                } else{

                    asce = [...state.allDriversBackUp].sort((prev,next)=> {
                    
                        if (prev.dob.slice(0,4) > next.dob.slice(0,4)) return +1
                        if (next.dob.slice(0,4) > prev.dob.slice(0,4)) return -1
                        return 0
                        
                    })

                    return{
                        ...state, allDrivers: [...asce],
                        allDriversBackUp: asce,
                        
                    }
                }
                

                case "NEW-OLD":
                    let dsce = []
                    if(state.filters){

                         dsce = [...state.filteredDrives].sort((prev,next)=> {
                    
                            if (prev.dob.slice(0,4) > next.dob.slice(0,4)) return -1
                            if (next.dob.slice(0,4) > prev.dob.slice(0,4)) return +1
                            return 0
                            
                        })

                        return{
                            ...state, allDrivers: [...dsce],
                            filteredDrives: dsce,
                            
                        }


                    } else{

                        let dsce = [...state.allDriversBackUp].sort((prev,next)=> {
                    
                            if (prev.dob.slice(0,4) > next.dob.slice(0,4)) return -1
                            if (next.dob.slice(0,4) > prev.dob.slice(0,4)) return +1
                            return 0
                            
                        })


                        return{
                            ...state, allDrivers: [...dsce],
                            allDriversBackUp: dsce,
                            
                        }
        


                    }
                     
            default: return state
            
        }

        default: return {...state};

        
    }
}

export default rootReducer