import {Routes, Route} from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Account from './Pages/Account';
import './App.css';

function App() {
  const isUserSignedIn = !!localStorage.getItem('token')

  return (
    <div className="App">
      <div className='background-image'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {isUserSignedIn && <Route path='/account' element={<Account />} />}
        </Routes>
      </div>
    </div>
  );
}

export default App;
