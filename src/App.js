import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Polling from './Polling';
import Main from './Main';


function App() {
  

  return (
 <div className="App">

    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/home' element={< Home/>} />
      <Route path='/polling' element={< Polling/>} />
    </Routes>
 </div>
  );
}

export default App;
