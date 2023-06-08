import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// component
import Nav from './component/navigation/Nav'
import Footer from './component/footer/FooterComp'

import UserAuthCom from './component/UserAuthCom/UserAuthCom';
import CreatedList from './component/create/CreatedList'
import Home from './pages/Home/Home';
import Detail from './pages/Detail_Page/Detail_Page';
import Upload from './component/upload/Upload'
import Fav_Cart from './pages/fav_&_cart/Fav_Cart';
import Search from './pages/Search/Search'

function App() {
  const [loginInput, setLoginInput] = useState(['email', 'password']);
  const [signupInput, setsignupInput] = useState(['name', 'email', 'password', 'passwordConfirm']);
  const [todoInput, setTodoInput] = useState(['name', 'description', 'price', 'category', 'brand'])


  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <CreatedList />
        <Routes>
          <Route path='/' element={ <Home /> }></Route>
          <Route path='/login' element={<UserAuthCom inputRendering={loginInput} identification="Login" />}></Route>
          <Route path='/login/admin' element={<UserAuthCom inputRendering={loginInput} identification="Login" />}></Route>
          <Route path='/signup' element={<UserAuthCom inputRendering= {signupInput} identification="Signup"/>}></Route>
          <Route path='/create' element={<Upload />}></Route>
          <Route path='/cart' element={<Fav_Cart pageName={"Cart"} />}></Route>
          <Route path='/favourite' element={<Fav_Cart pageName={"Favourite"} />}></Route>
          <Route path='/detail/:product' element={< Detail/>}></Route>
          <Route path='/search/:product' element={< Search/>}></Route>
          
        </Routes>
        {/* <Footer />  */}
      </BrowserRouter>
    </div>
  );
}

export default App;