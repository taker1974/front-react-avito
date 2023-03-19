import React, {useState, useEffect} from "react";
import api from "../../utils/api";

import Buttons from "../buttons/Buttons";
import EditCommentPopup from "../editCommentPopup/EditCommentPopup";

function Comment({
    text,
    deleteComment1,
    adId,
    img,
    commentId,
    authorId: userId,
    authorName,
    currentUserId: user,
    username,
    password,
}) {

    const [isEdit, setEdit] = useState(false);
    const [adComment, setAdComment] = useState({});
    // console.log('Comment', adComment);
    const toggleEdit = () => setEdit(!isEdit);
    useEffect(() => {
        api
            .getComment(adId, commentId, username, password)
            .then((res) => {
                setAdComment(res);
            })
            .catch((error) => console.log("error", error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adId, commentId, text]);

    const handleEditComment = (data) => {
        api
            .editComment(adId, commentId, data, username, password)
            .then((res) => {
                setAdComment(res);
            })
            .catch((error) => console.log("error", error));
    };

    const onDelete = (e) => {
        e.preventDefault();
        deleteComment1(adId, commentId);
    };

    return (
        <li className="comment" key={commentId}>
            <div className="comment-box">
                {img ? (
                    <img src={img} alt="user-img" className="comment-img"/>
                ) : (
                    <img src={'images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg'} alt="user-img" className="comment-img"/>
                )}
                <p className="comment-text comment__author-text">
                    {authorName}
                </p>
            </div>
            <div className="commentBox">
                <p className="comment-text comment-message">{adComment.text}</p>
                {user === userId ? (
                    <Buttons
                        className="comment-buttons"
                        classButton="comment-button"
                        onOpen={toggleEdit}
                        onSubmit={onDelete}
                        key={`${commentId}-btn`}
                    />
                ) : null}
                <EditCommentPopup
                    onClose={toggleEdit}
                    isOpen={isEdit}
                    id={adId}
                    getComm={adComment}
                    handleEdit={handleEditComment}
                    userId={user}
                    commentUserId={userId}
                    commentId={commentId}
                    currentComId={adComment.pk}
                    key={`${commentId}-popup`}/>
            </div>
        </li>
    );
}

export default Comment;
