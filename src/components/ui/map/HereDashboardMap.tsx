// src/DisplayMapFC.js

import * as React from 'react';
// import H from "@here/maps-api-for-javascript";

export const HereDashboardMap = () => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  // React.useLayoutEffect(() => {
  //   // `mapRef.current` will be `undefined` when this hook first runs; edge case that
  //   if (!mapRef.current) return;
  //   const platform = new H.service.Platform({
  //       apikey: "3xO2BZPEL2MsLLmBBHxeZ36Kt3DmRPIky5EEiS_fQo8"
  //   });
  //   const defaultLayers = platform.createDefaultLayers();
  //   const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
  //     center: { lat: 50, lng: 5 },
  //     zoom: 4,
  //     pixelRatio: window.devicePixelRatio || 1
  //   });

  //   const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

  //   const ui = H.ui.UI.createDefault(hMap, defaultLayers);

  //   // This will act as a cleanup to run once this hook runs again.
  //   // This includes when the component un-mounts
  //   return () => {
  //     hMap.dispose();
  //   };
  // }, [mapRef]); // This will run this hook every time this ref is updated

  return null
//   return <div className="map" ref={mapRef} style={{ height: "500px" }} />;
};