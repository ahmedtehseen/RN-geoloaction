import React, { Component } from 'react';
import * as firebase from 'firebase';
import { View } from 'react-native';
import Navigation from './config/AppNavigation';

console.ignoredYellowBox = [ 'Setting a timer' ];

class App extends Component {
	componentWillMount() {
		const config = {
	    apiKey: "AIzaSyBON2JO-O0BvKrQ5JGOi2FN3o4eIjAzqcE",
	    authDomain: "friendlychat-b0cbe.firebaseapp.com",
	    databaseURL: "https://friendlychat-b0cbe.firebaseio.com",
	    projectId: "friendlychat-b0cbe",
	    storageBucket: "friendlychat-b0cbe.appspot.com",
	    messagingSenderId: "588731493437"
	  };
	  firebase.initializeApp(config);
	}
	render() {
		return (
			<Navigation/>
		);
	};
};

export default App;