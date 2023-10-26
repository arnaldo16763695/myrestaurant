import SubNavBar from "../components/NavBarMenu.jsx";
import { prisma } from "@/app/lib/prisma";

const loadCategories = async () => {
  // const res = await fetch("http://localhost:3000/api/products", {
  //   cache: "no-store",
  // });

  // return res.json();

  return await prisma.categories.findMany();
};

const layoutMenu = async ({ children }) => {
  const data = await loadCategories();
  console.log(data);
  return (
    <div>
      <h1 className="text-center text-2xl p-4">Menú del Día</h1>
      <SubNavBar categs={data} />
      {children}
    </div>
  );
};

export default layoutMenu;
