import './App.css'

// Router
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

// Pages
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

// Components
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
