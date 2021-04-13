import React from "react";
import FPSStats from "react-fps-stats";
import Trends from "./Trends";
//import {WidgetGoogleTrends} from 'widget-google-trends';
function Stats() {
  const GoogleTrends = require('google-trends-api');
  GoogleTrends.interestOverTime({keyword: 'Women\'s march'})
  .then(function(results){
    console.log('These results are awesome', results);
  })
  .catch(function(err){
    console.error('Oh no there was an error', err);
  });
  
  return(
    <div>
      <h2 style={{ marginTop: 60 }}>Minimal example using react-fps-stats</h2>
      <FPSStats />
      <Trends></Trends>
      {/* <WidgetGoogleTrends word="Bitcoin" /> */}
   </div>  
  );
}
export default Stats;
