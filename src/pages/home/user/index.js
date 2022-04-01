import React, { useEffect, useState } from 'react'
import Layout from '../../../layout/layout'
import Input from '../../../components/input';
import { useAppContext } from '../../../contexts/AppContext';
import { collection, query, where, onSnapshot, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from '../../../firebase/config';

const UsersPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userList, setUserList] = useState()
  const context = useAppContext()


  const handleCreate = async () => {
    console.log("add")
    const docRef = await addDoc(collection(db, "user"), {
      email: "Tokyo",
      displayName: "Japan",
      password: "123456",
      active: true,
    });
    console.log("complete")
  }


  const getUser = async () => {
    const parkingData = await getDocs(collection(db, "user"))
    setUserList(parkingData.docs.map((doc) => (
      {
        ...doc.data(),
        id: doc.id
      }
    )));
    console.log(parkingData)
  }
  // Start listing users from the beginning, 1000 at a time.

  useEffect(() => {
    // Start listing users from the beginning, 1000 at a time.
    console.log(db)
    getUser()
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