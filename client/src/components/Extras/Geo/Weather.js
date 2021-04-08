import React, { Component, useState } from 'react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
//Optional include of the default css styles
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css"
  type="text/css"
/>
const customStyles = {
	fontFamily:  'Helvetica, sans-serif',
	gradientStart:  '#0181C2',
	gradientMid:  '#04A7F9',
	gradientEnd:  '#4BC4F7',
	locationFontColor:  '#FFF',
	todayTempFontColor:  '#FFF',
	todayDateFontColor:  '#B5DEF4',
	todayRangeFontColor:  '#B5DEF4',
	todayDescFontColor:  '#B5DEF4',
	todayInfoFontColor:  '#B5DEF4',
	todayIconColor:  '#FFF',
	forecastBackgroundColor:  '#FFF',
	forecastSeparatorColor:  '#DDD',
	forecastDateColor:  '#777',
	forecastDescColor:  '#777',
	forecastRangeColor:  '#777',
	forecastIconColor:  '#4BC4F7',
};
function Weather() {
    // const [lat, setLat] = useState(0);
    // const [lng, setLng] = useState(0);
    // const AnyReactComponent = ({ text }) => <div>{text}</div>;
    // const position = () => {
    //     navigator.geolocation.getCurrentPosition(
    //       function(position) {
    //         console.log(position);
    //         setLat(position.coords.latitude);
    //         setLng(position.coords.longitude)
    //   });
    // }
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '94e26dd69b6178233534fb1109fe0bf0',
    lat: '36.9061097',
    lon: '10.191628099999999',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });

  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Tunisia"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
  );
};

  export default Weather;