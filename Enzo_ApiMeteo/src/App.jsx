import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Recherche from './pages/recherche'
import Favoris from './pages/favoris'
import Carte from './pages/carte'


function App() {

  return (
    <Router>
      <div>
        <nav className='navbar'>
          <ul className='navbar-list'>
            <li>
              <Link to="/">
                Aller à la page principale
              </Link>
            </li>
            <li>
              <Link to="/favoris">
                Aller à la page des favoris
              </Link>
            </li>
            <li>
              <Link to="/carte">
                Aller à la page de la carte
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Recherche />} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/carte" element={<Carte />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
