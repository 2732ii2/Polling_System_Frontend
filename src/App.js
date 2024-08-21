import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Polling from './Polling';
import Main from './Main';
// import Login from './Login';
import Dashboard from './Dashboard';
import {Provider, useDispatch} from "react-redux";
import store from './Redux/store';
import Mediaplayer from './mediaplayer';
import Library from './Library';
import AddBook from './AddBook';
import AdminDashboard from './AdminDashboard';
import Faviourates from './Faviourates';
import Login from './Login/Login';
import { AddUserSession } from './Redux/actions';
import Edit from './Edit/edit';

function App() {
  
  return (
  <Provider store={store}>
  <div className="App">
  <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/home' element={< Home/>} />
        <Route path='/polling' element={< Polling/>} />
        {/* <Route path='/login' element={< Login/>} /> */}
        <Route path='/dashboard' element={< Dashboard/>} />
        {/* <Route path='/mediaplayer' element={< Mediaplayer/>} /> */}
        <Route path='/library' element={< Library />} />
        <Route path='/library/addbook' element={< AddBook />} />
        <Route path='/admin' element={< AdminDashboard />} />
        <Route path= '/save'  element={<Faviourates />}/>
        <Route path= '/login'  element={<Login />}/>
        <Route path= '/edit'  element={<Edit />}/>
      </Routes>
  </div>
 </Provider>
  );
}

export default App;
