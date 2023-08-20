import "./App.css"
import React, { useEffect, useState } from 'react'

const App = () => {

  const [endPoint, setEndPoint] = useState('');
  const [container, setContainer] = useState([]);
  const [finalPoint, setFinalPoint] = useState('');

  useEffect(() => {
    fetchMe();
  }, [finalPoint]);


  const fetchMe = () => {

    fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=+${endPoint}`, {
      "method": "GET",
      "headers": {
        'X-RapidAPI-Key': 'a1a3c0bd7cmsh48aefb17e399b66p17b261jsnfb411f170ae0',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    })

      .then(response => {
        return response.json();
      })
      .then(data => {
        setContainer(data.d);
      })
      .catch(err => {
        console.log(err);
      })

  }
  const changeHandle = (e) => {
    setEndPoint(e.target.value);
  }

  const preventSubmit = (e) => {
    e.preventDefault();
    setFinalPoint(endPoint);
  }



  return (
    <div className="App">

      <form onSubmit={preventSubmit}>
        <input type="text" value={endPoint} onChange={changeHandle} />
        <button type='submit'>Submit</button>
      </form>

      <div className="element">
        {container.map((item, ind) => {
          return (
            <div key={ind} className="element-div">
              <img src={item.i.imageUrl} alt="" />
              <p>{item.l}</p>
              <h3>{item.s}</h3>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default App