import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentContainer from "../commentContainer/CommentContainer";
import EditAdPopup from "../editAdPopup/EditAdPopup";
import Buttons from "../buttons/Buttons";
import api from "../../utils/api";
import Preloader from "../preloader/Preloader";
import EditPhotoAdPopup from "../editPhotoAdPopup/EditPhotoAdPopup";

function SinglePage(props) {
  const { id } = useParams();
  const [ad, setAd] = useState({});
  const [comments, setComments] = useState([]);
  let adId = id;
  console.log('Single Page', props, ad);

  let history = useNavigate();

  useEffect(() => {
    if (props.isAuthorized) {
      props.setIsLoading(true);
      Promise.all([
        api.getComments(adId, props.username, props.password),
        api.getAd(id, props.username, props.password),
      ])
        .then(([commentsData, adData]) => {
          setComments(commentsData.results);
          setAd(adData);
        })
        .catch((error) => console.log("error", error))
        .finally(() => setTimeout(() => props.setIsLoading(false), 700));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isAuthorized]);

  function handleEditAdd(data) {
    props.setIsLoading(true);
    api
      .editAdd(id, data, props.username, props.password)
      .then((data) => {
        props.setAds((ads) =>
          ads.filter((i) => (i.id === ad.id ? data : null))
        );
      })
      .catch((error) => console.log("error", error))
      .finally(() => setTimeout(() => props.setIsLoading(false), 700));
  }

  function handleEditPhotoAdd(image) {
    api
      .editAddPhoto(id, image, props.username, props.password)
      .then((image) => {
        props.setAds((ads) =>
          ads.filter((i) => (i.id === ad.id ? image : null))
        );
      })
      .catch((error) => console.log("error", error));
  }

  function handleDeleteAdd(e) {
    api
      .deleteAdd(id, props.username, props.password)
      .then(() => {
        props.setAds((ads) => ads.filter((i) => i.id !== ad.id));
        history.push("/");
      })
      .catch((error) => console.log("error", error));
  }

  function handleAddComment(data) {
    api
      .addComment(id, data, props.username, props.password)
      .then((newComment) => {
        setComments([newComment, ...comments]);
      })
      .catch((error) => console.log("error", error));
  }
  
  function handleDeleteComment(adId, commentId) {
    api
      .deleteComment(adId, commentId, props.username, props.password)
      .then((newComment) => {
        // setComments([newComment, ...comments]);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <main className="cardInformation">
      {props.isLoading ? (
        <Preloader />
      ) : (
        ad && (
          <>
            <h1 className="cardInformation__title">{ad.title}</h1>
            <div className="cardInformation__container">
              {ad.image === null ? (
                <div className="cardInformation__img-null">
                  {props.user === ad.author_id ? (
                    <button
                      onClick={props.handleOpenEditPhotoPopup}
                      className="cardInformation__img-change"
                      type="button"
                    />
                  ) : null}
                </div>
              ) : (
                <div
                  style={{ backgroundImage: `url(${"http://localhost:8080"+ad.image})` }}
                  className="cardInformation__img"
                >
                  {props.user === ad.author_id ? (
                    <button
                      onClick={props.handleOpenEditPhotoPopup}
                      className="cardInformation__img-change"
                      type="button"
                    />
                  ) : null}
                </div>
              )}
              {props.user !== ad.author_id ? null : (
                <Buttons
                  user={props.user}
                  product={ad}
                  onOpen={props.handleOpenEditPopup}
                  className="buttons"
                  classButton="buttons-item"
                  onSubmit={handleDeleteAdd}
                />
              )}
              <div className="cardInformation__box">
                <div className="cardInformation__box_second">
                  <p className="cardInformation__tel">{ad.phone}</p>
                  <p className="cardInformation__tel">{ad.author_first_name}</p>
                </div>
                <p className="cardInformation__price">{ad.price} &#8381;</p>
                {props.username == ad.email ? (
                  <div className="buttons__container">
                    <button className="editAd">Edit</button><button className="deleteAd">Delete</button>
                  </div>
                ) : (<div></div>)}
              </div>
              <div className="cardInformation__box">
                <p className="cardInformation__description">{ad.description}</p>
              </div>
              <CommentContainer
                comments={comments}
                addComment={handleAddComment}
                deleteComment={handleDeleteComment}
                isComPopupOpen={props.isComPopupOpen}
                handleEditCommPopupOpen={props.handleEditCommPopupOpen}
                setComments={setComments}
                user={props.user}
                username={props.username}
                password={props.password}
                adId={adId}
              />
            </div>
            <EditAdPopup
              isEditPopupOpen={props.isEditPopupOpen}
              onClose={props.onClose}
              handleEditAdd={handleEditAdd}
              id={id}
              ad={ad}
            />
            <EditPhotoAdPopup
              id={id}
              handleEdit={handleEditPhotoAdd}
              isOpen={props.isEditPhotoPopupOpen}
              onClose={props.onClose}
            />
          </>
        )
      )}
    </main>
  );
}

export default SinglePage;
