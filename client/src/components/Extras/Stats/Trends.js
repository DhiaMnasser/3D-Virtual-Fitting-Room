import React from "react";
import GoogleTrends from "./GoogleTrends";
import "./Stats.css";

export default function Trends() {
  return (
    <>
      <h1> Google Trends</h1>
      <div id="widget">
        <GoogleTrends
          type="TIMESERIES"
          keyword="Fitting Room"
          url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
        />
        <GoogleTrends
          type="GEO_MAP"
          keyword="3D"
          url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
        />
      </div>
    </>
  );
}
