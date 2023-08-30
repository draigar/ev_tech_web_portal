import React, { useEffect, useRef } from 'react';
import hereConfig from '../../../../here.config';
import * as H from 'here-js-api';

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { apiKey, appId } = hereConfig;

    const platform = new H.service.Platform({
      apikey: apiKey,
      app_id: appId,
    });

    const defaultLayers = platform.createDefaultLayers();

    const TH: any = H;
    const map = new TH.Map(mapContainerRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 52.5, lng: 13.4 },
      zoom: 10,
    });

    return () => {
      // Clean up the map when the component is unmounted
      map.dispose();
    };
  }, []);

  return <div ref={mapContainerRef} style={{ height: '400px' }} />;
};

export default Map;
