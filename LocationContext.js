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
    profileImage: null,
    setProfileImage: () => {},
    expoPushToken: null,
    setExpoPushToken: () => {},
    write: null,
    setWrite: () => {},
});

export default LocationContext;