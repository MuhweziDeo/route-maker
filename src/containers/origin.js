import React, { useState, useEffect, useContext} from "react";
import { OriginPresenter } from "../presenters";
import geo from "opencage-api-client";
import {openCageApiKey} from "../config";
import {AppContext} from "../../App";

export const OriginContainer = props => {
    const context = useContext(AppContext);
    const[origin, setOrigin] = useState(context.origin || {});
    const[originResults, setOriginResults] = useState([]);

    const filterOrigin = async (value) => {
      setOrigin(value);
      const {results} = await geo.geocode({q: value.toLowerCase(), key: openCageApiKey});
      setOriginResults(results);
    };

    useEffect(()=> {
        if(origin === {}) {
            setOriginResults([]);
        }
        context.origin = origin;
    }, [origin]);

    return (
        <OriginPresenter
            {...props}
            origin={origin}
            setOrigin={setOrigin}
            originResults={originResults}
            setOriginResults={setOriginResults}
            filterOrigin={filterOrigin}
        />
    )
};
