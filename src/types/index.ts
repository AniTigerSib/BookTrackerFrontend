export interface Book {
  id: number;
  name: string;
  cover: string;
  avgRating: number;
}

export interface BookExtended extends Book {
  category: string;
  author: string;
  language: string;
  year: number;
  originalName: string;
  pages: number;
  abstract: string;
}

export interface BookByCategory {
  id: number;
  name: string;
  books: Book[];
}
