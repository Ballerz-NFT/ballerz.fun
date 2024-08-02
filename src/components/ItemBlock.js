import PropTypes from 'prop-types';
import { useRef, useEffect,useState} from "react";

import { motion } from "framer-motion"
export default function ItemBlock({src,id, alt,width,height,className}) {
    // console.log(image)
  
      function changeBackground(e) {
        e.target.style.background = 'red';
      }
  
      function shareInfo(e){
       
        return e.target.id
      }
      const [color, setColor] = useState('blue')
      useEffect(() => setColor('red'), [])
    return(
        
        <div className=''>
            <motion.button
    whileHover={{ scale: 1.5}}
    whileTap={{ scale: 0.9 }}
    onClick={shareInfo}
  >
        <img
        // key={`${key}`} 
        id={`${id}`}
        src={`${src}`}
        alt={`${alt}`}
        width={`${width}`}
        height={`${height}`}
        className={`${className}`}
   
        // onMouseEnter={onEnter} 
        // onMouseLeave={onLeave}
        >
        </img>
        </motion.button>
       </div>
    )
}

ItemBlock.propTypes = {
    img: PropTypes.string,
    className: PropTypes.string,
  };