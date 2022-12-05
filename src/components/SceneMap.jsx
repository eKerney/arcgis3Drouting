import React, { useRef, useEffect, useState } from "react";
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import Map from "@arcgis/core/Map";

export const SceneMap = (props) => {
// function MapView(props) {
    const [view, setView] = useState(null);
    const mapDiv = useRef(null);
  useEffect(() => {
      console.log(props);
      // console.log(id, basemap);
      if (mapDiv.current) {
        const scene = new WebScene({
            // portalItem: {id: props.id},
            basemap: props.basemap
        });
        const view = new SceneView({
            map: scene,
            container: mapDiv.current,
            padding: {
                top: 40
            },
        });
        return () => { view && view.destroy(); };
      }
  }, []);

    useEffect(() => {
        if (!view) {
            return;
        }
        view.map.basemap = props.basemap;

        const featureLayer = new FeatureLayer({
            url: "https://services5.arcgis.com/DzCDf9ACTMZgB0Wd/arcgis/rest/services/walmart100/FeatureServer",
            hasZ: true
        });
        view.map.add(featureLayer);

        // 7eb6cababde7416f8f49266f354f7d21
    }, [view, props.basemap]);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default SceneMap;
