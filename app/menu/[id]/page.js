import { prisma } from "@/app/lib/prisma";

const Page = async ({ params }) => {
  const getProduct = async () => {
    return await prisma.products.findMany({
      where: {
        categoryId: parseInt(params.id),
      },
    })
  }
  const data = await getProduct();
  console.log(data)
 
  return (
    <div className="flex flex-col justify-center border w-[80%] lg:w-[60%] mx-auto ">
      
      {
        data.map((product)=>(
        <div key={product.id} className="pl-1 flex hover:bg-slate-100">
          <div className="w-[90%] border"> ✔  {product.name}</div>
          
          <div  className="w-[10%] border text-center">{product.price} $</div>
        </div>
        ))
      }
        
      
    </div>
  );
};

export default Page;
