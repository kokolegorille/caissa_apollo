import React from "react";
import {A} from "hookrouter";

const MENUS = [
  {label: "Home", link: "/"},
  {label: "Games", link: "/games"},
  {label: "Eco", link: "/eco"},
];

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar-nav">
        {
          MENUS.map(menu => (
            <li key={menu.link}>
              <A className="nav-link" href={menu.link}>{menu.label}</A>
            </li>
          ))
        }
      </ul>
    </nav>
  )
};

export default Navbar;