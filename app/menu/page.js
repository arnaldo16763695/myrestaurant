// import { prisma } from "../lib/prisma";

const loadProducts = async () => {
  // const res = await fetch("http://localhost:3000/api/products", {
  //   cache: "no-store",
  // });

//   return await prisma.products.findMany();
};
export const revalidate = 30;
const Menu = async () => {
  const data = await loadProducts();
  console.log(data);
  return (
    <div className="">
      <h1 className="p-4 text-center">Bienvenidos al Menú</h1>
      <div className="flex flex-col items-center">
        
        {/* {data.map((product, index)=>(
        
            <div key={product.id} className="grid gap-2  grid-cols-3 w-[80%] ">
             <div className=" ">{product.name}</div>
              <div className="  text-center">----------------------------------------</div>
              <div className=" marker:font-bold text-lg text-center">{product.price} <span className="font-normal">$</span></div> 
            </div>
              
           
        
        ))} */}
      </div>
     
    </div>
  );
};

export default Menu;
