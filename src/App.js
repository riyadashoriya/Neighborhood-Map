import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapComponent from './MapComponent';
import SearchComponent from './SearchComponent';

class App extends Component {
state = {
    isMarkerShown: false,

      places: null,
      markers: null,
      lastClickedPlace: null,
      lastClickedMarker: null,
      queriedPlaces: [],
      lat:40.760981254004264,
      lan: -111.89117340652818,
      selectedPlace: null
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 500)
  }

  handleMarkerClick = (key) => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
    var x = this.state.places.filter(m => m.id == key);
    this.setState({selectedPlace: x});
  }
constructor() {
    super();
    this.loadPlaces = this.loadPlaces.bind(this);
    this.liPlaceClick = this.liPlaceClick.bind(this);
  }

  loadPlaces() {
    let city = 'Salt lake city';
    let query = 'salon';
    var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=L5OSMSDBGVZJOVZV2B4WBCYTKRGTMJNIC1YWWO2COACAHMOM' +
    '&client_secret=LKGLW5WQEMB1Y40QBYKGL1CYMA0DI1XMUZLRQ1ESOOVH44ER&v=20130815%20&limit=33&near=' + city + '&query=' + query + '';

    return fetch(apiURL)
    .then(function(resp){ return resp.json() })
    .then(function(json){ return Promise.resolve(json); })
  }

  componentDidMount() {
    this.delayedShowMarker()
    let self = this;
    self.loadPlaces()
    .then(function(data){
      let places = [];
      let markers = {};
      let x = Object.values(data.response.venues);
    
      for(let venue of data.response.venues) {
        markers[venue.id] = {"id": venue.id, "lat": parseFloat(venue.location.lat), "lng": parseFloat(venue.location.lng)};
      }

      self.setState({ places: data.response.venues, markers: markers, queriedPlaces: data.response.venues });
    })
  }
 //Fetch the list of books from server based on the input in search bar.
  updateSearch(query) {
    query = query.trim();
    //Search only if the input has a character.
    this.state.queriedPlaces = this.state.places;
    if (query) {
      var queriedPlaces= this.state.queriedPlaces.filter(a => a.name.toUpperCase().startsWith(query.toUpperCase()));
      this.setState({queriedPlaces});
    } else {
      //If the input is blank spaces or empty
      this.setState({queriedPlaces: this.state.places});
    }
  };

  liPlaceClick(place) {
    console.log(place);
    this.setState({ lastClickedPlace: place, lat: place.location.lat, lan: place.location.lng });
    this.handleMarkerClick(place.id);
  }
  render() {
    return (
      <div className="App">
        <div style = {{ height: '50px', background: 'gray'}}><span style = {{fontSize:'xx-large'}}>Neighborhood Map</span>
        <SearchComponent 
          liPlaceClick={this.liPlaceClick} 
          updateSearch = {(query) => this.updateSearch(query)}
          queriedPlaces={this.state.queriedPlaces} /></div>
        <MapComponent 
          markers = {this.state.markers}
          lat = {this.state.lat}
          lan = {this.state.lan}
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          selectedPlace = {this.state.selectedPlace} />
      </div>
    );
  }
}

export default App;
