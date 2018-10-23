import React, { Component } from 'react';
import './App.css';
import MapComponent from './MapComponent';
import SearchComponent from './SearchComponent';

class App extends Component {
  state = {
    isMarkerShown: false,
    places: null,
    markers: null,
    queriedPlaces: [],
    center: {
      lat: 40.760981254004264,
      lng: -111.89117340652818
    },
    selectedPlace: null
  }

  handleMarkerClick = (id) => {
    var selectedPlace = this.state.places.filter(place => place.id === id);
    this.setState({selectedPlace: selectedPlace, center: {"lat": selectedPlace[0].location.lat, "lng": selectedPlace[0].location.lng}});
  }

  loadPlaces() {
    let city = 'Salt lake city';
    let query = 'salon';
    var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=L5OSMSDBGVZJOVZV2B4WBCYTKRGTMJNIC1YWWO2COACAHMOM' +
    '&client_secret=LKGLW5WQEMB1Y40QBYKGL1CYMA0DI1XMUZLRQ1ESOOVH44ER&v=20130815%20&limit=33&near=' + city + '&query=' + query + '';

    return fetch(apiURL)
    .then(function(response){ return response.json() })
    .then(function(json){ return Promise.resolve(json); })
  }

  componentDidMount() {
    let self = this;
    self.loadPlaces()
    .then(function(data){
      let markers = {};
      for(let venue of data.response.venues) {
        markers[venue.id] = {"id": venue.id, "lat": parseFloat(venue.location.lat), "lng": parseFloat(venue.location.lng)};
      }

      self.setState({ places: data.response.venues, markers: markers, queriedPlaces: data.response.venues, isMarkerShown: true });
    })
  }

  //Fetch the list of books from server based on the input in search bar.
  updateSearch(query) {
    query = query.trim();
    //Search only if the input has a character.
    this.state.queriedPlaces = this.state.places;
    if (query) {
      let queriedPlaces= this.state.queriedPlaces.filter(a => a.name.toUpperCase().startsWith(query.toUpperCase()));
      this.setState({queriedPlaces});
    } else {
      //If the input is blank spaces or empty
      this.setState({queriedPlaces: this.state.places});
    }
  };

  render() {
    return (
      <div className="App">
        <div className="header"><span className="title">Neighborhood Map</span>
        <SearchComponent 
          placeClick = {this.handleMarkerClick} 
          updateSearch = {(query) => this.updateSearch(query)}
          queriedPlaces = {this.state.queriedPlaces} /></div>
        <MapComponent 
          markers = {this.state.markers}
          center = {this.state.center}
          isMarkerShown = {this.state.isMarkerShown}
          onMarkerClick = {this.handleMarkerClick}
          selectedPlace = {this.state.selectedPlace} />
      </div>
    );
  }
}

export default App;
