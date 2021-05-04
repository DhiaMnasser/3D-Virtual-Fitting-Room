import Geo from "../../Extras/Geo/Geo"
import Map from "../../Extras/Geo/Map"
import Weather from "../../Extras/Geo/Weather"
import GAds from "../../Extras/Ads/GAds"
import React, { useState, useEffect } from 'react'
// import Ads from "../../Extras/Ads/Ads"
import OneAd from "../../Extras/Ads/OneAd"
import Quotes from "../../Extras/Quotes/Quotes"
import Converter from "../../Extras/Converter/Converter"
import CurrencyConverter from 'react-currency-conv';
import Messages from "../Contact/ListContact"

function Help() {
    return (
        <>
        {/* <GAds></GAds>
        <Ads></Ads> */}
        <Quotes></Quotes>
        {/* <h1>Converter</h1>
        <CurrencyConverter from={'USD'} to={'CAD'} value={29}/> */}
        <span class="border border-dark">
        <Geo></Geo>       
        <h1>Weather</h1>
        <Weather></Weather>
        <h1>Map and Position</h1>
        <Map></Map>
        <Messages></Messages>
        </span>
        </>
    )
}

export default Help;