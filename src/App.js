import React, { Component } from 'react';
import './App.css';
import MapComponent from './MapComponent';
import SearchComponent from './SearchComponent';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

class App extends Component {
  state = {
    isMarkerVisible: false,
    places: null, //List of all the places returned by foursquare api
    markers: null, //List of all the markers. Each record contains id, lat and lng of the location
    queriedPlaces: [], //List of all the places, which matches search field
    center: { //Default center of the map
      lat: 40.760981254004264,
      lng: -111.89117340652818
    },
    selectedPlace: null, //Location selected using marker or the list
    modalIsOpen: false // Modal window to show when there is problem loading the data.
  }

  // Called when component is mounted. Fetch the list of places and set up markers in the map.
  componentDidMount() {
    let self = this;

    // Get the list of places
    self.loadPlaces()
    .then(function(data){

      let markers = {};
      for (let venue of data.response.venues) {
        markers[venue.id] = {"id": venue.id, "lat": parseFloat(venue.location.lat), "lng": parseFloat(venue.location.lng)};
      }

      self.setState({ places: data.response.venues, markers: markers, queriedPlaces: data.response.venues, isMarkerVisible: true });
    }).catch(() => {
      self.setState({modalIsOpen: true});
    })
  }

  // Called initially to fetch all the `salon` in `salt lake city`. Uses foursquare api
  loadPlaces() {
    let city = 'Salt lake city';
    let query = 'salon';
    var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=L5OSMSDBGVZJOVZV2B4WBCYTKRGTMJNIC1YWWO2COACAHMOM' +
    '&client_secret=LKGLW5WQEMB1Y40QBYKGL1CYMA0DI1XMUZLRQ1ESOOVH44ER&v=20130815%20&limit=20&near=' + city + '&query=' + query + '';

    return fetch(apiURL)
    .then(function(response){ 
      return response.json() 
    })
    .then(function(json){
      return Promise.resolve(json);
    });
  }

  //Filter the list of places based on the input in search bar.
  updateSearch(query) {
    query = query.trim();
    this.state.queriedPlaces = this.state.places;

    //Search only if the input has a character.
    if (query) {
      let queriedPlaces= this.state.queriedPlaces.filter(qp => qp.name.toUpperCase().startsWith(query.toUpperCase()));
      this.setState({queriedPlaces});
    } else {
      //If the input is blank spaces or empty, show all the places
      this.setState({queriedPlaces: this.state.places});
    }
  }

  // Called when a marker is clicked or a location is clicked from the list
  handleMarkerClick = (id) => {
    var selectedPlace = this.state.places.filter(place => place.id === id);
    this.setState({selectedPlace: selectedPlace, center: {"lat": selectedPlace[0].location.lat, "lng": selectedPlace[0].location.lng}});
  }

  // When there is an error fetching the data, a modal pops up, asking to refresh. This is called to close the modal and refresh the page. 
  closeModal() {
    this.setState({modalIsOpen: false});
    window.location.reload();
  }

  render() {
    return (
      <div className="main">
  
        { /* Top bar Navigation & Sidebar for navigation to search the place. */ }
        <div className="header">
          <span className="title">Neighborhood Map</span>
          <SearchComponent
            placeClick = {this.handleMarkerClick} 
            updateSearch = {(query) => this.updateSearch(query)}
            queriedPlaces = {this.state.queriedPlaces} />
        </div>
  
        { /* Google Map component */}
        <MapComponent 
          markers = {this.state.markers}
          center = {this.state.center}
          isMarkerVisible = {this.state.isMarkerVisible}
          onMarkerClick = {this.handleMarkerClick}
          selectedPlace = {this.state.selectedPlace} />
    
        { /* Modal window when there is an error loading data. Uses `react-modal` */}
        <Modal isOpen={this.state.modalIsOpen} ariaHideApp={false}>
          <div>Looks like there is some problem with loading the data. Please refresh the page.</div>
          <button onClick={() => this.closeModal()}>Click here to refresh</button>
        </Modal>
      </div>
    );
  }
}

export default App;
