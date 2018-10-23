import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import PropTypes from 'prop-types';
import PlaceCard from './PlaceCard';

class SearchComponent extends Component {

  static propTypes = {
		queriedPlaces: PropTypes.array.isRequired,
		updateSearch: PropTypes.func.isRequired,
	}

  render () {
  	let {updateSearch, queriedPlaces, placeClick} = this.props;
    return (
      <Menu>
       <input type="text" id="search-input" placeholder="type a salon name" onChange = {(event) => updateSearch(event.target.value)}/>
       <ul id="places-list">
          {
            queriedPlaces.map(function(place){
              return (
                <li className="transition" title={ place.name } key={ place.id } onClick={ placeClick.bind(this, place.id) }>
                  <PlaceCard place = {place} />
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