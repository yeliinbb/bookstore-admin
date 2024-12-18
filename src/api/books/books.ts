import { Book, type BookListResponse } from '@/types/books';
import client from '../client';

export interface BookListParams {
  page?: number;
  item?: number;
}

const ITEM_COUNT = 10;

/**
 * 책 목록을 가져오는 API
 * @param page 페이지 번호 (기본값: 1)
 * @param item 한 페이지당 아이템 수 (기본값: 10)
 */
export const getBookList = async ({
  page = 1,
  item = ITEM_COUNT,
}: BookListParams) => {
  const result = await client<BookListResponse>('/books', {
    params: {
      page: page.toString(),
      item: item.toString(),
    },
  });

  return result;
};

/**
 * 책 상세 정보를 가져오는 API
 * @param id 책 ID
 */
export const getBookDetail = async (id: number): Promise<Book> => {
  return client<Book>(`/books/${id}`);
};

/**
 * 책 정보를 수정하는 API
 *  * @param id 책 ID
 */
export const updateBook = async (
  id: number,
  bookData: Partial<Book>,
): Promise<Book> => {
  return client<Book>(`/books/${id}`, {
    method: 'PUT',
    body: JSON.stringify(bookData),
  });
};

/**
 * 책을 삭제하는 API
 *  * @param id 책 ID
 */
export const deleteBook = async (id: number): Promise<{ message: string }> => {
  return client<{ message: string }>(`/books/${id}`, {
    method: 'DELETE',
  });
};
