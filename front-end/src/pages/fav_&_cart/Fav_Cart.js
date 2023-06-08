import "./Fav_Cart.css"
import "./../Home/Home.css"
import { useEffect, useState } from "react"
import Card from "../../component/card/Card"
import axios from "axios"
import { Link } from "react-router-dom"


export default function Fav_Cart({pageName}) {
    const [datas, setDatas] = useState();
    const baseUrl = "http://127.0.0.1:8000"

    const fetchData = async () => {

        const fetched = await axios({
            method: "POST",
            url: `http://127.0.0.1:8000/api/v1/products/${pageName.toLowerCase()}`,
            data: {
                userId: localStorage.getItem("id")
            }
        })
        setDatas(fetched.data.message);
        console.log(fetched.data.message)
        console.log(datas)
    }

    useEffect((pageName) => {
        fetchData(pageName);
    }, [pageName])

  return (
    <div className="fav_cart_container">
        <h1> {pageName} </h1>

        <div className="items-container">
            {datas && datas.map((data, i) => (
                
                <Link to={`/detail}`}>
                    {console.log(data[0].product)}
                    <div className="items-display" key={data[0].product}>
                        <div className="items-image">
                            <img src={`${baseUrl}/${data[0].image}`} alt="" />
                        </div>
                        <div className="product-information">
                            <div className="price-x-name">
                                <span>{data[0].product}</span> <span>${data[0].productPrice}</span>
                            </div>
                            <div className="buy-x-cart">
                                <button>Buy</button> <button>Cart</button>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}
