import React from "react";
import {View, Text, StyleSheet, Dimensions, Button} from "react-native";
import {styles as custom} from "./origin";
import MapView, {Marker} from "react-native-maps";


export const RoutePresenter = ({navigation, initialRegion, mode, setMode, destination, origin}) => {
    return (
        <View styles={custom.container}>
            <Button color="red" onPress={() => navigation.navigate("Destination")} title={"< Destination"}/>
            <MapView
                style={styles.mapStyle}
                initialRegion={{
                    ...initialRegion,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                showsUserLocation={true}
                >
                <Marker
                    coordinate={{
                        latitude: destination.geometry.lat,
                        longitude: destination.geometry.lng

                    }}
                    pinColor="red"
                />
                <Marker
                    coordinate={{
                        latitude: origin.geometry.lat,
                        longitude: origin.geometry.lng
                    }}
                    pinColor="red"
                />
            </MapView>
          <View style={{padding:20, flexDirection: "row", justifyContent: "center"}}>
              <View style={[styles.margin]}><Button onPress={() => setMode("driving")}
                                                    color={mode === "driving" ? "green": ""} title={"Driving"}/></View>
              <View style={[styles.margin]}>
                  <Button
                      color={mode === "bicycling" ? "green": ""}
                      onPress={() => setMode("bicycling")} title={"Bicycling"}/></View>
              <View style={[styles.margin]}>
                  <Button
                      color={mode === "transit" ? "green": ""}
                      onPress={() => setMode("transit")} title={"Transit"}/></View>
              <View style={[styles.margin]}>
                  <Button
                      color={mode === "walking" ? "green": ""}
                      onPress={() => setMode("walking")} title={"Walking"}/></View>
          </View>
            <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <Text>Destination</Text>
                {/*TODO format string incase its long*/}
                <Text>{destination.formatted}</Text>
            </View>

            <View style={{flexDirection: "row", justifyContent: "space-around",alignItems: "center" }}>
                <Text style={{fontWeight: "bold"}}>Origin</Text>
                {/*TODO format string incase its long*/}
                <Text>{origin.formatted}</Text>
            </View>

            <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                <Text style={{fontWeight: "bold"}}>Mode</Text>
                <Text>{mode}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/1.7,
    },
    margin: {
        marginRight: 10
    }
});
