import { useState, useEffect, useMemo } from 'react';
import { GoogleMap, MarkerF, CircleF, useLoadScript } from '@react-google-maps/api';
import { nightStyles } from './nightStyles';
import { darkStyles } from './darkStyles';

interface MarkerObj {
    position: google.maps.LatLngLiteral;
}

export const DashboardMap = () => {
    const libraries = useMemo(() => ['places'], []);

    const NEXT_PUBLIC_GOOGLE_MAPS_KEY = process.env.GOOGLE_MAP_API_KEY

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries: libraries as any,
    });

    const mapCenter = useMemo(
        () => ({ lat: 6.546513741105146, lng: 3.3629270772567477 }),
        []
    );

    const grayStyles: google.maps.MapOptions['styles'] = [
        {
            featureType: 'all',
            elementType: 'all',
            stylers: [
                {
                    saturation: -100,
                },
                {
                    lightness: 50,
                },
            ],
        },
    ];

    const darkStyle: google.maps.MapOptions['styles'] = darkStyles

    const nightStyle: google.maps.MapOptions['styles'] = nightStyles

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: true,
            gestureHandling: "cooperative",
            zoomControl: true,
            styles: nightStyle
        }),
        []
    );

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    let markers = [
        {
            id: 1,
            latitude: 6.541738540102855,
            longitude: 3.3437010028217915,
            title: 'marker 1',
        },
        {
            id: 2,
            latitude: 6.554699693693319,
            longitude: 3.386616347542677,
            title: 'marker 2'

        },
        {
            id: 3,
            latitude: 6.529970885751958,
            longitude: 3.352112410387085,
            title: 'marker 3',
        },
        {
            id: 4,
            latitude: 6.548871192090619,
            longitude: 3.367705258912599,
            title: 'marker 4',
        },
        {
            id: 5,
            latitude: 6.547331730733665,
            longitude: 3.3631082010266344,
            title: 'marker 5',
        },
        {
            id: 6,
            latitude: 6.552212262471184,
            longitude: 3.3768564528476466,
            title: 'marker 6',
        },
        {
            id: 7,
            latitude: 6.544087523578921,
            longitude: 3.352003556064819,
            title: 'marker 7',
        },
        {
            id: 8,
            latitude: 6.54187166275431,
            longitude: 3.3665010791881347,
            title: 'marker 8',
        },
    ]

    const markerIcon = {
        url: "/images/chargingIcon1.png", // url
        scaledSize: new google.maps.Size(40, 40), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    return (
        <div className='' style={{ width: '100%', height: '100%' }}>
            <GoogleMap
                options={mapOptions}
                zoom={14}
                center={mapCenter}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: '100%', height: '100%', borderRadius: 8 }}
                onLoad={() => console.log('Map Component Loaded...')}
            >
                {markers.map((marker) => (
                    <MarkerF key={marker.id} icon={markerIcon} position={{ lat: marker.latitude, lng: marker.longitude }} onLoad={() => console.log('Marker Loaded')} />
                ))}
                {/* {[1000, 2000].map((radius, idx) => {
                    return (
                        <CircleF
                            key={idx}
                            center={mapCenter}
                            radius={radius}
                            onLoad={() => console.log('Circle Load...')}
                            options={{
                                fillColor: radius > 1000 ? 'red' : 'green',
                                strokeColor: radius > 1000 ? 'red' : 'green',
                                strokeOpacity: 0.3,
                            }}
                        />
                    );
                })} */}
            </GoogleMap>
        </div>
    );
};
