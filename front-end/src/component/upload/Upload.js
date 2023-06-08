import './../UserAuthCom/UserAuthCom.css'
import React, { useState } from 'react'
import axios from "axios";

export default function Upload() {
    const baseUrl = "http://127.0.0.1:8000"
    const [image,setImage] = React.useState(null)

    const sendData = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        formData.append("image",image)

        // Convert the FormData to an object using Object.entries
        const dataObject = Object.fromEntries(formData.entries());
        
        //  dataObject.image = image; 
        // Print the image to the console
        console.log(dataObject)

        await axios.post(`${baseUrl}/api/v1/products/uploadproduct`, dataObject, {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
    }

    return (
        <div className='wrapper-div' >
            <section className='wrapper'>
                <section className='wrapper-section' style={{ width: window.location.pathname === '/create' ? "fit-content" : "50vw" }}>
                    <div className="information-container" style={{ padding: window.location.pathname === '/create' ? "4rem" : "4rem 2rem 4rem 4rem" }}>
                        <h1 className='title'>Upload Product</h1>

                        <form className="fillup-container" onSubmit={(e)=>sendData(e)}>
                            <label className="product-name-label">
                                <span>Product Name</span>
                                <input type="text" name='name' id="name" />
                            </label>

                            <label className="product-name-label">
                                <span>Product Price</span>
                                <input type="number" name='price' id="price" />
                            </label>

                            <label className="product-name-label">
                                <span>Product category</span>
                                <input type="text" id="category" name='category' />
                            </label>

                            
                            <label className="product-name-label">
                                <span>Product Desription</span>
                                <textarea id="description" name='description'/>
                            </label>

                            <label className="product-name-label">
                                <span> Brand</span>
                                <input type="text" id="brand" name='brand' />
                            </label>

                            <label className="product-name-label">
                                <span> product image</span>
                                <input type="file"  onChange={(e)=>setImage(e.target.files[0])} id="image" />
                            </label>
                            
                            <button type="submit" > Upload </button>
                        </form>
                    </div>
                </section>
            </section>
        </div>
    )
}
