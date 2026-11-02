import "./Navigation.css";
import { Home, Trophy, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bottom-nav" aria-label="Hauptnavigation">

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`
        }
      >
        <Home size={23} strokeWidth={2} />
        <span>ToDos</span>
      </NavLink>

      <NavLink
        to="/rangliste"
        className={({ isActive }) =>
          `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`
        }
      >
        <Trophy size={23} strokeWidth={2} />
        <span>Rangliste</span>
      </NavLink>

      <NavLink
        to="/einstellungen"
        className={({ isActive }) =>
          `bottom-nav__item ${isActive ? "bottom-nav__item--active" : ""}`
        }
      >
        <Settings size={23} strokeWidth={2} />
        <span>Einstellungen</span>
      </NavLink>

    </nav>
  );
}

export default Navigation;