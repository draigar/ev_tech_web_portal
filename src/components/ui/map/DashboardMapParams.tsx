import { useState, useEffect, useMemo } from 'react';
import { GoogleMap, MarkerF, CircleF, useLoadScript } from '@react-google-maps/api';
import { nightStyles } from './nightStyles';
import { darkStyles } from './darkStyles';

interface MarkerObj {
    lat?: number;
    lng?: number;
}

export const DashboardMapParams = (props: MarkerObj) => {
    const {lat, lng}: any = props;
    const libraries = useMemo(() => ['places'], []);

    const NEXT_PUBLIC_GOOGLE_MAPS_KEY = process.env.GOOGLE_MAP_API_KEY

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries: libraries as any,
    });

    const mapCenter: any = useMemo(
        () => ({ lat: lat, lng:  lng}),
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
                <MarkerF icon={markerIcon} position={{ lat: lat, lng: lng }} onLoad={() => console.log('Marker Loaded')} />
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
