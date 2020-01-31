import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import * as Permissions from 'expo-permissions';

import * as Location from 'expo-location';


export default function App() {
  const [location, setLocation] = useState({lat:37.78825, long: -122.4324})

  useEffect(async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.LOCATION);
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation({lat: loc.coords.latitude, long: loc.coords.longitude})
  },[location])

  return (
    <View style={styles.container}>
      <Text>Map</Text>
      <MapView 
        region={{
          latitude: location.lat,
          longitude: location.long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        style={styles.mapStyle}
        >
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.long
          }}
          pinColor="blue"
          />
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
