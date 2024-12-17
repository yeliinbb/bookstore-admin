export interface Book {
  id: number;
  title: string;
  author: string;
  quantity: number;
  description: string;
  image: string;
}

export interface BookListResponse {
  total_pages: number;
  total_items: number;
  current_page: number;
  booklist: Book[];
}
