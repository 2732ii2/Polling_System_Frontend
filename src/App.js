import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Polling from './Polling';
import Main from './Main';
import Login from './Login';
import Dashboard from './Dashboard';
import {Provider} from "react-redux";
import store from './Redux/store';

function App() {
  
  return (
  <Provider store={store}>
  <div className="App">
  <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/home' element={< Home/>} />
        <Route path='/polling' element={< Polling/>} />
        <Route path='/login' element={< Login/>} />
        <Route path='/dashboard' element={< Dashboard/>} />
      </Routes>
  </div>
 </Provider>
  );
}

export default App;
