import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap'



const App  = () => {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const  key = `4db3037f078521b122cfe50c8b39df46`
  const  url = `api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}`


    const search = evt => {
      if(evt.key === 'Enter') {

       fetch(url)
       .then(resp => resp.json())
       .then(result => {
         setWeather(result);
         setQuery('');
         console.log(result)
       })
      }
    }
  
   useEffect (() =>{
       search()
   }, [])




     //  const dateBuilder = (day) = {
    //          months = [],
    //          days = [],

    //          day = days[d.getDay()],
    //          date = d.getDate(),
    //          month = month[d.getMonth()],
    //          year =  d.getFullYear(),


    //         return `${day} ${date} ${month} ${year}`

    //  }
     return (
      <div className="App">
        <div className='container'>
          <Row>
            <Col lg={12}>
             
              <input type='text'
                className='search-bar'
                placeholder='Search...'
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
                
              />

        {/* <h5>Weather for Anytime</h5> */}
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              
              <div className='weather-box'>
              <div className='weather' style={{color: '#fff', fontSize: '50px'}}>
                  Cold
                </div>
              
              <div className='location' style={{color: '#fff', fontSize: '30px'}}>
                Kyiv {/* <div className='date'>{dateBuilder(new Date())}</div> */}
              </div>
                <div className='temp' style={{position: 'relative', color: '#fff', fontSize: '70px'}}>
                  30
                </div>
               
              </div>

            </Col>
          </Row>
        </div>
      </div>
    )
     
}

export default App;
