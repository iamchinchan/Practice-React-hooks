import QuoteForm from "../components/quotes/QuoteForm";
import { Fragment,useEffect } from "react";
import {useHistory} from 'react-router-dom';
import useHttp from "../hooks/use-http";
import {addQuote} from '../lib/api';
const NewQuote = () => {
  const history = useHistory();
  const {sendRequest,status}=useHttp(addQuote);
  useEffect(()=>{
    if(status==="completed"){
    history.replace('/quotes');
    }
  },[status,history]);
  const addQuoteHandler=(quoteData)=>{
    console.log("author: ",quoteData.author, " and text is:  ",quoteData.text);
    //send new quote to firebase
    sendRequest(quoteData);
  }
  return (
    <Fragment>
      <h1>New Quote Page</h1>
      <QuoteForm isLoading={status==="pending"} onAddQuote={addQuoteHandler}/>
    </Fragment>
  );
};
export default NewQuote;
