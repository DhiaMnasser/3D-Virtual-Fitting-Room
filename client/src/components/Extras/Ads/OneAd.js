import React from 'react';
import GoogleAdsense from 'react-adsense-google';

class OneAd extends React.Component {
  render() {
  return (
  <>
<GoogleAdsense
  adClient='ca-pub-1234567890'
  adSlot='9876543210'
/>

<GoogleAdsense
  adClient='ca-pub-1234567890'
  adSlot='9876543210'
  style={{'display': 'block', 'text-align': 'center'}}
  adLayout='in-article'
  adFormat='fluid'
  fullWidthResponsive='true'
/>
</>
)}
}
export default OneAd;