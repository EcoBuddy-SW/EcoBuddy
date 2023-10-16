import {createContext } from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext({
    ip: null,
    setIp: () => {},
    location: null,
    setLocation: () => {},
    userId: null,
    setUserId: () => {},
    userEmail: null,
    setUserEmail: () => {},
    locstate: null,
    setLocstate: () => {},
});

export default LocationContext;
