import 'react-native';
import React from "react";
import geo from "opencage-api-client";
import renderer, {act} from 'react-test-renderer';
import {DestinationContainer} from "../destination";
import {locations} from "../../mocks";
import {DestinationPresenter} from "../../presenters";

const props = {
    navigation: {
        navigate: jest.fn()
    }
};

let wrapper;
let instance;

describe("<DestinationContainer/>", () => {
    beforeAll(() => {
        wrapper = renderer.create(<DestinationContainer {...props} />);
        instance = wrapper.root;
    });

    it("should call geocode api on input origin", () => {
        jest.spyOn(geo, "geocode").mockResolvedValue(locations);

        const presenter = instance.findByType(DestinationPresenter);

        act(() => {
            presenter.props.filterDestination("value");
        });

        expect(geo.geocode).toHaveBeenCalled();
    });
});
