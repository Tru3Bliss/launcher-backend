import React, { useEffect, useState } from 'react'
import Layout from '../../../layout/layout'
import Input from '../../../components/input';
import { useAppContext } from '../../../contexts/AppContext';
import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore";


const UsersPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const context = useAppContext()
  
 
  const handleCreate = async () => {
    console.log("add")
    const docRef = await addDoc(collection(context.db, "user"), {
      email: "Tokyo",
      displayName: "Japan",
      password: "123456",
      active: true,
    });
    console.log("complete")
  }

  // Start listing users from the beginning, 1000 at a time.

  useEffect(() => {
    // Start listing users from the beginning, 1000 at a time.
    console.log(context.db)
    const q = query(collection(context.db, "user"), where("state", "==", "CA"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
          cities.push(doc.data().name);
      });
      console.log("Current cities in CA: ", cities.join(", "));
    });
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