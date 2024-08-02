import * as React from 'react';
import Designer from '@/components/Designer';
import DesignerOld from '@/components/DesignerOld';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ballerz Designer Tool - Playground',
  description: 'Customize your Ballerz with the Ballerz Designer Tool.',
}
import '@/styles/globals.css'
import DesignerRedux from '@/components/DesignerRedux';

export default function Dressup() {
  return (
    <div className="container">

    <main className="main">
     
      {/* <DesignerRedux /> */}
      <DesignerOld />
      {/* <Designer /> */}
    </main>


  </div>
  );
}
