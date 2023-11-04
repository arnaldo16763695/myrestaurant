'use client'
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      id="search"
      type="text"
      placeholder="Filtra por nombre"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      className='block w-[25%] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
    />
    <button type="button" className='border text-white rounded-md px-2 py-1 bg-[#0e2439]' onClick={onClear}>
      X
    </button>
  </>
);

const ManagmentMenu = () => {
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

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
  const filteredItems = products.filter(
    item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
  );

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
    {
      name: 'Acción',
      selector: () => <div className='flex gap-5'><Link href={''}><AiFillEdit className='text-lg' /></Link> <Link href={''}><AiFillDelete className='text-lg' /></Link></div>,

    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };
  
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <h1 className="p-4 text-center font-bold">Productos</h1>
      <div className="flex flex-col items-center w-[70%] mx-auto">
        <div className="lg:flex flex justify-between lg:justify-start w-full">
          <Link href={`/managment/products/add`} className=" text-white hover:bg-gray-700 border-slate-600 rounded-md p-2 text-sm bg-[#0e2439]">Nuevo Producto</Link>

        </div>
        {/* <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} /> */}
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          subHeader
          paginationComponentOptions={paginationComponentOptions}
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
        />
      </div>


    </>

  )
}

export default ManagmentMenu