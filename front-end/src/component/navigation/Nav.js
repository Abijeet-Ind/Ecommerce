import './Nav.css'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  const [textSearched, setTextSearched] = useState(null);

  const removeCookies = async  ( ) => {
    localStorage.removeItem("role")
    localStorage.removeItem("id")
    window.location.assign("/");
  }

 
  
  return (
    <div className="navigation-container">
        <div className="navigation">
            <ul className="logo navigations"> 
              <Link to={"/"}>Internet_Shop</Link> 
              <div className="navigators-div">
                <li className='navigators'> <Link to={"/"}   style={{fontSize: "1.2rem", fontWeight: "500"}}> Home </ Link></li>
                <li className='navigators' style={{display: localStorage.getItem("role") === "admin" ? "block" : "none"}}> <Link to={"/create"} style={{fontSize: "1.2rem", fontWeight: "500"}} > Upload product </ Link></li>
                <li className='navigators'> <Link to={"/cart"} style={{fontSize: "1.2rem", fontWeight: "500"}} > Cart </ Link></li>
                <li className='navigators'> <Link to={"/favourite"} style={{fontSize: "1.2rem", fontWeight: "500"}} > Favourite </ Link></li>
              </div>
            </ul>

            <ul className="users">
              <div className="search-section">
                <input type="text" onChange={el => setTextSearched(el.target.value)} className="filter-text-insert" name="" id="" />
                <Link to={`/search/${textSearched}`}> 
                  <button style={{
                    background: "#F48888", 
                    padding: "0 1rem",
                    margin: "0 1rem"  
                  }}> search </button>
                </Link>
              </div>
              <li className='login' style={{display: localStorage.getItem("id") ? "none" : "block"}}> <Link to={"/login"}  > Login </ Link></li>
              <li className='signup' style={{display: localStorage.getItem("id") ? "none" : "block"}}> <Link to={"/signup"}  > Signup </ Link></li>
              <li className='logout' style={{
                cursor: "pointer",
                display: localStorage.getItem("id") ? "block" : "none"
              }} onClick={el => removeCookies()}> Logout </li>
            </ul>
        </div>
    </div>
  )
}
