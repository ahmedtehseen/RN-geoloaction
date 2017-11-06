import React from 'react';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from '../modules';

const Navigation = StackNavigator({
	HomeScreen: { screen: HomeScreen },
}, {
	headerMode: 'screen',
	initialRouteName: 'HomeScreen',
});

export default Navigation;
