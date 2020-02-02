import 'react-native';
import React from "react";
import renderer from 'react-test-renderer'
import { DestinationPresenter } from "../destination";
import {Button, TouchableOpacity} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import {locations} from "../../mocks";

export const DestinationComponentProps = {
    navigation: {
        navigate: jest.fn()
    },
    destination: {
        ...locations[0]
    },
    destinationResults: [...locations],
    setDestination: jest.fn(),
    setDestinationResults: jest.fn(),
    filterDestination: jest.fn()

};

let wrapper;
let instance;

describe('<DestinationPresenter/>', () => {

    beforeEach(() => {
        wrapper = renderer.create(<DestinationPresenter {...DestinationComponentProps}/>);
        instance = wrapper.root;
    });

   it("should match snapshot", () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
   });

    it("should disable button if destination is not provided", () => {
        const button = instance.findByType(Button);
        expect(button.props.disabled).toBeFalsy()
    });

    it("should navigate to Map on click next", () => {
        const button = instance.findByType(Button);
        button.props.onPress();
        expect(DestinationComponentProps.navigation.navigate).toHaveBeenCalled();
    });

    it("set destination on click item and reset destinationResults", () => {
        let TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
        TouchableOpacityElement[1].props.onPress();
        expect(DestinationComponentProps.setDestination).toHaveBeenCalled();
        expect(DestinationComponentProps.setDestinationResults).toHaveBeenCalled();
    });

    it("should filter destination on AutoComplete change", () => {
        let AutoCompleteElement = instance.findByType(Autocomplete);
        AutoCompleteElement.props.onChangeText("kampala");
        expect(DestinationComponentProps.filterDestination).toHaveBeenCalled();
    });

});
