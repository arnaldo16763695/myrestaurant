'use client'
import { Loader } from '@/app/components/Loader';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AiFillDelete, AiFillEdit, AiOutlineClear } from "react-icons/ai";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      id="search"
      type="text"
      placeholder="Filtra por nombre"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      className='block lg:w-[25%] w-[60%] rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
    />
    <button type="button" className=' text-white rounded-md px-2 py-2 ml-1 bg-[#0e2439]' onClick={onClear}>
      <AiOutlineClear />
    </button>
  </>
);

const ManagmentMenu = () => {
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [loader, setLoader] = useState(false)

  const getProducts = async () => {
    setLoader(true)
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      // setProducts(data);
      setProducts(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
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
      selector: row => <div className='flex gap-5'><Link href={`/managment/products/edit/${row.id}`} title='Editar'><AiFillEdit className='text-lg' /></Link> <Link href={''} title='Eliminar'><AiFillDelete className='text-lg' /></Link></div>,

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
     <>
       <Link href={`/managment/products/add`} className="lg:hidden md:hidden text-white hover:bg-gray-700 border-slate-600 rounded-md p-2 text-sm bg-[#0e2439] mr-1">Nuevo</Link>
       <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
     </>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <h1 className="p-1 text-center font-bold">Productos</h1>
      <div className="flex flex-col items-center lg:w-[70%] w-full mx-2 lg:mx-auto">
        <div className="lg:flex flex justify-between lg:justify-start w-full">
          <Link href={`/managment/products/add`} className="lg:block md:block hidden text-white hover:bg-gray-700 border-slate-600 rounded-md p-2 text-sm bg-[#0e2439]">Nuevo Producto</Link>
          
         

        </div>
        {/* <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} /> */}
        {
          loader ? <Loader /> :
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              subHeader
              paginationComponentOptions={paginationComponentOptions}
              subHeaderComponent={subHeaderComponentMemo}
              persistTableHead
            />
        }
      </div>


    </>

  )
}

export default ManagmentMenu