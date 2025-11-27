'use client'
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      edit brand id: {id}
    </div>
  );
};

export default Page;
