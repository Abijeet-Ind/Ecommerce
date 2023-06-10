import { useEffect, useState } from "react"
import "./orders.css"
import axios from "axios"



export default function Orders() {
    const [orderData, setOrderData] = useState(null);
    const [orderUser, setOrderUser] = useState(null);
    const baseUrl = "http://127.0.0.1:8000/";

    const fetchData = async () => {
        const data = await axios({
            method: "GET",
            url: baseUrl + "api/v1/products/vieworder",
        })

        setOrderData(data.data.message)
        setOrderUser(data.data.user)
        console.log(data.data.user)
    }

    useEffect(() => {
        fetchData();
    }, [])

    const updateSendItem = async (updateID) => {
        console.log(updateID)
        const fetched = await axios({
            method: "POST",
            url:baseUrl+"api/v1/products/sendOrder",
            data: {updateID}
        })

        console.log(fetched)
        // if(fetched)
    }

    return (
    <div className="order-list-container">
        <h1>Orders List: </h1>
        <div className="orders-">
        {orderData && orderData.map((data, i) => (
            <div className="order-item-container" key={data[0].product + "-" +i}>
                <div className="checker-container">
                    <input type="checkbox" name="" id="checkbox" />
                </div>
                <div className="image-container">
                    <img src={baseUrl + data[0].image} alt={data[0].product} />
                </div>
                <div className="product-details">
                    <h2>product name and price</h2>
                    <h2>{data[0].product}</h2>
                    <h2>${data[0].productPrice}</h2>
                </div>
                <div className="user-details">
                    <h2>Name & Email</h2>
                    <h2>{orderUser && orderUser[0][0].email}</h2>
                    <h2>{orderUser && orderUser[0][0].name}</h2>
                </div>
                <div className="order-date">
                    <h2>order date</h2>
                    <h2>{data[0].createdAt.split("T")[0]}</h2>
                </div>
                <div className="order-checker">
                    <button onClick={updateSendItem(data[0].id)}>send</button>
                </div>
            </div>
        ))}
        </div>
    </div>
  )
}

