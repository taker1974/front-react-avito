import React from "react";
import { Link, useLocation } from "react-router-dom";
import Ad from "../ad/Ad";
import AdsCardListButton from "../adsCardListButton/AdsCardListButton";

function Ads({ ads, isAuthorized, visiableAds, showMoreAds }) {
  let location = useLocation().pathname;

  console.log('location', location, ads);
  return (
    <section className={`ads ${location === "/profile" ? "padding" : ""}`}>
      {!ads.length ? (
        <p>У Вас еще нет обьявлений.</p>
      ) : (
        <ul
          className={`ads__container ${
            location === "/profile" ? "ads__container-profile" : ""
          }`}
        >
          {ads.slice(0, visiableAds).map((ad) => {
            return (
              <Link
                key={ad.id}
                to={localStorage.getItem('authTokens') ? `ads/${ad.id}` : "/"}
                className="ads__link"
              >
                <Ad
                  key={ad.id}
                  id={ad.id}
                  title={ad.title}
                  image={ad.image}
                  price={ad.price}
                  description={ad.description}
                />
              </Link>
            );
          })}
        </ul>
      )}
      {visiableAds < ads.length && (
        <AdsCardListButton showMoreAds={showMoreAds} />
      )}
    </section>
  );
}

export default Ads;
