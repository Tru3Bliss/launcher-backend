import React, { useState } from 'react'
import { ActionButton } from '../button'
import Input from '../input'

const CreateUserModal = (props) => {

  const { open, setOpen, dlgTitle, create } = props
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(0)

  const clear =  () => {
    setEmail("")
    setName("")
    setPassword("")
    setError(0)
  }

  const handleCreate = async () => {
    if (email.length === 0) {
      setError(1)
    }
    else if (name.length < 4) {
      setError(2)
    }
    else if (password.length < 6) {
      setError(3)
    }
    else {
      await create(email, name, password)
      clear()
      setOpen(false)
    }
  }


  return (
    <div>
      <div id=""
        className={`fixed ${!open && "hidden"} z-50 inset-0 overflow-y-auto h-full w-full px-4 modal bg-black bg-opacity-40`}>
        <div className="relative top-1/3 -translate-y-1/2 transform mx-auto rounded-md bg-slate-600 max-w-xl shadow-xl px-8">
          <div className="flex justify-between items-center text-xl rounded-t-md py-2 h-13">
            <h3 className="text-ph-h2 text-center w-full text-app-blue font-bold text-2xl py-4">{dlgTitle}</h3>
            <button onClick={() => setOpen(false)} className="text-white rounded-full font-bold w-10 h-10 flex items-center justify-center"><p>x</p></button>
          </div>
          <div className='flex gap-8 flex-col'>

            <div className='w-full flex flex-col justify-around gap-4'>
              <Input value={email} setValue={setEmail} type="email" label="Email" />
              {error === 1 && <p className='text-app-red'>Please input user Email</p>}
              <Input value={name} setValue={setName} type="text" label="Name" />
              {error === 2 && <p className='text-app-red'>User name should contains at least 4 letters</p>}
              <Input value={password} setValue={setPassword} type="password" label="Password" />
              {error === 3 && <p className='text-app-red'>Password length should be at least 6 letters</p>}
            </div>
            <div>
            </div>
          </div>

          <div className="px-7.5">
            <div className="space-y-3 mt-6 hidden">
              <p className="text-pc-h4"></p>

            </div>
            <div className="space-y-2 mt-4">
              <div className='grid grid-cols-1 gap-4'>

              </div>
            </div>
          </div>

          <div className="px-4 flex justify-end items-center space-x-4 py-6">
            <ActionButton type="info" className="w-40 py-4 text-white rounded-md bg-gray-400 text-xl hover:bg-gray-300 active:bg-gray-500 font-bold" onClick={() => handleCreate()}>Save</ActionButton>
            <ActionButton type="error" className="w-40 py-4 text-white rounded-md bg-red-400 text-xl hover:bg-red-300 active:bg-red-500 font-bold" onClick={() => setOpen(false)}>Close</ActionButton>
          </div>
        </div>
      </div>
    </div>
  )
}


export default CreateUserModal