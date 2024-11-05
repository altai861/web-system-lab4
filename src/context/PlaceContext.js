import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios"; // Axios for making HTTP requests

const PlaceContext = createContext();

export const PlaceProvider = ({ children }) => {
    const addPlace = async (newPlace) => {
        try {
            // Destructure the fields from the newPlace object
            const { title, description, location, latitude, longitude, image } = newPlace;
    
            // Send the request with separate fields in the body
            const response = await axios.post("http://localhost:3500/api/places", {
                title,
                description,
                location,
                latitude,
                longitude,
                image,
            });
    
        } catch (error) {
            console.error("Failed to add place", error);
        }
    };

    const removePlace = async (id) => {
        try {
            await axios.delete(`http://localhost:3500/api/places/${id}`);
        } catch (error) {
            console.error("Failed to delete place", error);
        }
    };

    const updatePlace = async (updatedPlace) => {
        try {
            // Destructure the fields from the updatedPlace object
            const { id, title, description, location, latitude, longitude, image } = updatedPlace;
    
            // Send the PUT request with separate fields in the body
            await axios.patch(`http://localhost:3500/api/places/${id}`, {
                title,
                description,
                location,
                latitude,
                longitude,
                image,
            });
    
        } catch (error) {
            console.error("Failed to update place", error);
        }
    };

    const getUserPlaces = async (userId) => {
        try {
    
            const response = await axios.get(`http://localhost:3500/api/places/user/${userId}`)
            // Update the local state with the modified place
            return response.data;
        } catch (error) {
            console.error("Failed to update place", error);
        }
    }

    const getPlace = async (placeId) => {
        try {
    
            const response = await axios.get(`http://localhost:3500/api/places/${placeId}`)
            // Update the local state with the modified place
            return response.data;
        } catch (error) {
            console.error("Failed to fetch place", error);
        }
    }
    

    return (
        <PlaceContext.Provider value={{ addPlace, removePlace, updatePlace, getPlace, getUserPlaces }}>
            {children}
        </PlaceContext.Provider>
    );
};

export const usePlaces = () => {
    return useContext(PlaceContext);
};
