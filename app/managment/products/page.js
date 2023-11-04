'use client'
import { useEffect } from 'react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';

const ManagmentMenu = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      // setProducts(data);
      setProducts(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  const columns = [
    {
      name: 'Producto',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Categoría',
      selector: row => row.category.name,
      sortable: true,
    },
    {
      name: 'Precio',
      selector: row => `${row.price} $. `,
      sortable: true,
    },
  ];
  
  return (
    <>
      <h1 className="p-4 text-center">Bienvenidos al Menú</h1>
      <div className="flex flex-col items-center w-[80%] mx-auto">
        <DataTable
          columns={columns}
          data={products}
        />
      </div>


    </>

  )
}

export default ManagmentMenu