import React, {useState, useEffect, useContext} from "react";
import {RoutePresenter} from "../presenters";
import * as Location from "expo-location";
import {AppContext} from "../../App";

export const RouteContainer = props => {
    const[location, setLocation] = useState({latitude: 0.3974545, longitude: 32.625096});
    const[mode, setMode] = useState("");
    const context = useContext(AppContext);

    const loadLocation = async() => {
      const location = await Location.getCurrentPositionAsync();
      setLocation({latitude: location.coords.latitude,
          longitude: location.coords.longitude})
    };

    useEffect(() => {
        const load = async() => {
            await loadLocation();
        };
      return () =>  load();
    }, [location]);

    useEffect(() => {
        context.mode = mode;
    }, [mode]);

    return (
        <RoutePresenter
            {...props}
            initialRegion={location}
            mode={mode}
            setMode={setMode}
            origin={context.origin}
            destination={context.destination}
        />
    )
};
