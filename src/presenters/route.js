import React, { useRef, useEffect } from "react";
import {View, Text, StyleSheet, Dimensions, Button, ActivityIndicator} from "react-native";
import { styles as custom } from "./origin";
import MapView, { Marker, Polyline } from "react-native-maps";


export const RoutePresenter = ({ mode, setMode, destination, origin, coordinates, loading, error}) => {
    const ref = useRef(null);

    useEffect(() => {
        if(ref && ref.current) {
            setTimeout(() => {
                ref.current.fitToCoordinates([
                    { latitude: destination.geometry.lat, longitude: destination.geometry.lng },
                    { latitude: origin.geometry.lat, longitude: origin.geometry.lng }
                ], {edgePadding: { top: 70, right: 70, bottom: 70, left: 70}});
            },400)

        }
    }, [ref]);

    return (
        <View styles={custom.container}>
            <MapView
                ref={ref}
                style={styles.mapStyle}
                showsUserLocation={true}
             >
                <Marker
                    coordinate={{
                        latitude: destination.geometry.lat,
                        longitude: destination.geometry.lng
                    }}
                    pinColor="red"
                />

                { coordinates.length > 0 &&
                <Polyline
                    coordinates={[...coordinates]}
                    strokeColor="blue"
                    strokeWidth={3}
                />
                }
                <Marker
                    coordinate={{
                        latitude: origin.geometry.lat,
                        longitude: origin.geometry.lng
                    }}
                    pinColor="red"
                />
            </MapView>
          <View style={{padding:20, flexDirection: "row", justifyContent: "center"}}>
              <View style={[styles.margin]}>
                  <Button
                      disabled={loading}
                      onPress={() => setMode("car")}
                      color={mode === "car" ? "green": ""} title={"Driving"}/></View>
              <View style={[styles.margin]}>
                  <Button
                      disabled={loading}
                      color={mode === "bike" ? "green": ""}
                      onPress={() => setMode("bike")} title={"Bicycling"}/></View>
              <View style={[styles.margin]}>
                  <Button
                      disabled={loading}
                      color={mode === "truck" ? "green": ""}
                      onPress={() => setMode("truck")} title={"Transit"}/></View>
              <View style={[styles.margin]}>
                  <Button
                      disabled={loading}
                      color={mode === "foot" ? "green": ""}
                      onPress={() => setMode("foot")} title={"Walking"}/></View>
          </View>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            { error &&
                <View style={{justifyContent: "space-around", alignItems: "center", marginBottom: 8}}>
                    <Text id={"error-message"} style={{fontWeight: "bold", color: 'red'}}>
                        Something Went wrong Please Try again Later
                    </Text>
                </View>
            }
            <View style={{justifyContent: "space-around", alignItems: "center", marginBottom: 8}}>
                <Text style={{fontWeight: "bold"}}>DESTINATION</Text>
                <Text>{destination.formatted}</Text>
            </View>

            <View style={{justifyContent: "space-around",alignItems: "center",marginBottom: 8 }}>
                <Text style={{fontWeight: "bold"}}>ORIGIN</Text>
                <Text>{origin.formatted}</Text>
            </View>

            <View style={{justifyContent: "space-around", alignItems: "center", marginBottom: 8 }}>
                <Text style={{fontWeight: "bold"}}>MODE</Text>
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
