import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 0,
    lng: 0,
};

const NewGoogleMap = () => {

    const NEXT_PUBLIC_GOOGLE_MAPS_KEY = process.env.GOOGLE_MAP_API_KEY

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCvJYyo01U4D2Hgt7ckSgDNgQumO0YhyaA",
    });

    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(center);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    console.log('=================position===================');
                    console.log(position);
                    console.log('====================================');
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        }
        console.log('api key ', NEXT_PUBLIC_GOOGLE_MAPS_KEY as string)
    }, []);

    const onLoad = (map: any) => {
        setMap(map);
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation}
            zoom={15}
            onLoad={onLoad}
        >
            <Marker position={userLocation} />
        </GoogleMap>
    ) : (
        <></>
    );
}

export default NewGoogleMap;