"use client";
import { useSession } from "next-auth/react";
const About = () => {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className="flex justify-center">
      <h1 className="text-center text-2xl p-4">Acerca de Nosotros</h1>
    </div>
  );
};

export default About;
