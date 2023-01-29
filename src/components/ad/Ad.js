import React from "react";
import img from "../../images/malvestida-u79wy47kvVs-unsplash.jpg";

function Ad(ad) {
  return (
    <li className="ad" key={ad.id}>
      {ad.image ? (
        <img src={"http://localhost:8080"+ad.image} className="ad-img" alt="product img" />
      ) : ad.image === null ? (
        <div className="ad-img_null" />
      ) : (
        <img src={img} className="ad-img" alt="product img" />
      )}
      <div className="ad__description">
        <h2 className="ad__title">{ad.title}</h2>
        <p className="ad__price">{ad.price} &#8381;</p>
      </div>
    </li>
  );
}

export default Ad;
