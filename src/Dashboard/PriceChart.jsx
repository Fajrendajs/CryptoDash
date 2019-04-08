import highchartsConfig from "./HighchartsConfig";
import React from "react";
import { AppContext } from "../App/AppProvider";
import { Tile } from "../Shared/Tile";
import ReactHighcharts from "react-highcharts";

export default function() {
  return (
    <AppContext.Consumer>
      {({ currentFavorite, coinList }) => (
        <Tile>
          <ReactHighcharts config={highchartsConfig()} />
        </Tile>
      )}
    </AppContext.Consumer>
  );
}
