"use client";
/* eslint-disable @next/next/no-img-element */
//vercel deployment
import { useState,useEffect, useRef } from "react";
import Image from "next/image";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion"
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";
import * as download from "downloadjs";
import Triangle from "@/components/Triangle";

import { layers } from "@/data/layers.js";
import ItemBlock from "@/components/ItemBlock";
// import LayerFeedback from "./LayerFeedback";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function DesigneOld() {
  //-------------------------------
  // STATE
  //-------------------------------
  const [color, setColor] = useState('blue')
  useEffect(() => setColor('red'), [])
  // Ballerz
  const [ballerInput, setBallerInput] = useState("");
  const [selectedBaller, setSelectedBaller] = useState(0);
  const [selectedBallerImg, setSelectedBallerImg] = useState("/img/0.png");
  const [selectedZoomType, setSelectedZoomType] = useState(false)
  const [selectedShiftMode, setSelectedShiftMode] = useState("NONE")
  const [yPosOffset, setYposOffset] = useState(0)
  const [xPosOffset, setXposOffset] = useState(0)
  const [accyPosOffset, setaccYposOffset] = useState(0)
  const [accxPosOffset, setaccXposOffset] = useState(0)


  var isZoomed=false
  const zoomedStyle ={
    overflow: "hidden",
    top: "50%", 
  left: "50%",
  scale: "200%",
  transform: "translate(-50%, -50%)"
 }   
  const unZoomedStyle = {
    overflow: "hidden",
    top: "50%", 
  left: "50%",
  scale: "100%",
  transform: "translate(-50%, -50%)"
 }   


  function handleBallerInputChange(e) {
    setBallerInput(e.target.value);
  }
  function toggleStyle(){
    if(isZoomed){
      isZoomed = false 
    } else {
      isZoomed = true
    }
    
    setSelectedZoomType(isZoomed)
    // console.log("ZOOMED: ",isZoomed , " : ", selectedZoomType)
  }
  const BallerIntro =({className, selectedBaller}) => {
    var bText=selectedBaller ?  "Customize your Baller": "Choose a Baller" 
    var bbText=selectedBaller ?  "The possibilities are endless make it your own.": "Select a Baller you want to customize." 
    
    return(
      <div>
  
    {/* <h3 className="mb-4 text-4xl font-bold text-center "> */}
    
    <h3 className={`${className} "mb-4 text-4xl font-bold text-center " `}>
   {bText}
  </h3>
  <p className="pb-2 text-center">{bbText}</p>
    
    </div>
    )
  }
  const BallerStage =({ isZoomed, selectedBallerImg,selectedBaller,selectedZoomType}) => {
    return ( 

  <div>
    
  <div className={`${selectedZoomType ?  ' debug1' : ' debug3'}`}>{` ballerz ${selectedZoomType} `}
  <img
    src={selectedBallerImg}
    className="border-0 ballerz"
    alt={`Ballerz #${selectedBaller}`}
    width="200"
    height="200"
    style={{
      zIndex: 500,
      top: "10%",
      left: "50%",
      scale: selectedZoomType ?  '200%' :'100%',
      transform: "translate(-50%, -50%)",
    }}

  />
  </div>
  </div>
    )
  }
  function handleSubmit(e) {
    setYposOffset(0)
    setXposOffset(0)
    setaccXposOffset(0)
    setaccYposOffset(0)
    e.preventDefault();
    setSelectedBaller(ballerInput);
    setSelectedBallerImg(
      `https://ballerz.cloud/images/ballerz/${ballerInput}/public`
    );
  }

  // Design

  // default: {borders: 0, accessories: 0, backgrounds: 0}
  const designDefaults = Object.assign(
    {},
    ...layers.map((layer) => ({ [layer["slug"]]: 1 }))
  );
  function handleSelectedShiftMode(e){
    switch (selectedShiftMode){
      case "NONE":
        setSelectedShiftMode("BALLER")
      break; 
      case "BALLER":
        setSelectedShiftMode("ITEM")
        break; 
        case "ITEM":
          setSelectedShiftMode("NONE")
          break; 

    }
   console.log(selectedShiftMode)
  }
  function handleBorders(e){
    var sLayer =0
    setSelectedLayer(sLayer)
    const selectedItem = design[layers[sLayer]["slug"]];
    const items = layers[sLayer]["items"];
    
    setDesign({
      ...design,
      [layers[sLayer]["slug"]]:
        items[(e.target.id) % items.length]["id"],
    });
 
  }
  function handleBackgrounds(e){
    var sLayer = 2
    setSelectedLayer(sLayer )
    const selectedItem = design[layers[sLayer ]["slug"]];
    const items = layers[sLayer ]["items"];
    console.log(" TARGET ID :",e.target.id, "  : " , items.length, " : " ,(e.target.id) % items.length )
    setDesign({
      ...design,
      [layers[sLayer ]["slug"]]:
        items[(e.target.id) % items.length]["id"],
    });
    // console.log(items, " <<<< >>> ")
  }
  function handleAccessories(e){
    var sLayer = 1
    setSelectedLayer(sLayer)
    const selectedItem = design[layers[sLayer]["slug"]];
    const items = layers[sLayer]["items"];
    setDesign({
      ...design,
      [layers[sLayer]["slug"]]:
        items[(e.target.id) % items.length]["id"],
    });
 
  }

  const [design, setDesign] = useState(designDefaults);
  
  const handleChange = (event) => {
    setDesign({ ...design, [event.target.name]: Number(event.target.value) });
  };

  // Layers
  const [selectedLayer, setSelectedLayer] = useState(1);

  function handleChangeLayer(event) {
    setSelectedLayer(Number(event.target.value));
  }

  // D-Pad
  function handleMouseDown(event) {
    const dir = event.currentTarget.id;
    if(selectedShiftMode =="BALLER"){
      console.log(selectedBaller , " : Baller :  " , yPosOffset)
      switch (dir) {
        case "up":
          setYposOffset(yPosOffset-1)
          break;
        case "down":
          setYposOffset(yPosOffset+1)
          break;
        case "left":
          setXposOffset(xPosOffset-1)
          break;
        case "right":
          setXposOffset(xPosOffset+1)
          break;
      }
    }
   // SHOULD ADD A DRAG BALL IN MIDDLE OF PAD FOR QUICK MOVEING GAME LIKE ADJUSTMENTS 
   if(selectedShiftMode =="ITEM"){
    switch (dir) {
      case "up":
        setaccYposOffset(accyPosOffset-1)
        break;
      case "down":
        setaccYposOffset(accyPosOffset+1)
        break;
      case "left":
        setaccXposOffset(accxPosOffset-1)
        break;
      case "right":
        setaccXposOffset(accxPosOffset+1)
        break;
    }
  }
  }
  function handleMouseLeave(event) {
    
  }
  function handleDpadClick(event) {
    const dir = event.currentTarget.id;

    const selectedItem = design[layers[selectedLayer]["slug"]];
    const items = layers[selectedLayer]["items"];
    if(selectedShiftMode =="NONE"){
    switch (dir) {
      case "up":
        setSelectedLayer(
          layers[selectedLayer === 0 ? layers.length - 1 : selectedLayer - 1][
            "id"
          ]
        );
        break;
      case "down":
        setSelectedLayer(layers[(selectedLayer + 1) % layers.length]["id"]);
        break;
      case "left":
        setDesign({
          ...design,
          [layers[selectedLayer]["slug"]]:
            items[selectedItem === 0 ? items.length - 1 : selectedItem - 1][
              "id"
            ],
        });
        break;
      case "right":
        setDesign({
          ...design,
          [layers[selectedLayer]["slug"]]:
            items[(selectedItem + 1) % items.length]["id"],
        });
        break;
    }
  }
  // IF THIS IS ZOOMED IN THE MOVEMENT SHOULD BE DOUBLED 
  if(selectedShiftMode =="BALLER"){
    console.log(selectedBaller , " : Baller :  " , yPosOffset)
    switch (dir) {
      case "up":
        setYposOffset(yPosOffset-1)
        break;
      case "down":
        setYposOffset(yPosOffset+1)
        break;
      case "left":
        setXposOffset(xPosOffset-1)
        break;
      case "right":
        setXposOffset(xPosOffset+1)
        break;
    }
  }
 // SHOULD ADD A DRAG BALL IN MIDDLE OF PAD FOR QUICK MOVEING GAME LIKE ADJUSTMENTS 
 if(selectedShiftMode =="ITEM"){
  switch (dir) {
    case "up":
      setaccYposOffset(accyPosOffset-1)
      break;
    case "down":
      setaccYposOffset(accyPosOffset+1)
      break;
    case "left":
      setaccXposOffset(accxPosOffset-1)
      break;
    case "right":
      setaccXposOffset(accxPosOffset+1)
      break;
  }
}


  }

  //-------------------------------
  // HANDLE DOWNLOAD
  //-------------------------------

  // Download
  function handleClickDownload() {
    htmlToImage
    .toPng(document.getElementById("stage"))
    .then(function (dataUrl) {
      download(dataUrl, "ballerz-designer.png");
    })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }
 
  return (
    <div>
      <BallerIntro className="" selectedBaller={selectedBaller} />
      {/*--------------
        | SELECT BALLER
        --------------*/}
      <form className="mb-6 ballerSelector" onSubmit={handleSubmit}>
        <label className="block">Baller Number</label>

        <input
          name="ballerNumber"
          type="text"
          value={ballerInput}
          minLength="1"
          maxLength="4"
          placeholder="Baller #"
          onChange={handleBallerInputChange}
          className="inline-block mr-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <button
          onClick={handleSubmit}
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Go
        </button>
      </form>

     {/* Ideally we move 
     all this big blocks
      into separate components */}
{/* <LayerFeedback className="debug2"></LayerFeedback> */}
<div className={selectedBaller ? "flex" : "hidden" }>   
            
  <div className="flex-auto w-64">

  </div>
  <div className="flex-none w-[400px]">
  <div className="mx-auto mb-4 border-b-4 border-black designSelectors">
          {/*-------------
            | SELECT LAYER
            -------------*/}
          <select
            id="layer"
            name="layer"
            value={selectedLayer}
            onChange={handleChangeLayer}
            className="block pb-0 pl-0 text-sm text-blue-500 uppercase bg-transparent border-none bg-none"
          >
            {layers.map((layer) => (
              <option
                key={layer.id}
                id={layer.slug}
                name={layer.slug}
                value={layer.id}
              >
                {layer.name}
              </option>
            ))}
          </select>

          {/*-------------
            | SELECT ITEMS
            -------------*/}
          {layers.map((layer) => (
            <select
              key={layer.id}
              id={layer.slug}
              name={layer.slug}
              value={design[layer.slug]}
              onChange={handleChange}
              className={classNames(
                selectedLayer === layer.id ? "" : "hidden",
                "block pl-0 border-none bg-transparent text-2xl font-bold appearance-none bg-none"
              )}
            >
              {layer.items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          ))}
        </div>
  </div>
  <div className="flex-auto w-64 ">

  </div>
</div>
<div className={selectedBaller ? "flex " : "hidden"}>   
  <div className="flex-auto w-64 ">
  
  <p className="px-2">Borders</p>
  <div  className="grid grid-cols-4 z-biggy" >
              
              {
                layers[0]["items"].map((value, index) => 
              // borderItems.map((value, index) => 
                <div
                key={`${value.set}-${value.id}`}
                onClick={handleBorders}>
                    <ItemBlock
                    
                    id={index}
                    src={`/img/layers/borders/${index}.png`}
                    width="100"
                    alt={`bord ${index}`}
                    height="100"
                    className="border-0 bg-gradient-to-b from-indigo-50 to-white"
                  />
              </div>
                  )} 
                        
              </div>          
    Backgrounds Party 
              <div  className="grid grid-cols-4 z-biggy rounded-md">
   
              {layers[2]["items"].map((value, index) => 
              
                <div
                key={`${value.set}-${value.id}`}
                onClick={handleBackgrounds}>
                    <ItemBlock
                    // key={`${value.set}-${value.id}`}
                    id={index}
                    src={`/img/layers/backgrounds/${index}.png`}
                    width="100"
                    alt={`bg ${index}`}
                    height="100"
                    className="border-0 rounded-md p-0"
                  /> 
                  {/* <div> {value.id}</div> */}
        </div>

                  )}
                        
              </div>   
  </div>
  <div className="flex-none w-[400px] ">
 {/*----------
          | STAGE
          ----------*/}
  
  <div id="stage" className="overflow-hidden stage ">
  <motion.div
  animate={{
    x: 0,
    scale:1,   
    rotate: 0,
  }}
>
  <img
    src={selectedBallerImg}
    className={`border-0 ballerz`}
    alt={`Ballerz #${selectedBaller}`}
    width="200"
    height="200"
  
    style={!selectedZoomType? {
      zIndex: 500,
      // top: "59.2%",
      top:(59.2+yPosOffset) +"%",
      // left: "51.5%",
      left:(51.5+xPosOffset) +"%",

      transform: "translate(-50%, -50%)",
    }:
    {
      zIndex: 500,
      // top: "75%",
      top: (75+yPosOffset) +"%",
      // left: "75%",
      left:(75+xPosOffset) +"%",
      scale: "200%",
      transform: "translate(-50%, -50%)",
    }

  }

  />
  </motion.div>

  {
  layers.map((layer) => (
    // key={layer}
    <img 
      key={layer.id}
      src={`/img/layers/${layer.slug}/${design[layer.slug]}.png`}
      // src={`/img/layers/borders/${design[layer.slug]}.png`}
      ///change this state so it works. ${isZoomed ?  'scale-50' : 'scale-150'}`
      className={`${layer.slug} "overflow-hidden" `} 
      alt={`${layer.name}: ${
        layer["items"].find((item) => item.id === design[layer.slug])[
          "name"
        ]
      }`}
      width="400"
      height="400"
      //FIX THIS SO layer.zIndex can be dynanic
    // style={isZoomed ?  zoomedStyle :unZoomedStyle}


    style={selectedZoomType && layer.slug == "accessories" ?
   {
    overflow: "hidden",
 zIndex: layer.zIndex,
  //   top: "81%", 
  // left: "97%",
  top: (accyPosOffset),
  left:(accxPosOffset),
//   top: (50+accyPosOffset) +"%",
// left:(50+accxPosOffset) +"%",
  scale: "100%",
  // transform: "translate(-50%, -50%) ",
  transformOrigin: "center center"
 } : layer.slug == "accessories" ?
 { 
  overflow: "hidden",
zIndex: layer.zIndex,
//   top: "50%", 
// left: "50%",
// top: (136+accyPosOffset),
// left:(106+accxPosOffset),
// top: "50%", 
// left: "50%",
top: (140+accyPosOffset),
left:(106+ accxPosOffset),
scale: "50%",
transform: "translate(-50%, -50%) ",
// transformOrigin: "center center"
} : {
  overflow: "hidden",
  zIndex: layer.zIndex,
    top: "50%", 
  left: "50%",
  scale: "100%",
  transform: "translate(-50%, -50%)" 
}
 }
    />
 )
 )

}
{/* /////// */}

{/* /////// */}

      </div>
      {/* <DPAD></DPAD> */}
      <div className="text-center">
        <div className="flex flex-row">  
        <div className="w-1/2 py-2 hidden">
     y:{accyPosOffset} 
     x:{accxPosOffset}
     </div>
     <div className="w-1/2 py-2 hidden">
      y50:{50+accyPosOffset} 
     x50:{50+accxPosOffset}
     </div>
     </div>
     <div className="flex flex-row">
        <div className="w-1/2 py-2 ">
      <motion.button
            onClick={toggleStyle}
            type="button"
            className="px-2 py-2 text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               whileHover={{ scale: 1}}
              whileTap={{ scale: 1.1 }}
              whileInView={{ scale:1 }}
            >    TOGGLE ZOOM
              </motion.button>  
              </div>
              <div className="w-1/2 py-2 ">
              <motion.button
            // onClick={toggleStyle}
            type="button"
            className="px-2 py-2 text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               whileHover={{ scale: 1}}
              whileTap={{ scale: 1.1 }}
              whileInView={{ scale:1 }}
              onClick={handleSelectedShiftMode}
             
            >    SHIFT: { selectedShiftMode}
              </motion.button> 
            </div>
            </div>
          <div className="grid grid-cols-3 grid-rows-3 mx-auto d-pad">
          <motion.button
               whileHover={{ scale: 1.1}}
              whileTap={{ scale: 0.9 }}
              id="up"
              onClick={handleDpadClick}
              onMouseDown={handleMouseDown}
              
              onMouseLeave={handleMouseLeave}
              className="flex items-center justify-center col-start-2 text-white bg-stone-500"
            >
              <Triangle className="-rotate-90" />
          </motion.button>
          <motion.button
               whileHover={{ scale: 1.1}}
              whileTap={{ scale: 0.9 }}
              id="left"
              onClick={handleDpadClick}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              className="flex items-center justify-center row-start-2 text-white bg-stone-500"
            >
              <Triangle className="-rotate-180" />
              </motion.button>

            <motion.button
               whileHover={{ scale: 1.1}}
              whileTap={{ scale: 0.9 }}
              id="right"
              onClick={handleDpadClick}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              className="flex items-center justify-center col-start-3 row-start-2 text-white bg-stone-500"
            >
              <Triangle />
              </motion.button>

            <motion.button
               whileHover={{ scale: 1.1}}
              whileTap={{ scale: 0.9 }}
              id="down"
              onClick={handleDpadClick}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              className="flex items-center justify-center col-start-2 row-start-3 text-white bg-stone-500"
            >
              <Triangle className="rotate-90" />
              </motion.button>
            
          </div>
  
          {/*----------
            | DOWNLOAD
            ----------*/}
          <button
            onClick={handleClickDownload}
            type="button"
            className="py-2 mt-10 text-white bg-black px-14 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Download
          </button>
          
          <ItemBlock src="/img/layers/accessories/5.png" width="100" height="100" ></ItemBlock>
        </div>
  </div>
  <div className="flex-auto w-64 px-2 h-400 w-400">
 <p className=""> Accessories </p>
  {/* 7777 */}
  <div  className="grid grid-cols-4 z-biggy ">

              {layers[1]["items"].map((value, index) => 
              
                      <div
                      key={`${value.set}-${value.id}`}
                      onClick={handleAccessories}>
                    <ItemBlock

                    // key={value}
                    id={index}
                    src={`/img/layers/accessories/${index}.png`}
                    width="100"
                    alt={`ok ${index}`}
                    height="100"
                    className="flex-auto border-2 bg-gradient-to-b from-indigo-50 to-white "
                 

                  
                  />
           </div>
                  )}
                        
              </div> 
  </div>
</div>
      <div id="designer" className={selectedBaller ? " " : "hidden"}>  
       
      <div className="relative left-0 place-content-center">
             
          </div>  
      
        {/*----------
          | D-PAD
          ----------*/}
        {/* <DPAD></DPAD> */}
      
      </div>
    </div>
  );
}