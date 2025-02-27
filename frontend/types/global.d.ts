interface Author {
  id: string;
  name: string;
  biography: string;
  bornDate: string;
}

interface Book {
  id: string;
  title: string;
  description: string;
  publishedDate: string;
  author: Author;
}
