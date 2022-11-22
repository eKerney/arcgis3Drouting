import React, { useRef, useEffect } from "react";
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ObjectSymbol3DLayer from "@arcgis/core/symbols/ObjectSymbol3DLayer";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer";
import LineSymbol3DLayer from "@arcgis/core/symbols/LineSymbol3DLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import "./App.css";


function App() {

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
        const scene = new WebScene({
          portalItem: {
            id: '7b08389497c942258772d6d2d9122385',
            layers: []
          }
        });
        const view = new SceneView({
          map: scene,
          container: mapDiv.current,
          padding: {
            top: 40
          },
        });
        const renderer = {
          type: "simple", 
            symbol: {
            type: "point-3d", 
            symbolLayers: [{ type: "object", width: 5, height: 200, depth: 15, 
                             resource: { primitive: "cube" }, material: { color: "purple" } }] 
          }
        };
        
        const threeDpointRender = {
            type: "simple", 
            symbol: {
                type: "point-3d", 
                symbolLayers: [{ type: "object", resource: { primitive: "cube" }, 
                    width: 10, height: 100, depth: 10}
                ]
            },
            visualVariables: [
                {
                    type: "color",
                    field: "altitude", // field containing data for atmospheric pressure
                    stops: [{ value: 635, color: "red" }, { value: 710, color: "blue" }]
                },
                {
                    type: "size",
                    axis: "height",
                    field: "altitude", // field containing data for wind speed
                    valueUnit: "feet" 
                    // stops: [{ value: 635, size: 635 }, { value: 710, size: 5000 }],
                },
                {
                    type: "size",
                    axis: "width-and-depth",
                    useSymbolValue: true // uses the width value defined in the symbol layer (50,000)
                }
            ]
        };
        const symbol1 = {
            type: "simple",  // autocasts as new SimpleLineSymbol()
            symbol: {
                color: "blue",
                type: "simple-line",
                style: "solid",
                width: "10px",
            }
        // visualVariables: [
        //     {
        //         type: "color",
        //         field: "lineID", // field containing data for atmospheric pressure
        //     },
        //     ]
        };

        const line3DsymbolRenderer = new UniqueValueRenderer({
            field: "lineID",
        });

        line3DsymbolRenderer.addUniqueValueInfo({
            type: "line-3d",  // autocasts as new LineSymbol3D()
            symbolLayers: [{
                type: "path",  // autocasts as new PathSymbol3DLayer()
                profile: "quad",  // creates a rectangular shape
                width: 20,  // path width in meters
                height: 5,  // path height in meters
                material: { color: "#ff7380" },
                cap: "square",
                profileRotation: "heading"
            }]
        });


        const featureLayer = new FeatureLayer({
          url: "https://utility.arcgis.com/usrsvcs/servers/92c6f53aec8b4db19654b313fd70b542/rest/services/Hosted/walmart100/FeatureServer/2",
          renderer: threeDpointRender
        });
        const featureLayer2 = new FeatureLayer({
          url: "https://utility.arcgis.com/usrsvcs/servers/92c6f53aec8b4db19654b313fd70b542/rest/services/Hosted/walmart100/FeatureServer/1",
          // renderer: symbolLine
        });
        

        const relativeElevation = {
          mode: "relative-to-ground",
        };
        const onGroundElevation = {
          mode: "on-the-ground",
        };
            
          // }
        // transitLayer.renderer = renderer;
        // }
        // renderTransitLayer();

        // scene.add(transitLayer);
              
        featureLayer2.renderer = symbol1;
        featureLayer.elevationInfo = relativeElevation;
        featureLayer2.elevationInfo = onGroundElevation;
        scene.add(featureLayer);
        scene.add(featureLayer2);

    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}
export default App;


