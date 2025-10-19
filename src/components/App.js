import React,{useState,useEffect} from "react";
import './../styles/App.css';

const App = () => {
  const [input,setInput]=useState("");
  const [data,setData]=useState([]);
  const [error,setError]=useState(null);
  const apiKey="99eb9fd1";

const handleClick = () => {
  console.log(input);
    if (input.trim() === "") return;

    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(input)}`;
    
    fetch(url)
      .then((res) => res.json())
      .then((output) => {
        if (output.Response === "True") {
          setData(output.Search);
          console.log(output);
          setError(null);
        } else {
          setData([]);
          setError("Invalid movie name. Please try again.");
        }
      })
      .catch((err) => {
        setError("Something went wrong");
        console.error(err);
      });
  };

  return (
    <div>
        <h1>Search Movie</h1>
        <input type="text" placeholder="Enter movie name" onChange={(e)=>setInput(e.target.value)}/>
        <button onClick={handleClick}>Search</button>
        <div>
          <ul>
          {data.map((ele)=>
          <li>
            <div>
              <h1>{ele.Title} ({ele.Year})</h1>
                 <img src={ele.Poster}/>
            </div>
          </li>)}
          {error && <p>{error}</p>}
          </ul>
        </div>
    </div>
  )
}

export default App
