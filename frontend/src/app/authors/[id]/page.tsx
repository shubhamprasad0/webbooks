"use client";
import { useParams } from "next/navigation";

const AuthorPage = () => {
  const { id } = useParams();

  return <h1>{id}</h1>;
};

export default AuthorPage;
