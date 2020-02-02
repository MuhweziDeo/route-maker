import React, {useState, useEffect} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { DestinationContainer, OriginContainer, RouteContainer } from "./src/containers";


export const AppContext = React.createContext({
  origin: {},
  destination: {},
  mode: ""
});


const AppNavigator = createStackNavigator({
  Origin: {
    screen: () => <OriginContainer/>,
  },
  Destination: {
    screen: () => <DestinationContainer/>
  },
  Map: {
    screen: () => <RouteContainer/>
  }
}, {initialRouteName: "Origin"});

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  const loadLocationPermissions = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return Permissions.askAsync(Permissions.LOCATION);
    }
  };

  useEffect(() => {
    const checkLocationPermissions = async() => {
      await loadLocationPermissions();
    };
    return () => checkLocationPermissions();
  },[]);

  return (
      <AppContext.Provider value={{
        origin: {},
        destination: {},
        mode: ""
      }}>
        <AppContainer/>
      </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
