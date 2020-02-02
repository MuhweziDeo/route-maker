import 'react-native';
import React from "react";
import renderer from 'react-test-renderer'
import { RoutePresenter } from "../route";

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
    }

};

jest.mock('react-native-maps', () => {
    const { View } = require('react-native');
    const MockMapView = (props) => {
        return <View>{props.children}</View>;
    };
    const MockMarker = (props) => {
        return <View>{props.children}</View>;
    };
    return {
        __esModule: true,
        default: MockMapView,
        Marker: MockMarker,
    };
});

describe('<OriginPresenter/>', () => {
    it("should match snapshot", () => {
        const wrapper = renderer.create(<RoutePresenter {...RouterComponentProps}/>);
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});
