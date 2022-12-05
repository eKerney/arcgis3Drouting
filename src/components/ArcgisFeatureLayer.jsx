import React, { useRef, useEffect } from "react";
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

function ArcgisFeatureLayer(props) {
  const mapDiv = useRef(null);

  useEffect(() => {
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

        const featureLayer = new FeatureLayer({
            url: "https://utility.arcgis.com/usrsvcs/servers/92c6f53aec8b4db19654b313fd70b542/rest/services/Hosted/walmart100/FeatureServer/2",
            renderer: threeDpointRender,
            hasZ: true
        });
      
        mapDiv.current.add(featureLayer);
    //   if (mapDiv.current) {
    //     const scene = new WebScene({
    //         portalItem: {
    //             id: props.id,
    //         },
    //         // ground: {
    //         //     layers: [new ExaggeratedElevationLayer()]
    //         // }
    //     });
    //     const view = new SceneView({
    //       map: scene,
    //       container: mapDiv.current,
    //       padding: {
    //         top: 40
    //       },

  }, []);

            // <div className="mapDiv" ref={mapDiv}></div>;
  return (
      <>
      </>
  )
}

export default ArcgisFeatureLayer;
