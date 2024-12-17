import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const PAGE_SIZE = 10; // 기본 페이지당 아이템 수

const DATA_FILE = path.resolve(process.cwd(), 'src/api/books/data.json');

// 데이터 읽기 함수
const readData = async () => {
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
};

export async function GET(request: NextRequest) {
  try {
    // URL에서 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const item = parseInt(searchParams.get('item') || PAGE_SIZE.toString(), 10);
    const query = searchParams.get('query')?.toLowerCase() || ''; // 단일 검색 파라미터

    // 파라미터 유효성 검사
    if (isNaN(page) || page < 1) {
      return NextResponse.json({ message: 'Invalid page parameter' }, { status: 400 });
    }
    if (isNaN(item) || item < 1) {
      return NextResponse.json({ message: 'Invalid item parameter' }, { status: 400 });
    }

    // 데이터 읽기
    const data = await readData();

    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid data format');
    }

    // 필터링 로직: 제목 또는 저자에 query 포함
    const filteredData = query
      ? data.filter((book) => {
          const queryLower = query.toLowerCase();
          console.log('검색어 검사:', book.title, book.author, queryLower);

          const matchesTitle = book.title.toLowerCase().includes(queryLower);
          const matchesAuthor = book.author.toLowerCase().includes(queryLower);
          return matchesTitle || matchesAuthor;
        })
      : data;

    // 총 아이템 수 및 페이지 수 계산
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / item);

    if (page > totalPages) {
      return NextResponse.json({
        total_pages: totalPages,
        total_items: totalItems,
        current_page: page,
        booklist: [],
      });
    }

    // 페이지네이션 로직
    const startIndex = (page - 1) * item;
    const paginatedData = filteredData.slice(startIndex, startIndex + item);

    // 응답 객체
    const response = {
      total_pages: totalPages,
      total_items: totalItems,
      current_page: page,
      booklist: paginatedData,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error in API:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error instanceof Error ? error.message : error },
      { status: 500 },
    );
  }
}
