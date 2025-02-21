'use client';

import dynamic from 'next/dynamic';

const Form = dynamic(() => import('../app/components/Form'), { ssr: false });

export default function Page() {
  return <Form />;
}
