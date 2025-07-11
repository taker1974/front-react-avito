import React from "react";
import MediaQuery from "react-responsive";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Button from "../button/Button";

function Header({ onOpen, isAuthorized, signOut }) {
  let location = useLocation().pathname;
  
  return (
    <header className="header">
      {/* Всегда оборачиваем логотип в Link */}
      <Link className="link" to="/">
        <img 
          className="header__img" 
          src={'/src/images/main_left_top_image_v5.png'} 
          alt="Main logo" 
        />
      </Link>

      {/* Дополнительные элементы в зависимости от условий */}
      {location === "/sign-up" ? null : 
       location === "/sign-in" ? null : 
       location === "/sign-in/email" ? null : 
       location === "/sign-in/email/newpassword" ? null : 
       isAuthorized ? (
        <>
          <MediaQuery minWidth={1000}>
            <Button
              logOut={signOut}
              text="Выйти"
              className="button-link button-link__text"
              user={isAuthorized}
            />
          </MediaQuery>
          <MediaQuery maxWidth={999}>
            <img
              className="header__sandwich"
              src={'/src/images/sandwich__icon.png'}
              alt="sandwich icon"
              onClick={onOpen}
            />
          </MediaQuery>
        </>
      ) : (
        <Link className="link" to="/sign-in">
          <Button
            login={isAuthorized}
            text="Войти"
            className="button-link button-link__text"
          />
        </Link>
      )}
    </header>
  );
}

export default Header;
