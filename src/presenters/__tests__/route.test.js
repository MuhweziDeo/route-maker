import React from "react";
import renderer from 'react-test-renderer'
import { RoutePresenter } from "../route";
import { locations } from "../../mocks";
import { Button, ActivityIndicator } from "react-native";

export const RouterComponentProps = {
    navigation: {
        navigate: jest.fn()
    },

    initialRegion: {
        longitude: 0.0003,
        latitude: 32.000
    },
    mode: "transit",
    destination: {
        geometry: {
            lng: 0.44,
            lat: 32.00
        }
    },
    origin: {
        geometry: {
            lng: 0.44,
            lat: 32.00
        }
    },
    coordinates: locations.map((loc) =>
        ({latitude: loc.geometry.lat, longitude:loc.geometry.lng})),
    loading: false,
    error: false,
    setMode: jest.fn()

};

jest.mock('react-native-maps', () => {
    const { View } = require('react-native');
    const MockMapView = (props) => {
        return <View>{props.children}</View>;
    };
    const MockMarker = (props) => {
        return <View>{props.children}</View>;
    };
    const MockPolyline = (props) => {
        return <View>{props.children}</View>;
    };
    return {
        __esModule: true,
        default: MockMapView,
        Marker: MockMarker,
        Polyline: MockPolyline
    };
});

let wrapper;
let instance;

describe('<OriginPresenter/>', () => {
    beforeEach(() => {
        wrapper = renderer.create(<RoutePresenter {...RouterComponentProps}/>);
        instance = wrapper.root;
    });
    it("should match snapshot", () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it("should disable all buttons if loading", () => {
        const props = {...RouterComponentProps, loading: true};
        const wrapperInstance = renderer.create(<RoutePresenter {...props}/>);
        const buttons = wrapperInstance.root.findAllByType(Button);
        for(let i = 0; i < buttons.length; i++) {
            expect(buttons[i].props.disabled).toBeTruthy();
        }
    });

    it("should show loading indicator if loading", () => {
        const props = {...RouterComponentProps, loading: true};
        const wrapperInstance = renderer.create(<RoutePresenter {...props}/>);
        const loader = wrapperInstance.root.findAllByType(ActivityIndicator);
        expect(loader.length).toEqual(1);
    });
});
