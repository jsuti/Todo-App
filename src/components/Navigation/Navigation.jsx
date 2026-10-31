import "./Navigation.css";
import { Home, Trophy, Settings } from "lucide-react";

function Navigation() { return ( 

<nav className="bottom-nav" aria-label="Hauptnavigation"> 
    
  <a className="bottom-nav__item bottom-nav__item--active" href="#home" aria-current="page" > 
    <Home size={23} strokeWidth={2} />
    <span>Home</span> 
  </a>

  <a className="bottom-nav__item" href="#aufgaben">
    <Trophy size={23} strokeWidth={2} />
    <span>Aufgaben</span>
  </a>

  <a className="bottom-nav__item" href="#profil">
    <Settings size={23} strokeWidth={2} />
    <span>Profil</span>
  </a>
</nav>


); }

export default Navigation;