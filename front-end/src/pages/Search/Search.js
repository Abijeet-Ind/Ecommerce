import { useEffect, useState } from "react"
import "./Search.css"
import axios from "axios"
import Card from "../../component/card/Card";
import { Link } from "react-router-dom";

export default function Search() {
    const [searchData, setData] = useState(null);

    const fetchData = async () => {
        const data = await axios({
            method: "GET",
            url: `http://127.0.0.1:8000/api/v1/products/search/${window.location.pathname.split("/")[2]}`
        })

        setData(data.data.message);
    }

    useEffect(() => {
        fetchData();
    }, [])
  
    return (
    <div className="searched-container">
        <h1>Searched Item: {searchData ? searchData.product : ""  }</h1>
        {searchData &&  <Link to={`/detail/`+searchData.slug}> <Card data={searchData}/> </Link>}
    </div>
  )
}
