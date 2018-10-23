import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDhurMXRNeJHZNHxJKoix8zuqnFekEHhCo&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ top:'50px', bottom:'0', left:'0', right:'0', position: 'absolute' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={15}
    center= {{ lat: props.lat, lng: props.lan }} >
    {
    	props.isMarkerShown && 
    	Object.keys(props.markers).map(function(key, index) {
				return (	<Marker key={key} position= {props.markers[key]} onClick={props.onMarkerClick.bind(this,key)}>
					
				{props.selectedPlace && (props.selectedPlace[0].id === key) &&
					 <InfoWindow position={props.selectedPlace.location}>
					    <div>
					     	<h4><strong>{ props.selectedPlace[0].name }</strong></h4>
                <p>
                  { props.selectedPlace[0].location.address }<br/>
                  { props.selectedPlace[0].location.crossStreet && props.selectedPlace[0].location.crossStreet }<br/>
                  { props.selectedPlace[0].location.city }, { props.selectedPlace[0].location.state } { props.selectedPlace[0].location.postalCode && props.selectedPlace[0].location.postalCode }<br/>
                  { props.selectedPlace[0].location.country }<br/>
                </p>
				     	</div>
					 </InfoWindow>
				 }
				</Marker>	)
			})
		}

  </GoogleMap>
)

export default MapComponent;