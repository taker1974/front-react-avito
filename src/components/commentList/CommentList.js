import React from "react";
import Comment from "../comment/Comment";

function CommentList({ 
    comments, 
    setComments, 
    user, 
    adId, 
    username, 
    password, 
    handleEditCommPopupOpen, 
    deleteComment,
    onClose,
    isComPopupOpen
}) {
  //console.log('CommentList', deleteComment);

  return (
    <>
      {!comments.length ? (
        <p className="comment-text">Оставьте комментарий первым</p>
      ) : (
        <ul className="comment-list">
          {comments.map((comment, ind) => {
            return (
              <Comment
                isComPopupOpen={isComPopupOpen}
                key={`${comment.pk}-par-${ind}`}
                text={comment.text}
                deleteComment1={deleteComment}
                adId={adId}
                img={comment.author_image}
                authorName={comment.author_first_name}
                commentId={comment.pk}
                authorId={comment.author}
                setComments={setComments}
                handleEditCommPopupOpen={handleEditCommPopupOpen}
                currentUserId={user}
                username={username}
                password={password}
                onClose={onClose}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}

export default CommentList;
