import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapComponent from './MapComponent';

class App extends Component {
state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }
  
  render() {
    return (
      <div className="App">
        <MapComponent 
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick} />
      </div>
    );
  }
}

export default App;
