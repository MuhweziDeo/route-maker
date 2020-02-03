import React, { useState, useEffect, useContext } from "react";
import { RoutePresenter } from "../presenters";
import * as Location from "expo-location";
import { AppContext } from "../../App";
import { graphHopperApiKey, graphHopperUrl } from "../config";

export const RouteContainer = props => {
    const[location, setLocation] = useState({latitude: 0.3974545, longitude: 32.625096});
    const[coordinates, setCoordinates] = useState([]);
    const[mode, setMode] = useState("");
    const[loading, setLoading] = useState(false);
    const context = useContext(AppContext);
    const[error, setError] =useState(false);
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
        setLoading(true);
        fetch(`${graphHopperUrl}?point=${Number(context.destination.geometry.lat)},${Number(context.destination.geometry.lng)}&point=${context.origin.geometry.lat},${context.origin.geometry.lng}&vehicle=${mode}&key=${graphHopperApiKey}&type=json&points_encoded=false&elevation=true&turn_cost=false&weighting=fastest&locale=en-GB
        `).then((res) => res.json())
            .then(data => {
                const{paths} = data;
                const[{points: {coordinates}},] = paths;
                let points = coordinates.map(([longitude, latitude]) => {
                    return {
                        longitude,
                        latitude
                    }
                });
                setLoading(false);
                setCoordinates(points);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
                setTimeout(() => {
                    setError(false)
                }, 5000)
            });
    }, [mode]);

    return (
        <RoutePresenter
            {...props}
            initialRegion={location}
            mode={mode}
            setMode={setMode}
            origin={context.origin}
            destination={context.destination}
            coordinates={coordinates}
            loading={loading}
            error={error}
        />
    )
};
