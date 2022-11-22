        const options = {
          profile: "quad",
          cap: "round",
          join: "miter",
          width: 5,
          height: 30,
          color: [200, 200, 200],
          profileRotation: "all"
        };

        /* The colors used for the each transit line */
        const colors = {
          A: [255, 0, 16],
          B: [0, 170, 227],
          C: [248, 150, 29],
          D: [0, 166, 63],
          F1: [189, 239, 133],
          F2: [189, 239, 133]
        };

        /* Create layer with the transit lines */
        const transitLayer = new FeatureLayer({
          url: "https://utility.arcgis.com/usrsvcs/servers/92c6f53aec8b4db19654b313fd70b542/rest/services/Hosted/walmart100/FeatureServer/1",
          copyright:
            "Data from <a href='https://data.beta.grandlyon.com/en/datasets/lignes-metro-funiculaire-reseau-transports-commun-lyonnais/info'>Data Grand Lyon - Sytral</a>",
          elevationInfo: {
            mode: "relative-to-ground",
            offset: 10
          },
          title: "Transit lines in Lyon",
          definitionExpression: "sens='Aller'"
        });
        webscene.add(transitLayer);

        function renderTransitLayer() {
          const renderer = new UniqueValueRenderer({
            field: "lineID"
          });

          for (let property in colors) {
            if (colors.hasOwnProperty(property)) {
              renderer.addUniqueValueInfo({
                value: property,
                symbol: {
                  type: "line-3d",
                  symbolLayers: [
                    {
                      type: "path",
                      profile: options.profile,
                      material: {
                        color: colors[property]
                      },
                      width: options.width,
                      height: options.height,
                      join: options.join,
                      cap: options.cap,
                      anchor: "bottom",
                      profileRotation: options.profileRotation
                    }
                  ]
                }
              });
            }
          }

          transitLayer.renderer = renderer;
        }

        renderTransitLayer();
