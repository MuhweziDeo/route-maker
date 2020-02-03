import 'react-native';
import React from "react";
import geo from "opencage-api-client";
import renderer, { act } from 'react-test-renderer';
import {OriginContainer} from "../origin";

import { locations } from "../../mocks";
import { OriginPresenter } from "../../presenters";

const props = {
    navigation: {
        navigate: jest.fn()
    }
};

let wrapper;
let instance;

describe("<OriginContainer/>", () => {
    beforeAll(() => {
        wrapper = renderer.create(<OriginContainer {...props} />);
        instance = wrapper.root;
    });

   it("should call geocode api on input origin", () => {
    jest.spyOn(geo, "geocode").mockResolvedValue(locations);

    const presenter = instance.findByType(OriginPresenter);

    act(() => {
        presenter.props.filterOrigin("value");
    });
    expect(geo.geocode).toHaveBeenCalled();
   });

});
