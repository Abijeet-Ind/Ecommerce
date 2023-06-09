import { useEffect, useState } from "react"
import "./orders.css"
import axios from "axios"



export default function Orders() {
    const [orderData, setOrderData] = useState(null);
    const baseUrl = "http://127.0.0.1:8000/";

    const fetchData = async () => {
        const data = await axios({
            method: "GET",
            url: baseUrl + "api/v1/products/vieworder",
        })

        setOrderData(data.data.message)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
    <div className="order-list-container">
        <h1>Orders List: </h1>
        <div className="orders-">
        {orderData && orderData.map(data => (
            <div className="order-item-container">
                {console.log(data.image)}
                <div className="image-container">
                    <img src={baseUrl + data.image} alt="" />
                </div>
            </div>

        ))}
        </div>
    </div>
  )
}

