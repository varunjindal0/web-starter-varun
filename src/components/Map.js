import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
  render(){
  	
    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
        defaultCenter = { { lat: props.currLat ? props.currLat :41.881832, lng: props.currLng ? props.currLng : -87.623177 } }
        defaultZoom = { 15 }
      >
      <Marker  position = {{lat: props.currLat ? props.currLat :41.881832, lng: props.currLng ? props.currLng : -87.623177}} />
      	{

      		props.data.map(r=>{
      			return <Marker opacity = {0.5} position={{ lat: r.lat, lng: r.lon}}/>
      		})
      	}

      </GoogleMap>
   ));
   return(
      <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: `100vh`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
          data = {this.props.data}
          currLat = {this.props.currLat}
          currLng = {this.props.currLng}
        />
      </div>
   );
  }
};
export default Map;