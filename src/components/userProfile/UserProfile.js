import React from "react";
import { Link } from "react-router-dom";
import Profile from "../profile/Profile";
import Ads from "../ads/Ads";
import Preloader from "../preloader/Preloader";
import EditUserImgPopup from "../editUserImgPopup/EditUserImgPopup";
import defaultImg from "../../images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg";

function UserProfile(props) {
  console.log('userProfile', props);
  return (
    <main className="main">
      <section className="userProfile-grid padding">
        <div className="userProfile-container">
          <div
            className="profile-avatar"
            style={{
              backgroundImage: `url(${
                props.userInfo.image ? ("http://localhost:8080" + props.userInfo.image) : defaultImg
              })`,
            }}
          >
            <button className="profile-avatar__button" onClick={props.onOpen} />
          </div>
        </div>
        <Profile
          userInfo={props.userInfo}
          handleUpdateUser={props.handleUpdateUser}
          handleUpdatePassword={props.handleUpdatePassword}
        />
      </section>
      <div className="userProfile-container">
        <h2 className="userProfile-title padding">Мои товары</h2>
        <Link to="/newAd" className="link-button">
          <button className="link-btn" />
        </Link>
      </div>
      <section className="pagination-container padding"></section>
      {props.isLoading ? (
        <Preloader />
      ) : (
        <Ads
          ads={[]}
          // ads={props.userAds.results}
          visiableAds={props.visiableAds}
          showMoreAds={props.showMoreAds}
          isAuthorized={localStorage.getItem('authTokens') ? true : false}
        />
      )}
      <EditUserImgPopup
        isOpen={props.isOpen}
        onClose={props.onClose}
        editUserPhoto={props.handleUpdateUserPhoto}
      />
    </main>
  );
}

export default UserProfile;
