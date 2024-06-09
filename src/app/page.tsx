import Image from "next/image";
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ballerz Playground',
  description: 'Experiments with Ballerz',
}
export default function Home() {
  return (
    <div className="main">
    <div className="sticky-bar text-center" style={{ fontSize: '12px' }}> Ballerz Playground  </div>
    <main className="flex min-h-screen flex-col items-center py-24 px-4">
      <header className="w-full text-center">
        <Image
          src="/img/logo.png"
          width={320}
          height={60}
          alt="Ballerz"
          className="mx-auto pb-4"
        /> 
          <Image
          src="/img/playground.png"
          width={191}
          height={60}
          alt="Ballerz"
          className="mx-auto pb-0"
        />
        {/* <h1 className="text-4xl uppercase">Ballerz</h1> */}
        <p className="speech-bubble w-96 text-black p-5 mx-auto mt-0 mb-4"> The Ballerz Playground is a place for technical experiments with Ballerz.
        </p>
        <h3 className="text-2xl">Active Projects</h3>
        <div className="flex flex-wrap justify-center">
        <ul className="text-left border-2 p-5 w-96 center">
          <li>
            <a href="/designer" className="underline">
              Ballerz Designer: Customize your Ballerz
            </a>
         </li>
          </ul>
          </div>
          {/* <h3 className="text-2xl pt-4">Upcoming Projects</h3>
        <div className="flex flex-wrap justify-center">
        <ul className="text-left border-2 p-5 w-96 center">
          <li>
         </li>
          </ul>
          </div> */}
        {/* <p className="speech-bubble w-64 text-xl text-black p-6 mx-auto mt-12">
          Now community owned!
        </p> */}

        <Image
          src="https://ballerz.cloud/images/ballerz/9383/public"
          width={280}
          height={280}
          alt="Baller 9383 - Baller Market Mascot"
          className="mx-auto"
        />
      </header>


        <nav className="font-bold text-center text-lg pb-4">
        <a href="https://ballerz.com" target="_blank">
            Ballerz Official Site 
          </a> 
          <span className="mx-2"> </span>
          <a href="https://x.com/BALLERZ_NFT" target="_blank">
            Twitter 
          </a> 
          <span className="mx-2"> </span>
          <a href="https://discord.gg/qbuMQgTf8K" target="_blank"> Discord 
          </a>
        </nav>
      {/* <section className="text-center mx-auto spotlight">
        <iframe
          src="https://ballerznft.substack.com/embed"
          width="480"
          height="150"
          className="signup"
          frameBorder={0}
          scrolling="no"
        ></iframe>
      </section> */}
    </main>
    </div>
  );
}
