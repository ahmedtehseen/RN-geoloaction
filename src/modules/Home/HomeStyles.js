import {StyleSheet, Dimensions} from 'react-native';


export default StyleSheet.create({
	 iconBox: {
      alignItems: 'center',
      marginTop: 30,
      flexDirection: 'column',
      justifyContent: 'center'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    inputBox: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      padding: 25,
    },
     iconText1: {
      fontSize: 27,
      color: 'black',
      fontWeight: '500',
      textAlign: 'center'
    },
    iconText2: {
      fontSize: 33,
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    inputStyle: {
      borderWidth: 1,
      height:50,
      borderColor: '#D3D3D3',
      borderRadius: 30,
      marginTop: 12,
      padding:10
    },
    loginButton: {
      marginTop: 23,
      borderRadius: 30,
      backgroundColor: 'orange',
      padding: 12,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%'
    },
    loginButtonTextLoading: {
      width: '30%',
      textAlign: 'right',
      fontSize: 18,
      color: 'white'
    },
    loginButtonText: {
      width: '100%',
      textAlign: 'center',
      fontSize: 18,
      color: 'white'
    },
    error: {
      textAlign: 'center',
      color: 'red',
      paddingTop: 10
    }
})