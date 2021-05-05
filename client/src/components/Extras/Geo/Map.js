import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class Map extends Component {
  static defaultProps = {
    center: {
      lat: 36.9061097,
      lng: 10.191628099999999
    },
    zoom: 4
  };
 
  render() {
    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
      };
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAoBo_25Tn_s8Gca2YfZWvGoKSfItG1SIE' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
        <AnyReactComponent
        lat={36.9061097}
        lng={10.191628099999999}
        text="Position"
        />
        </GoogleMapReact>
      </div>
    );
  }
}
export default Map;
