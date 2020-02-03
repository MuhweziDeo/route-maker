import React, {useContext, useState, useEffect} from "react";
import { DestinationPresenter } from "../presenters";
import { AppContext } from "../../App";
import geo from "opencage-api-client";
import { openCageApiKey } from "../config";

export const DestinationContainer = props => {
    const context = useContext(AppContext);
    const[destination, setDestination] = useState(context.destination || {});
    const[destinationResults, setDestinationResults] = useState([]);

    const filterDestination = async (value) => {
        setDestination(value);
        const {results} = await geo.geocode({q: value.toLowerCase(), key: openCageApiKey});
        setDestinationResults(results);
    };

    useEffect(()=> {
        if(destination === {}) {
            setDestinationResults([]);
        }
        context.destination = destination;
    }, [destination]);

    return (
        <DestinationPresenter
            {...props}
            destination={destination}
            setDestination={setDestination}
            destinationResults={destinationResults}
            setDestinationResults={setDestinationResults}
            filterDestination={filterDestination}
        />
    )
};
