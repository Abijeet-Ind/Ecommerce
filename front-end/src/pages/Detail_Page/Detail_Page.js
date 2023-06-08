import "./Detail_Page.css"
import image from "./../../assets/tshirt.png"
import { useEffect, useState } from "react"
import axios from "axios";

export default function Detail_Page() {
    const [data, setData] = useState(null);
    const baseUrl = "http://127.0.0.1:8000/api/v1/products"
    const base = "http://127.0.0.1:8000";
    const fetchData = async() => {
        const fetched = await axios.get(`${baseUrl}/one/${window.location.pathname.split("/")[2]}`);
        setData(fetched.data.message)
        console.log(fetched.data.message)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const addToFav = async(productId, userId) => {
        const Fav = await axios({
            method: "POST",
            url: `${baseUrl}/favorite`,
            data: {productId, userId},
        })

        if(Fav.data.status === 'success'){
            alert("uploaded to favourite");
        }
    }

    const addToCart = async (productId, userId) => {
        const Cart = await axios({
            method: "POST",
            url: `${baseUrl}/addtocart`,
            data: {productId, userId},
        })

        if(Cart.data.status === 'success'){
            alert("uploaded to cart");
        }
    }
  return (
    <div className="detail-container">
        {data && 
            <div className="container-split" key={data.name}>
                <div className="left-split">
                    <img src={`${base}/${data.image}`} alt="" />
                </div>
                <div className="right-split">
                    <div>
                        <h1>{data.product} </h1>
                    </div>

                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <h1>${data.productPrice} </h1>
                        <button className="favourite" onClick={el => 
                            localStorage.getItem("id") 
                                ? addToFav(data.id, localStorage.getItem("id")) 
                                : alert("please login")}
                            > Favourite
                        </button>
                    </div>

                    <div>
                        <span>{data.description} </span>
                    </div>

                    <div className="buttons">
                        <button className="buy" onClick={el =>  
                            localStorage.getItem("id") 
                                ? alert("boght") 
                                : alert("please login")}
                            > BUY 
                        </button>
                        <button className="cart" onClick={el => 
                            localStorage.getItem("id") 
                                ? addToCart(data.id, localStorage.getItem("id")) 
                                : alert("please login")}
                            > CART
                        </button>
                    </div>
                </div>
            </div>
        }

    </div>
  )
}
