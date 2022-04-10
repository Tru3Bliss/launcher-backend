import React, { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Table } from 'rsuite';
import { Pagination } from 'rsuite';
import "rsuite/dist/rsuite.min.css";
import { CircleLoader } from 'react-spinners';
import Swal from 'sweetalert2'
import Layout from '../../../layout/layout'
import Input from '../../../components/input';
import { useAppContext } from '../../../contexts/AppContext';
import { db } from '../../../firebase/config';
import { storage } from '../../../firebase/config';
import "./channel.css"
import PrimaryButton, { ActionButton } from '../../../components/button';
import CreateUserModal from '../../../components/modal/user';
import { async } from '@firebase/util';
import CategoryItem from '../../../components/item/categoryItem';
import CreateBlogModal from '../../../components/modal/blog';

const ThemePage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [themeList, setThemeList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [categoryOption, setCategoryOption] = useState([])
  const [newCategory, setNewCategory] = useState("")
  const [downloadLink, setDownloadLink] = useState()
  const context = useAppContext()


  const handleCreate = async (title, content, downloadLink, category) => {
    const theme = {
      title: title,
      content: content,
      artwork: downloadLink,
      category: category,
      createdAt: new Date().getTime()
    }
    const docRef = await addDoc(collection(db, "theme"), theme).then(() => {
    });
    setLoading(true)
    getTheme()
  }

  const handleCreateCategory = async () => {
    if (newCategory?.length > 0) {
      const category = {
        name: newCategory
      }
      setLoading(true)
      const docRef = await addDoc(collection(db, 'category'), category).then(() => {
        setLoading(false)
      })
      setNewCategory("")
      getCategory()
    }
  }


  /**
   * get themeList from firestore
   */
  const getTheme = async () => {
    setLoading(true)
    const parkingData = await getDocs(collection(db, "theme"))
    setThemeList(parkingData.docs.map((doc) => (
      {
        ...doc.data(),
        id: doc.id
      }
    )));
    setLoading(false)
  }

  /**
   * get categoryList from firestore
   */
  const getCategory = async () => {
    setLoading(true)
    const parkingData = await getDocs(collection(db, "category"))
    setCategoryList(parkingData.docs.map((doc) => (
      {
        ...doc.data(),
        id: doc.id
      }
    )));
    setLoading(false)
  }


  const handleEdit = () => {

  }

  const handleRemove = async (id) => {
    setLoading(true)
    const result = await deleteDoc(doc(db, "theme", id))
    getTheme()
  }

  const handleCategoryRemove = async (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não será capaz de reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteDoc(doc(db, "category", id))
        Swal.fire(
          'Excluída!',
          'A categoria foi excluída.',
          'success'
        )
        getCategory()
      }
    })
  }

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = themeList.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  const ImageCell = ({ rowData, dataKey, ...rest }) => (
    <Table.Cell {...rest} style={{ padding: 2 }} >
      <img src={rowData[dataKey]} className="w-20" />
    </Table.Cell>
  );

  useEffect(() => {
    let buffer =
      categoryList.map((category) => (
        {
          value: category.name,
          label: category.name
        }
      ))
    console.log(buffer)
  }, [categoryList])

  useEffect(() => {
    getTheme()
    getCategory()
  }, [])

  return (
    <Layout>
      <div className='pt-12 w-full px-8 relative'>
        <div className='mb-6'>
          <p className='text-white text-bold text-2xl'>Categoria</p>
          <div className='mt-4 flex gap-4 items-center'>
            <Input value={newCategory} setValue={setNewCategory} type={"text"} className="max-w-sm gap-0" />
            <ActionButton type="info" onClick={handleCreateCategory}>Adicionar categoria</ActionButton>
          </div>
          <div className='mt-2 flex-wrap flex gap-2'>
            {categoryList.map((category, idx) => (
              <CategoryItem data={category} key={idx} remove={handleCategoryRemove} />
            ))}
          </div>
        </div>
        <p className='text-white text-bold text-2xl'>Lista de Tema</p>
        <div className='flex items-center justify-end mt-2'>
          <ActionButton type="success" className="px-8 text-lg" onClick={() => { setOpenModal(true) }}>Criar Tema</ActionButton>
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
            <Table.Column width={100} className="">
              <Table.HeaderCell className="">Obra de arte</Table.HeaderCell>
              <ImageCell dataKey="artwork" />
            </Table.Column>
            <Table.Column width={100} align="center" >
              <Table.HeaderCell>Título</Table.HeaderCell>
              <Table.Cell dataKey="title" />
            </Table.Column>
            <Table.Column width={100} align="center" >
              <Table.HeaderCell>Categoria</Table.HeaderCell>
              <Table.Cell dataKey="category" />
            </Table.Column>
            <Table.Column flexGrow={1}>
              <Table.HeaderCell>Contente</Table.HeaderCell>
              <Table.Cell dataKey="content" />
            </Table.Column>
            <Table.Column width={180} align="center">
              <Table.HeaderCell>Açao</Table.HeaderCell>
              <Table.Cell>
                {rowData => {
                  return (
                    <div className='flex gap-2'>
                      {/* <ActionButton className='px-4 w-max' onClick={() => { handleEdit(rowData) }}>Edit</ActionButton> */}
                      <ActionButton className='px-4 w-max' type={"error"} onClick={() => { handleRemove(rowData.id) }}>Excluir</ActionButton>
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
              total={themeList.length}
              limitOptions={[5, 10, 20]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
            />
          </div>
        </div>
        {loading && <div className='absolute left-0 top-0 bg-black bg-opacity-50 flex items-center justify-center w-full h-full z-50'>
          <img src="/assets/image/rocketgif-small.gif" alt="logo" className='w-32 animate-bounce mx-auto mt-2' />
        </div>}
      </div>
      <CreateBlogModal open={openModal} setOpen={setOpenModal} create={handleCreate} categoryList={categoryList} />

    </Layout>
  )
}

export default ThemePage