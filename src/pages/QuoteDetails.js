import { useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getSingleQuote } from "../lib/api";

const QuoteDetails = () => {
  const { error, status, sendRequest, data } = useHttp(getSingleQuote,true);
  const match = useRouteMatch();
  const params = useParams();
  const {quoteId}=params;
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest,quoteId]);
  // const quote = data.find((quote) => quote.id === params.quoteId);
  // console.log("data is: ", data);
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if(error){
    return <p className="centered focused">{error}</p>
  }
  if (!data.text) {
    return <p className="centered ">No quote found!</p>;
  }
  return (
    <section>
      {/* <h1>Quote Details Page</h1> */}
      <HighlightedQuote text={data.text} author={data.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments></Comments>
      </Route>
    </section>
  );
};
export default QuoteDetails;
