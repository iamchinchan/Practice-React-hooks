import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from '../components/UI/LoadingSpinner';
import React, { useEffect } from "react";
import useHttp from '../hooks/use-http';
import {getAllQuotes} from '../lib/api';
import NoQuotesFound from "../components/quotes/NoQuotesFound";
const AllQuotes = () => {
  const {status,data,sendRequest,error} = useHttp(getAllQuotes,true);
  useEffect(()=>{
    sendRequest();
  },[sendRequest])
  if(status==="pending"){
    return(<div className="centered">
      <LoadingSpinner></LoadingSpinner>
    </div>);
  }
  if(error){
    return <p className="centered focused">{error}</p>
  }
  if(status==="completed" && (!data || data.length===0)){
    return <NoQuotesFound></NoQuotesFound>;
  }
  return (
    <React.Fragment>
      <h1>All Quotes Page</h1>
      <QuoteList quotes={data}/>
    </React.Fragment>
  );
};
export default AllQuotes;
