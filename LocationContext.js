import {createContext } from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext({
    ip: null,
    setIp: () => {},
    location: null,
    setLocation: () => {},
    userId: null,
    setUserId: () => {},
});

export default LocationContext;