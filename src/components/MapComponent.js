import React from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import PlaceCard from './PlaceCard';

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCY7kS1SoHmWDew9tTrpuyj0s19fO2g4OY&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div id="containerElement" />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={15}
    center= { props.center } >

    {
    	/* Show all the markers on the map */
    	props.isMarkerVisible && 
    	Object.keys(props.markers).map(function(key, index) {
				return (
				<Marker key={key} position= {props.markers[key]} onClick={props.onMarkerClick.bind(this,key)}>

				{ /* Show info if the place is selected */
					props.selectedPlace && (props.selectedPlace[0].id === key) &&
				  <InfoWindow position={props.selectedPlace.location}>
				    <PlaceCard place = {props.selectedPlace[0]} />
				  </InfoWindow>
				}

				</Marker>	)
			})
		}

  </GoogleMap>
)

export default MapComponent;