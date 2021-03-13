// importing react component from react libary

import React from 'react';

// importing StyleSheet, Text, View, Animated from react native libary
import { StyleSheet, Text, View, Animated } from 'react-native';

// importing api key from utilies weather api
import { API_KEY } from './utils/WeatherAPIKey';

// importing weather component from weather libary
import Weather from './components/Weather';

// creating an component app extend from react component
export default class App extends React.Component {
  // defining the variable of the object the state of app componeent
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  // react component loaded succecfully
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    );
  }

  // fetching the lat & lon from the weather api
  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        });
      });
  }

  // loading the weather call from api
  render() {
    const { isLoading, weatherCondition, temperature } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
        ) : (
          <Weather weather={weatherCondition} temperature={temperature} />
        )}
      </View>
    );
  }
}

// stylesheet to display info
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});
