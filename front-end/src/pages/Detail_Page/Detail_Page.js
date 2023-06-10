import "./Detail_Page.css"
import image from "./../../assets/tshirt.png"
import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

export default function Detail_Page() {
    const [data, setData] = useState(null);
    const [buyTrigger, setBuyTrigger] = useState(null);
    

    const baseUrl = "http://127.0.0.1:8000/api/v1/products"
    const base = "http://127.0.0.1:8000";
    const fetchData = async() => {
        const fetched = await axios.get(`${baseUrl}/one/${window.location.pathname.split("/")[2]}`);
        setData(fetched.data.message)
        // console.log(fetched.data.message)
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
    const [open, setOpen] = useState(false)

    const close = (e) => {
        e.preventDefault();
        setOpen(false);   
    }

    const submitCode = async (e) => {
        e.preventDefault()
        
        const data = await axios({
            method: "POST",
            url: "http://127.0.0.1:8000/api/v1/products/order",
            data: {
                userid: localStorage.getItem("id"),
                id: localStorage.getItem("key"),
                address: document.getElementById("address").value,
                area: document.getElementById("area-desc").value,
            }
        })
        console.log(data)
    }

    const buyClick = (productId) => {
        console.log(productId)
        if(!(localStorage.getItem("id"))){
            alert("please login");
        }else{
            localStorage.setItem("key", productId)
            setOpen(!open)
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
                        <span>{data.description}  </span>
                    </div>

                    <div className="buttons">
                        {/* <Link to={`buy`}>productPrice */}
                            <button className="buy" onClick={() => buyClick(data.id)}
                                > BUY 
                            </button>
                        {/* </Link> */}
                        <button className="cart" onClick={el => 
                            localStorage.getItem("id") 
                                ? addToCart(data.id, localStorage.getItem("id")) 
                                : alert("please login")}
                            > CART
                        </button>
                    </div>
                </div>


             {open && 
            <div className="order-container">
                    <h1 className="close" onClick={ e => close(e)}>X</h1>
                    <h1>Order Page</h1>
                    <form onSubmit={e => submitCode(e)}>
                        <label>
                            <span>Name</span>
                            <input type="text" name="" id="name-detail" value={data.product} />
                        </label>

                        <label>
                            <span>Email</span>
                            <input type="email" name="" id="email-detail" value={localStorage.getItem("email")} />
                        </label>

                        <label>
                            <span>Price</span>
                            <input type="number" name="" id="price-detail" value={data.productPrice} />
                        </label>

                        <label>
                            <span>Address</span>
                            <input type="text" name="" id="address-detail" />
                        </label>

                        <label>
                            <span>Area Description</span>
                            <textarea id="area-desc-detail"/>
                        </label>

                        <button type="submit" >order</button>
                    </form>
                </div>}
            </div>

        }

    </div>
  )
}
