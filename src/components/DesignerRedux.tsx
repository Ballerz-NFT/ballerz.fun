"use client";
/* eslint-disable @next/next/no-img-element */
//vercel deployment
import { useState,useEffect, useRef } from "react";
import Image from "next/image";
import { RadioGroup } from "@headlessui/react";
// import { CheckCircleIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion"
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";
// import * as download from "downloadjs";
import Triangle from "@/components/Triangle";

import { layers } from "@/data/layers.js";
import ItemBlock from "@/components/ItemBlock";
import { stringify } from "querystring";
// import LayerFeedback from "./LayerFeedback";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }


export default function DesignerRedux() {
      // Ballerz
  const [ballerInput, setBallerInput] = useState("1234");
  const [selectedBaller, setSelectedBaller] = useState<number>(0);
  const [selectedBallerImg, setSelectedBallerImg] = useState<string>("/img/0.png");
  const [selectedZoomType, setSelectedZoomType] = useState<boolean>(false)
  const [selectedShiftMode, setSelectedShiftMode] = useState("NONE")
  const [yPosOffset, setYposOffset] = useState(0)
  const [xPosOffset, setXposOffset] = useState(0)
  const [accyPosOffset, setaccYposOffset] = useState(0)
  const [accxPosOffset, setaccXposOffset] = useState(0)


  interface BallerStageProps {
    isZoomed: boolean;
    selectedBallerImg: string;
    selectedBaller: number;
    selectedZoomType: boolean;
  }
useEffect(() => {   
  setSelectedBallerImg(
    `https://ballerz.cloud/images/ballerz/${ballerInput}/public`
  );
}   , [ballerInput]);

  const BallerStage: React.FC<BallerStageProps> = ({ isZoomed, selectedBallerImg, selectedBaller, selectedZoomType }) => {
    return ( 

  <div className="sticky top-0">
    
  <div className={`${selectedZoomType ?  ' debug1' : ' debug3'}`}>{` ballerz ${selectedZoomType} `}
 <div className="flex flex-row border-2 bg-green-200 ">
<div className="border-2 bg-red-200 ">
    this
</div>  
<div className="border-2 bg-blue-400 ">
    is 
</div>  
<div className="border-2 bg-green-600 ">
    cool 
</div>    
</div>
 <div className="border-2 bg-sky-900 "> 

  <div className="border-2 bg-sky-900  ">
  <img
    src={selectedBallerImg}
    className="border-0 ballerz bg-green-800 sticky top-0"
    alt={`Ballerz #${selectedBaller}`}
    width="200"
    height="200"
    style={{
      zIndex: 500,
    //   top: "10%",
    //   left: "50%",
    // //   scale: selectedZoomType ?  '200%' :'100%',
    // //   transform: "translate(-50%, -50%)",
    }}

  />
  </div>
  </div>
  </div>
  </div>
    )
  }

    return(
      <div>
      <h1>Designer Redux</h1>
      <div className="">
        <BallerStage isZoomed={selectedZoomType} selectedBallerImg={selectedBallerImg} selectedBaller={selectedBaller} selectedZoomType={selectedZoomType} />
      </div>
      <div className="flex flex-row border-2 bg-green-200 sticky top-0 z-20">
        THIS SHOULD BE STICKY
      </div>
    </div>
    )

} 
