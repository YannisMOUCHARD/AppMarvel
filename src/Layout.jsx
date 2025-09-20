import { Outlet, NavLink } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              À propos
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      <hr />
      {/* Ici s'afficheront les pages enfants */}
      <Outlet />
    </div>
  );
}

export default Layout;
