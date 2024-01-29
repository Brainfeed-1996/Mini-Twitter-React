import {useState} from'react';
import {Tweet} from './Tweet.jsx';

const DEFAULT_TWEET = [
    {
      id: 0,
      name: "Melvyn", 
      content: "Je vais bien", 
      like: 1000,
    },
    {
      id: 1,
      name: "Didier", 
      content: "Cool", 
      like: 20,
    },
    {
      id: 2,
      name: "Lucas", 
      content: "SUPER", 
      like: 0,
    },
    {
      id: 3,
      name: "Jean", 
      content: "FUN", 
      like: 7,
    },
  ]
function App(){
  const [tweets, setTweets] = useState(DEFAULT_TWEET);
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const content = event.target.content.value;

    const newTweet = {
      id: tweets[tweets.length - 1]?.id + 1 ?? 0,
      name,
      content,
      like :0,
    }

    setTweets([...tweets, newTweet]);
  }

  const onDelete = (tweetId) => {
    setTweets(curr => curr.filter(tweet => tweet.id!== tweetId));
  };

  const onLike = (tweetId) => {
    setTweets(curr => {
      const copyTweet = [...curr];

      const likedTweet = copyTweet.find(tweet => tweet.id === tweetId);
      likedTweet.like += 1;

      return copyTweet;
        })
      }

  return(
    <div>
        <form onSubmit={handleSubmit} className="tweet-form">
          <h4>New Tweet</h4>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="content" placeholder="Content" />
          <input type="number" name="like" placeholder="Like" />
          <button type="submit">Add</button>
        </form>
      <div className="tweet-container">
      {tweets.map((tweet) => {
        return(
          <Tweet
            key={tweet.id} 
            id={tweet.id}
            name={tweet.name} 
            content={tweet.content} 
            like={tweet.like}
            onDelete={(id) => {
              onDelete(id);
            }}
            onLike={(id) => {
              onLike(id)
            }}
          />
        );
      })}
      </div>
    </div>
    );
}
export default App;