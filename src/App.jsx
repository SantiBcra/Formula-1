import { Routes, Route} from "react-router-dom";

import Landing from "./Views/landing/landing.component"
import Home from "./Views/home/home.component"
import Form from "./Views/create/create.component"
import Detail from "./Views/detail/detail.component"


import './App.css'



function App() {
  

  return (
 <Routes>
    
    <Route path="/" element={<Landing />}> </Route>
    <Route exact path="/home" element={<Home/>}>  </Route>
    <Route path="/:id" element={<Detail/>}/> 
    <Route path="/create" element={ <Form/>}/> 
    
  

    </Routes>
  )
}

export default App
