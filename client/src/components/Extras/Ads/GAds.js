import React from 'react';
import AdSense from 'react-adsense';
 
// ads with no set-up
class GAds extends React.Component {
render() {
return (
<>
<AdSense.Google
  client='ca-pub-7292810486004926'
  slot='7806394673'
/>
 
// ads with custom format
<AdSense.Google
  client='ca-pub-7292810486004926'
  slot='7806394673'
  style={{ width: 500, height: 300, float: 'left' }}
  format=''
/>
 
// responsive and native ads
<AdSense.Google
  client='ca-pub-7292810486004926'
  slot='7806394673'
  style={{ display: 'block' }}
  layout='in-article'
  format='fluid'
/>
 
// auto full width responsive ads
<AdSense.Google
  client='ca-pub-7292810486004926'
  slot='7806394673'
  style={{ display: 'block' }}
  format='auto'
  responsive='true'
  layoutKey='-gw-1+2a-9x+5c'
/>
</>
)}
}
export default GAds;