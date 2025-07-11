import React from "react";
import MediaQuery from "react-responsive";
import SearchForm from "../searchForm/SearchForm";

function Promo({ ad, setAd }) {
  return (
    <section className="promo">
      <MediaQuery minWidth={801}>
        <div className="promo__box">
          <div className="promo__title-box">
            <h2 className="promo__title">Объявления</h2>
            <p className="promo__subtitle">
              https://github.com/taker1974
            </p>
          </div>
          <SearchForm
            ad={ad}
            setAd={setAd}
          />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={800}>
        <h2 className="promo__title">Объявления</h2>
        <p className="promo__subtitle">
              https://github.com/taker1974
        </p>
        <SearchForm ad={ad} setAd={setAd} />
      </MediaQuery>
    </section>
  );
}

export default Promo;
