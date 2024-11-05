import { usePlaces } from "../context/PlaceContext";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import '../style/placeDetail.css'; // Add this line for custom styles

function PlaceDetail() {
    const { pid } = useParams();
    const { removePlace, updatePlace, getPlace } = usePlaces(); // Import getPlace function
    const { userInformation } = useAuth();
    const navigate = useNavigate();
    
    const [selectedPlace, setSelectedPlace] = useState(null); // Initialize selectedPlace as null
    const [isEditing, setIsEditing] = useState(false);
    const [placeData, setPlaceData] = useState({
        title: '',
        description: '',
        location: '',
        longitude: '',
        latitude: '',
        image: ''
    });

    // Fetch place details when the component mounts
    useEffect(() => {
        const fetchPlace = async () => {
            const place = await getPlace(pid); // Get place details using the getPlace function
            setSelectedPlace(place);
            if (place) {
                setPlaceData({
                    title: place.title,
                    description: place.description,
                    location: place.location,
                    longitude: place.longitude,
                    latitude: place.latitude,
                    image: place.image
                });
            }
        };

        fetchPlace();
    }, [pid, getPlace]); // Fetch place when pid changes

    const handleRemove = () => {
        if (selectedPlace && window.confirm("Та энэ газрыг устгахдаа итгэлтэй байна уу?")) {
            removePlace(selectedPlace.id); // Assume removePlace function takes id
            navigate("/"); // Redirect after removal
        }
    };

    const refreshDetail = async () => {
        const place = await getPlace(pid); // Get place details using the getPlace function
        setSelectedPlace(place);
        if (place) {
            setPlaceData({
                title: place.title,
                description: place.description,
                location: place.location,
                longitude: place.longitude,
                latitude: place.latitude,
                image: place.image
            });
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updatePlace({ ...placeData, id: selectedPlace.id, uid: userInformation.id }); 
        await refreshDetail();
        setIsEditing(false); // Close editing mode
    };

    const handleChange = (e) => {
        setPlaceData({
            ...placeData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Navbar />
            <div className="place-detail-container">
                {selectedPlace ? (
                    <div className="place-details">
                        <h1>{selectedPlace.title}</h1>
                        <img src={selectedPlace.image} alt={selectedPlace.title} className="place-image" />
                        <p className="description">{selectedPlace.description}</p>
                        <p><strong>Location:</strong> {selectedPlace.location}</p>
                        <p><strong>Coordinates:</strong> {selectedPlace.latitude}, {selectedPlace.longitude}</p>

                        {userInformation && userInformation.id === selectedPlace.uid && ( // Check if user can remove or update
                            <div className="action-buttons">
                                <button onClick={() => setIsEditing(true)} style={{backgroundColor: 'blue', marginRight: '10px'}}>Засах</button>
                                <button id="remove-button" onClick={handleRemove}>Устгах</button>
                            </div>
                        )}

                        {isEditing && (
                            <form onSubmit={handleUpdate} className="edit-form">
                                <input type="text" name="title" value={placeData.title} onChange={handleChange} required />
                                <textarea name="description" value={placeData.description} onChange={handleChange} required />
                                <input type="text" name="location" value={placeData.location} onChange={handleChange} required />
                                <input type="number" name="longitude" value={placeData.longitude} onChange={handleChange} required />
                                <input type="number" name="latitude" value={placeData.latitude} onChange={handleChange} required />
                                <input type="url" name="image" value={placeData.image} onChange={handleChange} required />
                                <button type="submit">Дуусгах</button>
                                <button type="button" onClick={() => setIsEditing(false)}>Болих</button>
                            </form>
                        )}
                    </div>
                ) : (
                    <p>Place not found.</p>
                )}
            </div>
        </>
    );
}

export default PlaceDetail;
