import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlaceCard extends Component {

  static propTypes = {
		place: PropTypes.object.isRequired,
	}

  render () {
  	let {place} = this.props;
    return (
      <div>
        <h4>{ place.name }</h4>
        <p>
          { place.location.address }<br/>
          { place.location.city }, { place.location.state } - { place.location.postalCode }<br/>
          { place.location.country }<br/>
        </p>
      </div>
    );
  }
}

export default PlaceCard;