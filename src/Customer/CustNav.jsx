import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { authenticate } from '../apiservices/authService'

const CustNav = () => {
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

    <div>
        <Link to='/cust/cart'>
        <div>
            Cart
        </div>
        </Link>
        <Link to='/cust/products'>
            <div>
            Product
        </div>
        </Link>
        <button onClick={logout}>logout</button>


    </div>
    <Outlet/>
    </div>

  )
}

export default CustNav