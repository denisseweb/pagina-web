import { Link } from "wouter"
import './Nav.css'

export function Nav() {
  return (
    <>
    <header className="top-bar">
      <nav>
        <ul className="ul">
          <li className="item">
            <Link href="/" className="link">Pagos</Link>
          </li>
          <li className="item">
            <Link href="/incidente" className="link">Incidentes</Link>
          </li>
          <li className="item">
            <Link href="/propietario" className="link">Propietarios</Link>
          </li>
          <li className="item">
            <Link href="/personal" className="link">Personal</Link>
          </li>
        </ul>
      </nav>
    </header>
    </>
  )
}