import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${params.id}`,
    );

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
