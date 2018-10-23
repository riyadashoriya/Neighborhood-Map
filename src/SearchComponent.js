import React, { Component } from 'react';

import { slide as Menu } from 'react-burger-menu'
import PropTypes from 'prop-types';

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '20px',
    top: '10px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    position: 'relative'
  },
  bmMenuWrap: {
  	top: `50px`
  }
}

class SearchComponent extends Component {
  showSettings (event) {
    event.preventDefault();
  }

  static propTypes = {
		queriedPlaces: PropTypes.array.isRequired,
		updateSearch: PropTypes.func.isRequired,
	}

  render () {
  	let {updateSearch, queriedPlaces, liPlaceClick} = this.props;
    return (
      <Menu styles = {styles}>
       <input type="text" placeholder="type a salon name" onChange = {(event) => updateSearch(event.target.value)}/>
       <ul id="places-list">
          {
            this.props.queriedPlaces.map(function(place){
              return (
                <li className="transition" title={ place.name } key={ place.id } onClick={() => { liPlaceClick(place) }}>
                  <h4><strong>{ place.name }</strong></h4>
                  <p>
                    { place.location.address }<br/>
                    { place.location.crossStreet && place.location.crossStreet }<br/>
                    { place.location.city }, { place.location.state } { place.location.postalCode && place.location.postalCode }<br/>
                    { place.location.country }<br/>
                  </p>
                </li>
              )
            })
          }
        </ul>
      </Menu>
    );
  }
}

export default SearchComponent