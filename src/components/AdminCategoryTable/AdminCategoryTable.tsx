import React, { useEffect, useState } from 'react'
import { Categories } from '../../Types/Types';
import './AdminCategoryTable.scss'
import { MdCancel } from 'react-icons/md';

const AdminCategoryTable = () => {

    const [categories, setCategories] = useState<Categories[]>([]);
    const [newCategory,setNewCategory] = useState<string>();
    console.log(newCategory);

    const token = localStorage.getItem('userToken');
    
    
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);

    const getCategories = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/categories")
            const data: Categories[] = await response.json();
            setCategories(data)
        } catch (error) {
            console.error("Kategoriler Gelirken bir hata oluştu: ", error);

        }
    }
    const addCategory = async () =>{
        const categoryData ={
            name:newCategory,
            token:token
        }
        try{
            const response = await fetch("http://localhost:8080/api/categories",{
                headers: {
                    'Content-Type': 'application/json',
                  },
                  method: "POST",
                  body:JSON.stringify(categoryData)
            })
            const data = await response.text();
            console.log(data);
            
        }catch(error){
            console.error("Kategori eklenirken bir hata oluştu: ",error);
            
        }finally{
            setModalVisibility(false);
            getCategories();
        }
    }
    const handleChangeModalVisibility = () => {
        setModalVisibility(!modalVisibility)
    }
    useEffect(() => {
        getCategories();
    }, [])


    return (
        <div>
            {modalVisibility && (
                <div className='category-modal'>
                    <div className='modal-container'>
                        <input type="text" placeholder='kategori adı' style={{padding:"5px 10px",borderRadius:"5px",color:"#000"}} onChange={(e)=> setNewCategory(e.target.value)} />
                        <button className='bg-green-600  py-1 px-5 absolute bottom-3 rounded-md' onClick={addCategory}>Onayla</button>
                        <button onClick={() => setModalVisibility(false)} style={{ position: "absolute", top: "5px", right: "5px", fontSize: "x-large" }} className='text-red-600'><MdCancel /></button>
                    </div>
                </div>
            )}
            <h3 className='admin-category-title'>Kategoriler</h3>
            <button className='admin-category-btn' onClick={handleChangeModalVisibility}>Kategori Ekle +</button>
            <table className="table mt-10">
                <thead>
                    <tr className='text-blue-600'>
                        <th>Kategori Adı</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminCategoryTable
