import React from "react";
import renderer from 'react-test-renderer'
import { OriginPresenter } from "../origin";
import {Button, TouchableOpacity} from "react-native";;
import {locations} from "../../mocks";
import Autocomplete from "react-native-autocomplete-input";

export const OriginComponentProps = {
    navigation: {
        navigate: jest.fn()
    },
    origin: {...locations[0]},
    originResults: [...locations],
    setOrigin: jest.fn(),
    setOriginResults: jest.fn(),
    filterOrigin: jest.fn()
};

let wrapper;
let instance;

describe('<OriginPresenter/>', () => {
    beforeEach(() => {
        wrapper = renderer.create(<OriginPresenter {...OriginComponentProps}/>);
        instance = wrapper.root;
    });
    it("should match snapshot", () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it("should disable button if origin is not provided", () => {

        const button = instance.findByType(Button);
        expect(button.props.disabled).toBeFalsy()
    });

    it("should navigate on click next", () => {

        const button = instance.findByType(Button);
        button.props.onPress();
        expect(OriginComponentProps.navigation.navigate).toHaveBeenCalled();
    });

    it("set origin on click item", () => {
        let TouchableOpacityElement = instance.findAllByType(TouchableOpacity);
        TouchableOpacityElement[1].props.onPress();
        expect(OriginComponentProps.setOrigin).toHaveBeenCalled();
        expect(OriginComponentProps.setOriginResults).toHaveBeenCalled();
    });

    it("should filter origin on AutoComplete change", () => {
        let AutoCompleteElement = instance.findByType(Autocomplete);
        AutoCompleteElement.props.onChangeText("kampala");
        expect(OriginComponentProps.filterOrigin).toHaveBeenCalled();
    });
});
