// https://www.w3schools.com/howto/howto_css_menu_icon.asp

import React, {useRef} from "react";
import PropTypes from "prop-types";

import "./menu_icon.scss";

const MenuIcon = ({callback, closed = false}) => {
  const menuRef = useRef();

  const handleOnClick = () => {
    menuRef.current.classList.toggle("change");
    callback();
  };
  const cssClass = closed ? "menu-icon-wrapper change" : "menu-icon-wrapper";

  return (
    <div
      ref={menuRef}
      onClick={handleOnClick}
      className={cssClass}>
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
};

MenuIcon.propTypes = {
  callback: PropTypes.func.isRequired,
  // Optional
  closed: PropTypes.bool,
};

export default MenuIcon;
