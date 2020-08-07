import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const App  = () => {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const  key = `4db3037f078521b122cfe50c8b39df46`
  // const  url = `api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}`
const url = "https://api.openweathermap.org/data/2.5/"

    const search = (e) => {
    // if (evt.key === 'Enter') {
      // e.preventDefault()
   
       fetch(`${url}weather?q=${query}&appid=${key}`)
       .then(resp => resp.json())
       .then(result => {
         setWeather(result);
         setQuery('');
         console.log(weather)
       })
      // }

    }
  
   useEffect (() => {
    search()
   },[])




      const dateBuilder = (d) =>  {
          let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",  "November", "December"];
          let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satuarday"];
            let  day = days[d.getDay()];
            let  date = d.getDate();
            let month = months[d.getMonth()];
            let  year =  d.getFullYear();


            return `${day} ${date} ${month} ${year}`

     }
     return (
      <div className={ 
        ( typeof weather.main  != "undefined") 
      ? ( (weather.main.temp > 16)
           ? 'back-sun-1' : 'back-sun')
           : 'back-sun'
           
      }>
     
        <div className='container'>
          <Row style={{display: 'flex', justifyContent: 'center'}}>
            <Col lg={12} style={{textAlign: 'center'}}>
             
              <input type='text'
                className='search-bar mr-3'
                placeholder='Search...'
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                
       
                
              />
              <button className='btn' onClick={search} style={{background: 'none', border: 'none'}}><FontAwesomeIcon style={{color: '#fff'}} icon={faSearch}/></button>

        {/* <h5>Weather for Anytime</h5> */}
            </Col>
          </Row>
          <Row>
            <Col lg={12} style={{textAlign: 'center'}}>
            {( typeof weather.main  != "undefined") ?
            (
                <div>
                  <div className='weather-box'>
                  
                  <div className='location' style={{color: '#fff', fontSize: '30px'}}>
                    {weather.name},  {weather.sys.country}
                  </div>
                  <div className='weather' style={{color: '#fff', fontSize: '20px', letterSpacing: '5px'}}>
                      {weather.weather[0].description}
                    </div>
                  <div className='date text-white' >{dateBuilder(new Date())}</div>
                    <div className='temp' style={{position: 'relative', color: '#fff', fontSize: '70px'}}>
                      {parseInt(Math.round((weather.main.temp - 32) * (5/9))  /100 * 10)} 
                    </div>
                    
                  </div>
                  </div>
              ) : (<h2 style={{color : '#fff', marginTop: '100px'}}>Enter city</h2>)
              }
             

            </Col>
          </Row>
        </div>
      </div>
    )
     
}

export default App;
