import React, { useEffect, useState } from 'react'
import Layout from '../../../layout/layout'
import admin from "firebase-admin";
import app from '../../../base';
import Input from '../../../components/input';
import { useAppContext } from '../../../contexts/AppContext';
import { collection, addDoc } from "firebase/firestore"; 


const UsersPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const functions = require("firebase-functions");
  const context = useAppContext()
  const handleCreate = async () => {
    console.log("KLILl")
    const docRef = await addDoc(collection(context.db, "user"), {
      email: "Tokyo",
      displayName: "Japan"
    });
  }
  // Start listing users from the beginning, 1000 at a time.

  useEffect(() => {
    // Start listing users from the beginning, 1000 at a time.
    console.log(context.db)
  }, [])

  return (
    <Layout>
      <div>
        <Input value={email} setValue={setEmail} type="email" label="email" />
        <Input value={password} setValue={setPassword} type="password" label="password" />
        <button onClick={handleCreate}>create</button>
      </div>
    </Layout>
  )
}

export default UsersPage