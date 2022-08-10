import { createContext } from "react";
import * as tweetServices from '../services/tweetServices'
import { useState } from "react";

export const TweetContext = createContext();

export const TweetProvider = ({children, }) => {
    const [tweets, setTweets] = useState([]);
    const [composePopup, setComposePopup] = useState(false);
  
    const updateTweets = async () => {
      const data = await tweetServices.getAll();
      const tweetTemp = ((data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).sort((a, b) => b.timestamp - a.timestamp));
      setTweets(tweetTemp.filter((tweet) => tweet.isReply == false))
    }

    return (
        <TweetContext.Provider value={{ updateTweets, tweets, setTweets, composePopup, setComposePopup }}>
            {children}
        </TweetContext.Provider>
    )
}