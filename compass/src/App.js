import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Compass from './Pages/Compass/Compass';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/compass' element={<Compass/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;