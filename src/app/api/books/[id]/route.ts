import { API_BASE_URL } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';

// GET - 개별 책 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${params.id}`);

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Book not found' },
        { status: response.status },
      );
    }

    const book = await response.json();
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

// PUT - 책 정보 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const bookData = await request.json();

    const response = await fetch(`${API_BASE_URL}/books/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      throw new Error('Failed to update book');
    }

    const updatedBook = await response.json();
    return NextResponse.json(updatedBook);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update book' },
      { status: 500 },
    );
  }
}

// DELETE - 책 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${params.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }

    return NextResponse.json(
      { message: 'Book deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete book' },
      { status: 500 },
    );
  }
}
