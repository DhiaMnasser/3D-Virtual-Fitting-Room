import Geo from "../../Extras/Geo/Geo"
import Map from "../../Extras/Geo/Map"
import Weather from "../../Extras/Geo/Weather"
import React, { useState, useEffect } from 'react'

function Help() {
    return (
        <>
        <h1>Position</h1>
        <Geo></Geo>
        <h1>Weather</h1>
        <Weather></Weather>
        <h1>Map</h1>
        <Map></Map>
        </>
    )
}

export default Help;