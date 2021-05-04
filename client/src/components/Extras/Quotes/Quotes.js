import React, { useState, useEffect } from "react";
import './Quotes.css'
const url = "https://api.quotable.io/random";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);

  //Fetch Quotes from API
  const getQuote = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setQuotes(data));
  };

  useEffect(() => {
    getQuote();
  }, []);

  const getNewQuote = () => {
    getQuote();
  };

  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotes.content} - ${quotes.author}`;
    window.open(twitterUrl, "_blank");
  };

  const { content, author } = quotes;
  return (
    <div className="box-centerside">
      <div className="text">
        <p>Quote of the day</p>
        <p>{content}</p>
      </div>
      <div className="author">
        <h5>{author}</h5>
        <div className="button-container">
          <button class="btn btn-primary" onClick={getNewQuote}>Next Quote</button>
        </div>
      </div>
    </div>
  );
};

export default Quotes;