import React, { useRef, useEffect, useState } from "react";
// import Bookmarks from '@arcgis/core/widgets/Bookmarks';
// import Expand from '@arcgis/core/widgets/Expand';
// import WebScene from "@arcgis/core/WebScene";
// import SceneView from "@arcgis/core/views/SceneView";
// import SceneLayer from "@arcgis/core/layers/SceneLayer";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
// import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
// import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer";
// import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer";
// import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
// import BaseElevationLayer from "@arcgis/core/layers/BaseElevationLayer";
// import ElevationLayer from "@arcgis/core/layers/ElevationLayer";
import "./App.css";
import SceneMap from "./components/SceneMap";
import ArcgisFeatureLayer from "./components/ArcgisFeatureLayer";

function App() {

    const [basemap, setBasemap] = useState('satellite');

        // <div className="mapDiv" ref={mapDiv}></div>;
  return (
      <>
        <SceneMap id={'c68534e0ea18485698a9fcaa3c89b832'} basemap = {basemap}/>
        
      </>  
  );

}

export default App;


