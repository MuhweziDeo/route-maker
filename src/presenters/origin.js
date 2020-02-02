import React from "react";
import {Button, Text, View, TouchableOpacity, StyleSheet} from "react-native";
import Autocomplete from "react-native-autocomplete-input";


//TODO enable user select current location as origin

export const OriginPresenter = ({navigation, origin,originResults, setOrigin,
                                    setOriginResults, filterOrigin }) => {
    return (
        <View style={{ width: 400,height: 900,
            paddingTop: 10,
            backgroundColor: '#F5FCFF',
            paddingLeft: 20, flex: 1 }}>
            <View style={{ width:300, marginBottom: 10}}>
                <Button disabled={origin === {} || !origin.geometry} title={"Next"}
                        onPress={() => navigation.navigate('Destination')}/>
            </View>
            <Autocomplete
                data={originResults}
                defaultValue={origin.formatted}
                onChangeText={text => filterOrigin(text)}
                placeholder={"Enter Origin"}
                containerStyle={styles.autoCompleteContainer}
                renderItem={({ item, i }) => (
                    <TouchableOpacity key={i} style={styles.itemText} onPress={() => {
                     setOrigin(item);
                     setOriginResults([])
                    }}>
                        <Text>{item.formatted}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );

};


export const styles = StyleSheet.create({
    itemText: {
        fontSize: 15,
        margin: 2,
        padding: 5,
        backgroundColor: "#F5FCFF",
        color: "white"
    },
    autoCompleteContainer: {
        width: 320
    }
});
