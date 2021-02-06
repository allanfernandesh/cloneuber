import React, { useState, useEffect, useRef } from "react";
import { View, Image } from "react-native";

import MapView, { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { getPixelSize } from '../../../utils';

import Seach from '../Search';
import Directions from '../Directions';
import Details from '../Details';

import marketImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

import { LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall, Back } from './styles';

Geocoder.init('AIzaSyC3qHc74i2P3Dao0o3iBaxBYuhpwDF5608');


export default function Map() {
    const [region, setRegion] = useState(null);
    const [location, setLocation] = useState();
    const [destination, setDestination] = useState(null);
    const [duration, setDuration] = useState(null);
    const mapViewRef = useRef(null);

    function handleLocationSelected(data, { geometry}) {
        const { location : { lat: latitude, lng: longitude } } = geometry;
        setDestination({
            latitude,
            longitude,
            title: data.structured_formatting.main_text,

            
        });
    };

    function handleBack() {
        setDestination(null);

    };


  
    useEffect(() => {
        Geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const response = await Geocoder.from({ latitude, longitude });
                const adress = response.results[0].formatted_address;
                setLocation(adress.substr(0, adress.indexOf(',')));
                setRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0143,
                    longitudeDelta: 0.0134,
                })
        },
        () => {},
        {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
        }
    );
    }, []);

  
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                region={region}
                showsUserLocation
                loadingEnabled
                ref={mapViewRef}
            >
            {destination && (
                <>
                <Directions
                    origin={region}
                    destination={destination}
                    onReady={result => {
                        setDuration(Math.floor(result.duration) )
                        mapViewRef.current.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: getPixelSize(50),
                                left: getPixelSize(50),
                                top: getPixelSize(50),
                                bottom: getPixelSize(350)
                            },
                            
                        })
                    }}
                />
                <Marker coordinate={destination} anchor={{ x: 0, y: 0 }} image={marketImage}> 
                    <LocationBox>
                        <LocationText>
                            {destination.title}
                        </LocationText>
                    </LocationBox>
                
                </Marker>
                <Marker coordinate={region} anchor={{ x: 0, y: 0 }} > 
                    <LocationBox>
                        <LocationTimeBox>
                            <LocationTimeText>{duration}</LocationTimeText>
                            <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                        </LocationTimeBox>
                        <LocationText>{location}</LocationText>
                    </LocationBox>
                
                </Marker>
                </>
                )
            }
            </MapView>

            { destination ?
            <>
                <Back onPress={handleBack}>
                    <Image source={backImage} />
                </Back>
                <Details />
            </> 
            
            : <Seach onLocatedSelected={handleLocationSelected}/>}
            
        </View>
  );
}
