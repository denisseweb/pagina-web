import { Route } from 'wouter'
import { Nav } from './components/Nav'
import { Incidente } from './pages/Incidente'
import { Pagos } from './pages/Pagos'
import { Personal } from './pages/Personal'
import { Propietario } from './pages/Propietario'

function App() {

  return (
    <div>
      <Nav/>
      <div className='App'>
        <Route path='/' component={Pagos}/>
        <Route path='/incidente' component={Incidente}/>
        <Route path='/propietario' component={Propietario}/>
        <Route path='/personal' component={Personal}/>
      </div>
    </div>
  )
}

export default App