import React, { Component, useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBatteryThreeQuarters,
  faWifi,
  faCloudRain,
  faSun,
  faCloud,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const key = `4db3037f078521b122cfe50c8b39df46`;
  const url = "https://api.openweathermap.org/data/2.5/";

  const search = () => {
    fetch(`${url}forecast?q=${query}&appid=${key}&units=metric`)
      .then((resp) => resp.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(weather);
      });
    // }
  };

  useEffect(() => {
    search();
  }, []);

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Satuarday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();

    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div
      className={
        typeof weather.list != "undefined"
          ? weather.list[0].main.temp > 12 &&
            weather.list[0].weather[0].description === "clear sky" &&
            "6:00:00 PM" > time &&
            time > "6:00:00 AM"
            ? "back-sun-1"
            : weather.list[0].main.temp > 12 &&
              weather.list[0].weather[0].description === "clear sky" &&
              "6:00:00 AM" > time &&
              time > "01:00:00 AM"
            ? "night"
            : weather.list[0].main.temp > 12 &&
              weather.list[0].weather[0].description === "broken clouds" &&
              "6:00 PM" > time > "9:00 AM"
            ? "clouds"
            : weather.list[0].main.temp > 12 &&
              weather.list[0].weather[0].description === "overcast clouds" &&
              "6:00 PM" > time > "9:00 AM"
            ? "clouds"
            : weather.list[0].main.temp > 0 &&
              weather.list[0].weather[0].description === "light rain"
            ? "back-raining"
            : weather.list[0].main.temp < 16 &&
              weather.list[0].weather[0].description === "scattered clouds" &&
              "6:00 PM" > time > "9:00 AM"
            ? "scattered-clouds"
            : weather.list[0].main.temp < 4 && "6:00 PM" > time > "9:00 AM"
            ? "winter"
            : "back-sun"
          : "back-sun"
      }
    >
      <div className="container">
        <Row className="pt-2 text-white">
          <Col>{time}</Col>
          <Col style={{ textAlign: "right" }}>
            <FontAwesomeIcon icon={faWifi} style={{ cololr: "#fff" }} />
            <FontAwesomeIcon
              icon={faBatteryThreeQuarters}
              style={{ cololr: "#fff", marginLeft: "5px" }}
            />
          </Col>
        </Row>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col lg={12} style={{ textAlign: "center" }}>
            <input
              type="text"
              className="search-bar mr-3"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              style={{ position: "relative" }}
            />
            <button
              className="btn"
              onClick={search}
              style={{
                position: "absolute",
                right: "30px",
                top: "17px",
                background: "none",
                border: "none",
              }}
            >
              <FontAwesomeIcon style={{ color: "#919296" }} icon={faSearch} />
            </button>
          </Col>
        </Row>
        <Row
          style={{
            textAlign: "center",
            margin: "15px auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {typeof weather.list != "undefined" ? (
            <>
              <Col
                lg={12}
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div>
                  <div className="weather-box">
                    <div
                      className="location"
                      style={{ color: "#fff", fontSize: "30px" }}
                    >
                      {weather.city.name}, {weather.city.country}
                    </div>
                    <div
                      className="weather"
                      style={{
                        color: "#fff",
                        fontSize: "20px",
                        letterSpacing: "5px",
                      }}
                    >
                      {weather.list[0].weather[0].description}
                    </div>
                    <div className="date text-white">
                      {dateBuilder(new Date())}
                    </div>
                    <div
                      className="temp pt-4"
                      style={{
                        position: "relative",
                        color: "#fff",
                        fontSize: "70px",
                      }}
                    >
                      {/* {parseInt(Math.round((weather.main.temp - 32) * (5/9))  /100 * 10)}  */}
                      {Math.round(weather.list[0].main.temp)}
                    </div>
                  </div>
                </div>
              </Col>

              <Col
                lg={12}
                style={{
                  textAlign: "center",
                  paddingBottom: "25px",
                  marginTop: "20px",
                  backgroundColor: "rgba(238,238,238,0.3)",
                }}
              >
                {/* next day       1      */}
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    color: "#fff",
                    fontSize: "20px",
                  }}
                >
                  <Col style={{ textAlign: "left" }}>
                    {new Date(weather.list[3].dt_txt).toLocaleDateString(
                      ["en-GB"],
                      { weekday: "long" }
                    )}
                  </Col>

                  <Col>
                    {weather.list[3].weather[0].description ===
                    "broken clouds" ? (
                      <FontAwesomeIcon
                        icon={faCloud}
                        style={{ color: "#fff" }}
                      />
                    ) : weather.list[3].weather[0].description ===
                      "clear sky" ? (
                      <FontAwesomeIcon
                        icon={faSun}
                        style={{ color: "yellow" }}
                      />
                    ) : weather.list[3].weather[0].description ===
                      "light snow" ? (
                      <FontAwesomeIcon
                        icon={faSnowflake}
                        style={{ color: "#fff" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCloudRain}
                        style={{ color: "#fff" }}
                      />
                    )}
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    {Math.round(weather.list[3].main.temp)}&#176;
                  </Col>
                </Row>

                {/* next day     2        */}

                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "20px",
                    color: "#fff",
                    fontSize: "20px",
                  }}
                >
                  <Col style={{ textAlign: "left" }}>
                    {new Date(weather.list[10].dt_txt).toLocaleDateString(
                      ["en-GB"],
                      { weekday: "long" }
                    )}
                  </Col>
                  <Col>
                    {weather.list[10].weather[0].description ===
                    "broken clouds" ? (
                      <FontAwesomeIcon
                        icon={faCloud}
                        style={{ color: "#fff" }}
                      />
                    ) : weather.list[10].weather[0].description ===
                      "clear sky" ? (
                      <FontAwesomeIcon
                        icon={faSun}
                        style={{ color: "yellow" }}
                      />
                    ) : weather.list[10].weather[0].description ===
                      "light snow" ? (
                      <FontAwesomeIcon
                        icon={faSnowflake}
                        style={{ color: "#fff" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCloudRain}
                        style={{ color: "#fff" }}
                      />
                    )}
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    {Math.round(weather.list[10].main.temp)}&#176;
                  </Col>
                </Row>
                {/* next day     3        */}
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "20px",
                    color: "#fff",
                    fontSize: "20px",
                  }}
                >
                  <Col style={{ textAlign: "left" }}>
                    {new Date(weather.list[18].dt_txt).toLocaleDateString(
                      ["en-GB"],
                      { weekday: "long" }
                    )}
                  </Col>
                  <Col>
                    {weather.list[18].weather[0].description ===
                    "broken clouds" ? (
                      <FontAwesomeIcon
                        icon={faCloud}
                        style={{ color: "#fff" }}
                      />
                    ) : weather.list[18].weather[0].description ===
                      "clear sky" ? (
                      <FontAwesomeIcon
                        icon={faSun}
                        style={{ color: "yellow" }}
                      />
                    ) : weather.list[18].weather[0].description ===
                      "light snow" ? (
                      <FontAwesomeIcon
                        icon={faSnowflake}
                        style={{ color: "#fff" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCloudRain}
                        style={{ color: "#fff" }}
                      />
                    )}
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    {Math.round(weather.list[18].main.temp)}&#176;
                  </Col>
                </Row>
                {/* next day     4        */}
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "20px",
                    color: "#fff",
                    fontSize: "20px",
                  }}
                >
                  <Col style={{ textAlign: "left" }}>
                    {new Date(weather.list[26].dt_txt).toLocaleDateString(
                      ["en-GB"],
                      { weekday: "long" }
                    )}
                  </Col>
                  <Col className="col-2">
                    {weather.list[26].weather[0].description ===
                    "broken clouds" ? (
                      <FontAwesomeIcon
                        icon={faCloud}
                        style={{ color: "#fff" }}
                      />
                    ) : weather.list[26].weather[0].description ===
                      "clear sky" ? (
                      <FontAwesomeIcon
                        icon={faSun}
                        style={{ color: "yellow" }}
                      />
                    ) : weather.list[26].weather[0].description ===
                      "light snow" ? (
                      <FontAwesomeIcon
                        icon={faSnowflake}
                        style={{ color: "#fff" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCloudRain}
                        style={{ color: "#fff" }}
                      />
                    )}
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    {Math.round(weather.list[26].main.temp)}&#176;
                  </Col>
                </Row>
                {/* next day      5       */}
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "20px",
                    color: "#fff",
                    fontSize: "20px",
                  }}
                >
                  <Col style={{ textAlign: "left" }}>
                    {new Date(weather.list[34].dt_txt).toLocaleDateString(
                      ["en-GB"],
                      { weekday: "long" }
                    )}
                  </Col>
                  <Col>
                    {weather.list[34].weather[0].description ===
                    "broken clouds" ? (
                      <FontAwesomeIcon
                        icon={faCloud}
                        style={{ color: "#fff" }}
                      />
                    ) : weather.list[34].weather[0].description ===
                      "clear sky" ? (
                      <FontAwesomeIcon
                        icon={faSun}
                        style={{ color: "yellow" }}
                      />
                    ) : weather.list[34].weather[0].description ===
                      "light snow" ? (
                      <FontAwesomeIcon
                        icon={faSnowflake}
                        style={{ color: "#fff" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCloudRain}
                        style={{ color: "#fff" }}
                      />
                    )}
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    {Math.round(weather.list[34].main.temp)}&#176;
                  </Col>
                </Row>
              </Col>
            </>
          ) : (
            <h2 style={{ color: "#fff", marginTop: "100px" }}>Enter city</h2>
          )}
        </Row>
      </div>
    </div>
  );
};

export default App;
