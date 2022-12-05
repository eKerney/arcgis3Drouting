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
import BaseElevationLayer from "@arcgis/core/layers/BaseElevationLayer";
import ElevationLayer from "@arcgis/core/layers/ElevationLayer";
import "./App.css";

function App() {

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
        
        const ExaggeratedElevationLayer = BaseElevationLayer.createSubclass({
  properties: {
    // exaggerates the actual elevations by 70x
    exaggeration: 3 
  },

  load: function() {
    this._elevation = new ElevationLayer({
      url: "//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/TopoBathy3D/ImageServer"
    });

    // wait for the elevation layer to load before resolving load()
    this.addResolvingPromise(
      this._elevation.load().then(() => {
        // get tileInfo, spatialReference and fullExtent from the elevation service
        // this is required for elevation services with a custom spatialReference
        this.tileInfo = this._elevation.tileInfo;
        this.spatialReference = this._elevation.spatialReference;
        this.fullExtent = this._elevation.fullExtent;
      })
    );

    return this;

  },

  // Fetches the tile(s) visible in the view
  fetchTile: function(level, row, col, options) {
    return this._elevation.fetchTile(level, row, col, options).then(
      function(data) {
        const exaggeration = this.exaggeration;
        for (let i = 0; i < data.values.length; i++) {
          data.values[i] = data.values[i] * exaggeration;
        }

        return data;
      }.bind(this)
    );
  }
});
        const scene = new WebScene({
            portalItem: {
                id: '7b08389497c942258772d6d2d9122385',
            },
            ground: {
                layers: [new ExaggeratedElevationLayer()]
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
                    width: 5, height: 5, depth: 5}
                ]
            },
            visualVariables: [
                {
                    type: "color",
                    field: "lineID", // field containing data for atmospheric pressure
                    stops: [{ value: '001', color: "rgba(255, 0, 162, 0.60)" }, 
                            { value: '100', color: "rgba(51, 0, 255, 0.60)" }],
                    anchor: "relative",
                    anchorPosition: { x: 1.5, y: 1, z: 20 }
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
        };
        
        const symbol2 = {
            type: "simple",  // autocasts as new SimpleLineSymbol()
            symbol: {
                type: "line-3d",
                symbolLayers: [{
                    type: "path",
                    profile: "circle",
                    width: 10,
                    height: 10,
                    anchor: "bottom",
                    // material: { color: "#ff7380" },
                }]
            },
            visualVariables: [
                {
                    type: "color",
                    field: "lineID", // field containing data for atmospheric pressure
                    stops: [{ value: '001', color: "rgba(255, 48, 179, 0.50)" }, 
                            { value: '100', color: "rgba(51, 0, 255, 0.60)" }]
                }
            ]
        };
        
        let citiesRenderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: {
    type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
    size: 6,
    color: "black",
    outline: {  // autocasts as new SimpleLineSymbol()
      width: 0.5,
      color: "white"
    }
  }
};
        const featureLayer = new FeatureLayer({
            url: "https://utility.arcgis.com/usrsvcs/servers/92c6f53aec8b4db19654b313fd70b542/rest/services/Hosted/walmart100/FeatureServer/2",
            renderer: threeDpointRender,
            hasZ: true
        });
        const featureLayer2 = new FeatureLayer({
          url: "https://utility.arcgis.com/usrsvcs/servers/92c6f53aec8b4db19654b313fd70b542/rest/services/Hosted/walmart100/FeatureServer/1",
            // renderer: symbol1
        });

        const relativeElevation = {
            mode: "relative-to-ground",
            // ground: {
            //     layers: [new ExaggeratedElevationLayer()]
            // }
            // offset: 1000
        };
        const lineElevation = {
            mode: "relative-to-ground",
            offset: 100,
        };
            
            featureLayer2.orderBy = [{
              field: "lineID",
              order: "descending"
            }];

    const elevationExpression = {
        mode: "relative-to-ground",
        featureExpressionInfo: {
            // expression: "1000"
            expression: "Geometry($feature).z + 100"
        },
        unit: "meters"
    }

        featureLayer2.renderer = symbol2;
        featureLayer.elevationInfo = relativeElevation;
        featureLayer2.elevationInfo = lineElevation;
        scene.add(featureLayer);
        scene.add(featureLayer2);
        console.log(featureLayer);

    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}
export default App;


