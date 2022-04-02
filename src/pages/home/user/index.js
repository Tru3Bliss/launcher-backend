import React, { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Table } from 'rsuite';
import { Pagination } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import { CircleLoader } from 'react-spinners';
import Layout from '../../../layout/layout'
import Input from '../../../components/input';
import { useAppContext } from '../../../contexts/AppContext';
import { db } from '../../../firebase/config';
import "./user.css"
import PrimaryButton, { ActionButton } from '../../../components/button';
import CreateUserModal from '../../../components/modal/user';

const UsersPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userList, setUserList] = useState([])
  const context = useAppContext()


  const handleCreate = async (email, name, password) => {
    const user = {
      email: email,
      displayName: name,
      password: password,
      active: true,
      createdAt: new Date().getTime()
    }
    setLoading(true)
    const docRef = await addDoc(collection(db, "user"), user).then(() => {
      setUserList([...userList, user])
    });
    setLoading(false)
  }

  const getUser = async () => {
    setLoading(true)
    const parkingData = await getDocs(collection(db, "user"))
    setUserList(parkingData.docs.map((doc) => (
      {
        ...doc.data(),
        id: doc.id
      }
    )));
    setLoading(false)
    console.log(parkingData)
  }


  const handleEdit = () => {

  }

  const handleRemove = async (id) => {
    const result = await deleteDoc(doc(db, "user", id))
    getUser()
  }

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = userList.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Layout>
      <div className='pt-12 w-full px-8 relative'>
        <div className='flex items-center justify-end'>
          <ActionButton type="success" className="px-8 text-lg" onClick={() => { setOpenModal(true) }}>Create User</ActionButton>
        </div>
        {/* <div>
        <Input value={email} setValue={setEmail} type="email" label="email" />
        <Input value={password} setValue={setPassword} type="password" label="password" />
        <button onClick={handleCreate}>create</button>
      </div> */}
        <div className='w-full'>
          <Table
            className='text-white '
            height={limit === 5 ? 480 : 600}
            data={data}
            rowHeight={80}
            onRowClick={data => {
            }}
            limit={limit}
          >
            <Table.Column width={200} className="">
              <Table.HeaderCell className="">Email</Table.HeaderCell>
              <Table.Cell dataKey="email" className="flex items-center justify-center" />
            </Table.Column>
            <Table.Column flexGrow={1} align="center" >
              <Table.HeaderCell>Display Name</Table.HeaderCell>
              <Table.Cell dataKey="displayName" />
            </Table.Column>
            <Table.Column width={200}>
              <Table.HeaderCell>Password</Table.HeaderCell>
              <Table.Cell dataKey="password" />
            </Table.Column>
            <Table.Column width={180} align="center">
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.Cell>
                {rowData => {
                  return (
                    <div className='flex gap-2'>
                      <ActionButton className='px-4' onClick={() => { handleEdit(rowData) }}>Edit</ActionButton>
                      <ActionButton className='px-4' type={"error"} onClick={() => { handleRemove(rowData.id) }}>Delete</ActionButton>
                    </div>
                  );
                }}
              </Table.Cell>
            </Table.Column>
          </Table>
          <div style={{ padding: 20 }} className="text-white">
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="xs"
              layout={['total', '-', 'limit', '|', 'pager', 'skip']}
              total={userList.length}
              limitOptions={[5, 10, 20]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
            />
          </div>
        </div>
        {loading && <div className='absolute left-0 top-0 bg-black bg-opacity-50 flex items-center justify-center w-full h-full z-50'>
          <CircleLoader loading={loading} size={150} />
        </div>}
      </div>
      <CreateUserModal open={openModal} setOpen={setOpenModal} create={handleCreate} />

    </Layout>
  )
}

export default UsersPage