import React from 'react';

import MapViewDirecions from 'react-native-maps-directions';

export default function Directions({ destination, origin, onReady }) {

    
    return (
        <MapViewDirecions 
            destination={destination}
            origin={origin}
            onReady={onReady}
            apikey="AIzaSyC3qHc74i2P3Dao0o3iBaxBYuhpwDF5608"
            strokeWidth={3}
            strokeColor="#222"
        />
    )
}