import React from "react";
import {Button, Text, TouchableOpacity, View} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import {styles} from "./origin";

export const DestinationPresenter = ({navigation, destination,destinationResults, setDestination,
                                         setDestinationResults, filterDestination }) => {
    return (
        <View style={{ width: 400,height: 900,
            paddingTop: 10,
            backgroundColor: '#F5FCFF',
            paddingLeft: 20, flex: 1 }}>
            <View style={{ width:300, marginBottom: 10}}>
                <Button disabled={destination === {} || !destination.geometry}
                        title={"Next"} onPress={() => navigation.navigate('Map')}/>
            </View>
            <Autocomplete
                data={destinationResults}
                defaultValue={destination.formatted}
                onChangeText={text => filterDestination(text)}
                placeholder={"Enter Destination"}
                containerStyle={styles.autoCompleteContainer}
                renderItem={({ item, i }) => (
                    <TouchableOpacity  if={i} style={styles.itemText} onPress={() => {
                        setDestination(item);
                        setDestinationResults([])
                    }}>
                        <Text id={i}>{item.formatted}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );

};
