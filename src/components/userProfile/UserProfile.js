import React from "react";
import { Link } from "react-router-dom";
import Profile from "../profile/Profile";
import Ads from "../ads/Ads";
import Preloader from "../preloader/Preloader";
import EditUserImgPopup from "../editUserImgPopup/EditUserImgPopup";
import {connect} from 'react-redux';

function UserProfile({
    userInfo,
    onOpen,
    handleUpdateUser,
    handleUpdatePassword,
    isLoading,
    userAds,
    visiableAds,
    showMoreAds,
    isOpen,
    onClose,
    handleUpdateUserPhoto,
}) {
  // console.log('userProfile', props);
  return (
    <main className="main">
      <section className="userProfile-grid padding">
        <div className="userProfile-container">
          <div
            className="profile-avatar"
            style={{
              backgroundImage: `url(${
                userInfo.image ? (`http://${userInfo.username}:${userInfo.password}@localhost:8080` + userInfo.image) : 'images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg'
              })`,
            }}
          >
            <button className="profile-avatar__button" onClick={onOpen} />
          </div>
        </div>
        <Profile
          userInfo={userInfo}
          handleUpdateUser={handleUpdateUser}
          handleUpdatePassword={handleUpdatePassword}
        />
      </section>
      <div className="userProfile-container">
        <h2 className="userProfile-title padding">Мои товары</h2>
        <Link to="/newAd" className="link-button">
          <button className="link-btn" />
        </Link>
      </div>
      <section className="pagination-container padding"></section>
      {isLoading ? (
        <Preloader />
      ) : (
        <Ads
          ads={userAds || []}
          visiableAds={visiableAds}
          showMoreAds={showMoreAds}
          isAuthorized={!!userInfo.password}
        />
      )}
      <EditUserImgPopup
        isOpen={isOpen}
        onClose={onClose}
        editUserPhoto={handleUpdateUserPhoto}
      />
    </main>
  );
}

const ConnectUser = connect(
    (state) => {
        return {
            userInfo: {...state.userInfo},
            userAds: [...state.userAds]
        }
    }
)(UserProfile)

export default ConnectUser;
