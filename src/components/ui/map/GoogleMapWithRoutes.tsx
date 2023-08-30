import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

interface MapWithRoutesProps {
  waypoints: google.maps.DirectionsWaypoint[];
  apiKey: string;
}

const MapWithRoutes: React.FC<MapWithRoutesProps> = ({ waypoints, apiKey }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const libraries = useMemo(() => ['directions'], []);

  const NEXT_PUBLIC_GOOGLE_MAPS_KEY = process.env.GOOGLE_MAP_API_KEY

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  useEffect(() => {
    const directionsService = new google.maps.DirectionsService();

    const origin: any = waypoints[0].location;
    const destination: any = waypoints[waypoints.length - 1].location;
    const waypointsWithoutOriginAndDestination = waypoints.slice(1, -1);

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypointsWithoutOriginAndDestination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error('Directions request failed:', status);
        }
      }
    );
  }, [waypoints]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 0, lng: 0 }}
      zoom={1}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default MapWithRoutes;
