import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../../components/button'
import Input from '../../components/input'
import "./auth.css"
const SignInPage = () => {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const navigate = useNavigate()
  const handleLogin = () =>{
    navigate("/home")
  }
  return (
    <div className='auth-main w-screen h-full min-h-screen flex bg-opacity-60'>
      <div className='w-full flex flex-1 items-center justify-center px-4 bg-black bg-opacity-10'>
        <div className='rounded-xl bg-black bg-opacity-80 w-full sm:w-3/4 md:w-600  px-12 py-8'>
          <div className='flex flex-col gap-6'>
            <img src="assets/image/logo_brand.png" alt='brand' className='w-10/12 md:w-1/2 mx-auto '/>
            <Input value={email} setValue={setEmail} className="outline-none" type="email" label="User Email"/>
            <Input value={password} setValue={setPassword} className="outline-none" type="password" label="User Password"/>
            <PrimaryButton className="mt-12 uppercase" onClick={()=>{handleLogin()}}>Login</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage