import * as React from 'react';
import Designer from '@/components/Designer';
import DesignerOld from '@/components/DesignerOld';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ballerz Designer Tool - Playground',
  description: 'Customize your Ballerz with the Ballerz Designer Tool.',
}
import '@/styles/globals.css'
// import DesignerRedux from '@/components/DesignerRedux';
// import BackgroundCustomizer from '@/components/BackgroundCustomizer';

export default function Playtime() {
  return (
    <div className="container">

    <main className="main">
     
    {/* <BackgroundCustomizer /> */}

    </main>


  </div>
  );
}
