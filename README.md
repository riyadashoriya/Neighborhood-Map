# Neighborhood-Map
A Neighborhood Map App

This is a Neighborhood Map App using React for Udacity's Front End Nanodegree course. The app shows a list of salons in salt lake city, and marks on the map. The user can search for a specific salon. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


![alt text](https://github.com/riyadashoriya/Neighborhood-Map/blob/master/view.png "Neighborhood App Preview")

## Working

To use the app right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Content
```bash
├── README.md - This file.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon
│   └── index.html
└── src
    ├── App.css # Styles for the app.
    ├── App.js # This is the root of the app.
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── components
    │   ├── PlaceCard.js # Represents a place name, and address.
    │   ├── SearchComponent.js # Represents the sidebar which lists all the locations and allows user to search for a place.
    │   └── MapComponent.js # Represents the Google Map and its markers.
    ├── index.css # Global styles.
    └── index.js # It is used for DOM rendering.
    └── serviceWorker.js # React-provided service worker.

```


### Note: Used the following commands (for future reference)..
* `npm install react-burger-menu --save`
* `npm i recompose`
* `npm install --save react-google-maps`
* `npm install react-modal`


### References:
https://github.com/yousefahmed171/react-neighborhood-map
https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
https://stackoverflow.com/questions/47378069/react-google-maps-marker-click-event
https://github.com/tomchentw/react-google-maps/issues/753
https://developer.foursquare.com/places-api
https://stackoverflow.com/questions/44552917/how-to-add-markers-in-react-google-maps
https://www.diigo.com/outliner/fkkuvb/Udacity-Neighborhood-Map-Project-(project-%237)?key=25wgqnwals
https://tomchentw.github.io/react-google-maps/
https://github.com/reactjs/react-modal#examples
