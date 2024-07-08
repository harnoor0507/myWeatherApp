import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Weather() {
    const { country, lat, lon } = useParams();
    const [currentData, setCurrentData] = useState(null);

    useEffect(() => {
        const fetchCurrentData = async () => {
            try {
                const res = await axios.get(`http://api.weatherapi.com/v1/current.json?key=c40fe0c8bccd48019f545127240307&q=${country}&aqi=no&lat=${lat}&lon=${lon}`);
                setCurrentData(res.data);
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching current weather data: ", error);
            }
        };

        fetchCurrentData();
    }, [country, lat, lon]);

    if (!currentData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Weather Data</h1>
            <Card style={{ width: '30rem', marginBottom: '10px' }}>
                <Card.Body>
                    <Card.Title>{currentData.location.name}, {currentData.location.region}</Card.Title>
                    <Card.Text>
                        Country: {currentData.location.country}
                        <br />
                        Latitude: {currentData.location.lat}
                        <br />
                        Longitude: {currentData.location.lon}
                        <br />
                        Time Zone: {currentData.location.tz_id}
                        <br />
                        Local Time: {currentData.location.localtime}
                        <br />
                        Temperature (C): {currentData.current.temp_c}
                        <br />
                        Temperature (F): {currentData.current.temp_f}
                        <br />
                        Condition: {currentData.current.condition.text}
                        <br />
                        Wind (kph): {currentData.current.wind_kph}
                        <br />
                        Wind (mph): {currentData.current.wind_mph}
                        <br />
                        Humidity: {currentData.current.humidity}
                        <br />
                        Cloud: {currentData.current.cloud}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Weather;
