import './App.css';
import Signin from "./components/signin";
import Navbar from './components/navbar';
import Login from './components/login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
    return(
        <>
        <Navbar/>
        <BrowserRouter>
           <Routes>
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signin" element={<Signin/>} />
           </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;