import './UserAuthCom.css'
import { useState } from 'react'
import image from './../../assets/images/cover.svg'
import axios from "axios";

export default function UserAuthCom({inputRendering, identification}) {
    const [inputs, setInput] = useState({ });

    const baseUrl = "http://127.0.0.1:8000"

    const dataStoreFunc = (e, field) => {
        setInput({...inputs, [field]: e })
    }
    console.log(inputs)

    const sendData = async (url, inputs) => {
        console.log(inputs)

        const toBackend = await axios({
            method: "POST",
            url: baseUrl + url,
            data : inputs
        })

        console.log(toBackend)
        if(toBackend.data.status === "success"){
            alert(toBackend.data.message)
            if(window.location.pathname === "/login"){
                localStorage.setItem("id", toBackend.data.data.id)
                localStorage.setItem("role", toBackend.data.data.role)
                window.location.assign('/');
            }
        }else{
            alert(toBackend.data.message)
        }
    }

    const sendDataToBackend = async (e) => {
        e.preventDefault();
        
        if(identification === 'Login'){
            if(window.location.pathname.split("/")[2] === "admin"){
                sendData('/api/v1/user/login/admin', inputs)       
            }else {
                sendData('/api/v1/user/login/admin', inputs)       
            }
        }else if (identification === 'Signup'){
            sendData('/api/v1/user/signup', inputs)       
        } else if (identification === 'Upload Product'){
            sendData('/api/v1/products/uploadProduct', inputs)  
        }
    }

    return (
        <div className='wrapper-div' >
            <section className='wrapper'>
                <section className='wrapper-section' style={{ width: window.location.pathname === '/create' ? "fit-content" : "50vw" }}>
                    <div className="information-container" style={{ padding: window.location.pathname === '/create' ? "4rem" : "4rem 2rem 4rem 4rem" }}>
                        <h1 className='title'>{identification}</h1>

                        <form className="fillup-container">
                            {inputRendering.map((input) => (
                                <label className={input + "-label"} key={input}>
                                    <span>{input}</span>
                                    <input accept={input === "image" ? "image/*" : "" } onChange={(e) => dataStoreFunc(e.target.value, input)} type={input === "password" ? "password" : (input === "email") ? "email" : (input === "passwordConfirm") ? "password" : (input === "price") ? "number" : "text" } id={input + "-fillup"} />
                                </label>
                             ))}
                            <button type="submit" onClick={(e) => sendDataToBackend(e)}> {(window.location.pathname === '/login') ? "Login" : (window.location.pathname === '/signup') ? "Signup" : "Upload"} </button>
                        </form>
                    </div>

                    
                    {(identification.localeCompare('Login') && identification.localeCompare('Signup')) === 0  && 
                        <div className="svg-container" >
                            <div className="svg">
                                <img src={image} draggable="false" alt="banner cannot be displayed" />
                            </div>
                        </div>
                    }
                </section>
            </section>
        </div>
    )
}
