import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Card } from 'react-bootstrap';


function SearchResult() {
const { country } = useParams();
const [num, setNum] = useState();
const [data, setData] = useState();

async function fetch() {
try {
const res = await axios.get(`http://api.weatherapi.com/v1/search.json?key=c40fe0c8bccd48019f545127240307&q=${country}`);
setData(res.data);
console.log(res.data);
} catch (error) {
console.error("Error fetching data: ", error);
}
}

useEffect(() => {
fetch();
return () => {
console.log('Abort fetch');
};
}, [num]);

const navigate = useNavigate()
return (
<>
<div>
{country}
</div>
    {data?.map((val,index)=>{
        return(
            <Card style={{ width: '30rem' }} onClick={()=>{navigate(`${val.lat}/${val.lon}`)}}>
            <Card.Body>
            <Card.Title>{val.name}</Card.Title>
            <Card.Text>
            Region: {val.region}
            <br />
            Country: {val.country}
            <br />
            Latitude: {val.lat}
            <br />
            Longitude: {val.lon}
            </Card.Text>
            </Card.Body>
            </Card>
        )
    })}

</>
);
}
export default SearchResult;
