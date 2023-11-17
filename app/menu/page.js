import { prisma } from "@/app/lib/prisma";


const loadProducts = async () => {
  // const res = await fetch("http://localhost:3000/api/products", {
  //   cache: "no-store",
  // });

  // return res.json();

  return await prisma.products.findMany();
};

export const revalidate = 60;
const Menu = async () => {
  const data = await loadProducts();
  console.log(data);


  return (
    <>
      
      <div className="flex flex-col justify-center border w-[80%] lg:w-[60%] mx-auto ">

        {data.map((product, index) => (



          <div key={product.id} className="pl-1 flex hover:bg-slate-100">
            <div className="w-[90%] border"> ✔  {product.name}</div>

            <div className="lg:w-[10%] md:w-[20%] w-[30%]  border text-center">{product.price} <span className="font-normal">$</span></div>
          </div>




        ))}
      </div>

    </>
  );
};

export default Menu;
