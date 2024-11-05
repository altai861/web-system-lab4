import Navbar from "./Navbar";
import { useState } from "react";
import '../style/newPlace.css'
import { usePlaces } from "../context/PlaceContext";
import { useAuth } from "../context/AuthContext";

function NewPlace() {
    const { userInformation } = useAuth();
    const { places, addPlace, removePlace } = usePlaces();

    const [response, setResponse] = useState({ show: false, text: '' });

    const [placeData, setPlaceData] = useState({
        title: '',
        description: '',
        location: '',
        longitude: '',
        latitude: '',
        image: ''
    })

    const handlePlaceChange = (e) => {
        setPlaceData({
            ...placeData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPlace = {
            title: placeData.title,
            description: placeData.description,
            location: placeData.location,
            longitude: placeData.longitude,
            latitude: placeData.latitude,
            image: placeData.image,
            uid: userInformation.id
        }

        await addPlace(newPlace);

        setPlaceData({
            title: '',
            description: '',
            location: '',
            longitude: '',
            latitude: '',
            image: ''
        })

        setResponse({
            show: true,
            text: "Шинэ газар амжилттай нэмлээ"
        })
    }

    return (
        <div>
            <Navbar />
            <div>
                <form id="new-place-form" onSubmit={handleSubmit}>
                {response.show && <span id="new-place-response">{response.text}</span>}
                    <input type="text" name="title" placeholder="Гарчиг" value={placeData.title} onChange={handlePlaceChange} required/>
                    <textarea name="description" value={placeData.description}
                    onChange={handlePlaceChange} required placeholder="Тайлбар">
                    </textarea>
                    <input type="text" name="location" placeholder="Хаяг" value={placeData.location} onChange={handlePlaceChange} required/>
                    <label>
                        Байршил
                    </label>
                    <input type="number" name="longitude" placeholder="Уртраг" value={placeData.longitude} onChange={handlePlaceChange} required/>
                    <input type="number" name="latitude" placeholder="Өргөрөг" value={placeData.latitude} onChange={handlePlaceChange} required/>
                    <input type="url" name="image" placeholder="Зургийн линк" value={placeData.image} onChange={handlePlaceChange} required />

                    <button type="submit">Нэмэх</button>
                </form>
            </div>
        </div>
    )
}

export default NewPlace;