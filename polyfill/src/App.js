import Counter from "./components/counter";
import CounterWithSquare from "./components/counterWithSquare";
import { HeartIcon, SpinnerIcon } from "./icons";
import { useState } from "react";
function App() {
  const [liked, setLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const handleLikeUnlike = async () => {
    setError(null);
    setIsFetching(true);
    try {
      const response = await fetch('https://www.greatfrontend.com/api/questions/like-button', {
        method: 'POST',
        headers: { 'Content-Type':'application/json'},
        body: {
          'action': liked?'unlike':'like'
        }
      })
      if (response.status>=200 && response.status<300) {
        setLiked(!liked);
      } else {
        const res = await response.json();
        console.log(res);
        setError(res.message);
        return;
      }
      console.log(response);
    } finally {
      setIsFetching(false);
    }
  }
  return (
    <div className="App">
      {/* <Counter /> */}
      {/* <CounterWithSquare /> */}
      <button className={`like-btn ${liked ? 'liked' : ''}`}
        onClick={() => {
          handleLikeUnlike();
        }}>
        {isFetching ? <SpinnerIcon/> : <HeartIcon/>}
        {liked ? 'Liked' : 'Like'}
      </button>
      {error && <div>{error}</div>}
    </div>
  );
}

export default App;
