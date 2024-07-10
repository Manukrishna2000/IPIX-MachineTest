import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { authenticate } from '../../apiservices/authService';

const Navbar = () => {
    let navigate=useNavigate()
    useEffect(()=>{
        let fetchData=async()=>{
            try{

                let response=await authenticate()
            }
            catch(e){
                navigate('/')
            }
            
        }
        fetchData()
    },[])
    let logout=()=>{
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <div>

        <nav>
            <ul>
                <li><Link to="/admin/cat">Categories</Link></li>
                <li><Link to="/admin/products">Products</Link></li>
                <button onClick={logout}>logout</button>
            </ul>
        </nav>
        <Outlet/>
        </div>
    );
};

export default Navbar;
