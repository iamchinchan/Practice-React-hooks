import { useState,useEffect, useCallback } from 'react';
import useHttp from '../../hooks/use-http';
import {getAllComments} from '../../lib/api';
import {useParams} from 'react-router-dom';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
  const {error,sendRequest,data:commentsData,status}=useHttp(getAllComments);
  const params = useParams();
  const {quoteId} =params;
  // console.log("match in comments: ",match);
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(()=>{
    sendRequest(quoteId);
  },[quoteId,sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  
  //wrapped in useCallback because 
  const refetchCommentsHandler=useCallback(()=>{
    //send request to firebase to fetch all coments.
    sendRequest(quoteId);
  },[sendRequest,quoteId]);
  let comments;

  if(status==="pending"){
    comments=<div className="centered">
      <LoadingSpinner></LoadingSpinner>
    </div>
  }
  if(status==="completed" && (commentsData && commentsData.length>0)){
    comments=<CommentsList comments={commentsData}/>
  }
  if(status==="completed" && (!commentsData || commentsData.length===0)){
    comments=<p className="centered">No comments were added yet!</p>;
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={refetchCommentsHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
