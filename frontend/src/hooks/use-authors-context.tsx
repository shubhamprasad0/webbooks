import { AuthorsContext } from "@/contexts/authors-context";
import { useContext } from "react";

const useAuthorsContext = () => {
  const authorsContext = useContext(AuthorsContext);

  if (!authorsContext) {
    throw new Error(
      "useAuthorsContext has to be used with AuthorssContext.Provider"
    );
  }

  return authorsContext;
};

export default useAuthorsContext;
