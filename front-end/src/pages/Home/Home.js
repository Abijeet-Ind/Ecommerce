import "./Home.css"
import adsImage from './../../assets/ads.jpg';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Card from "../../component/card/Card";

export default function Home() {
  const [datas, setDatas] = useState(null);
  const baseUrl = "http://127.0.0.1:8000"

  const fetchData = async () => {
    const fetched = await axios.get(baseUrl + "/api/v1/products/all") 
    setDatas(fetched.data.message);
    console.log(datas)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container">
        <section className="ads-section">
          <img src={adsImage} alt="" draggable="false" />
        </section>

      <section className="items-display-container">
        <h1 className="search-list-name">All Items</h1>
        <div className="items-container">

          {datas && datas.map(data => (
            <Link to={`/detail/${data.slug}`}>
              <Card data={data}/>
            </Link>
          ))
          }
        </div>
      </section>
    </div>
  )
}
