import { API_BASE_URL, PAGE_SIZE } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // URL에서 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const item = parseInt(searchParams.get('item') || PAGE_SIZE.toString(), 10);

    // 파라미터 유효성 검사
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { message: 'Invalid page parameter' },
        { status: 400 },
      );
    }
    if (isNaN(item) || item < 1) {
      return NextResponse.json(
        { message: 'Invalid item parameter' },
        { status: 400 },
      );
    }

    const data = await fetch(`${API_BASE_URL}/books?page=${page}&item=${item}`);

    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid data format');
    }

    // 총 아이템 수 및 페이지 수 계산
    const totalItems = data.length;
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
    const endIndex = startIndex + item;
    const paginatedData = data.slice(startIndex, endIndex);

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
      {
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const bookData = await request.json();

    if (!bookData.title || !bookData.author) {
      return NextResponse.json(
        { message: 'Title and Author are required' },
        { status: 400 },
      );
    }

    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
