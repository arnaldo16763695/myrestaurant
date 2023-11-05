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
      className='block w-[25%] rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
    />
    <button type="button" className='ml-1 text-white rounded-md px-2 py-2 bg-[#0e2439]' onClick={onClear}>
      <AiOutlineClear />
    </button>
  </>
);

const Categories = () => {
  const [loader, setLoader] = useState(false)
  const [categories, setCategories] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const getCategories = async () => {
    setLoader(true)
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      // setProducts(data);
      setCategories(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
    }
  }
  const filteredItems = categories.filter(
    item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  useEffect(() => {
    getCategories();
  }, [])

  const columns = [
    {
      name: 'Categoría',
      selector: row => row.name,
      sortable: true,
    },

    {
      name: 'Acción',
      selector: row => <div className='flex gap-5'><Link title='Editar' href={`/managment/categories/edit/${row.id}`}><AiFillEdit className='text-lg' /></Link> <Link title='Eliminar' href={''}><AiFillDelete className='text-lg' /></Link></div>,

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
      <h1 className="p-4 text-center font-bold">Categorías</h1>
      <div className="flex flex-col items-center w-[60%] mx-auto">
        <div className="lg:flex flex justify-between lg:justify-start w-full">
          <Link href={`/managment/categories/add`} className=" text-white hover:bg-gray-700 border-slate-600 rounded-md p-2 text-sm bg-[#0e2439]">Nueva categoría</Link>

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

export default Categories