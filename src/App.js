import {Route , Routes} from "react-router-dom"
import LogInPage from './pages/logInPage';
import React from "react";
import HomePage from "./pages/homePage";
function App() {
  return(
    <div className='App'>
    <Routes>
      <Route exact path="/" element={<LogInPage/>}/>
      <Route exact path="/HomePage"  element={<HomePage/>}/>
    </Routes>

  </div>
  )
}

export default App;
