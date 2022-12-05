import React, { useRef, useEffect } from "react";
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";

function SceneMap(props) {
  const mapDiv = useRef(null);

  useEffect(() => {
      if (mapDiv.current) {
        const scene = new WebScene({
            portalItem: {
                id: props.id,
            },
        });
        const view = new SceneView({
          map: scene,
          container: mapDiv.current,
          padding: {
            top: 40
          },
        });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default SceneMap;
