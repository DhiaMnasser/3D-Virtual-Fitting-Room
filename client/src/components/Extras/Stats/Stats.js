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
      <h2 style={{ marginTop: 60 }}>Key Words</h2>
      <Trends></Trends>
      <FPSStats />
      {/* <WidgetGoogleTrends word="Bitcoin" /> */}
   </div>  
  );
}
export default Stats;
