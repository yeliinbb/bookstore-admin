import React from 'react';
import Button from './Button';
import Link from 'next/link';

const BackButton = () => {
  return (
    <Link href="/">
      <Button className="bg-gray-600 hover:bg-gray-400">뒤로가기</Button>
    </Link>
  );
};

export default BackButton;
