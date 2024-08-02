"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { saveAs } from 'file-saver';

interface Pattern {
  name: string;
  value: string;
}

interface SavedDesign {
  name: string;
  backgroundColor: string;
  pattern: Pattern;
  patternOpacity: number;
  patternScale: number;
  customText: string;
  textColor: string;
  fontSize: number;
  fontFamily: string;
  textRotation: number;
  blendMode: string;
  ballerInput: string;
  imagePosition: { x: number; y: number };
}

const predefinedPatterns: Pattern[] = [
  { name: 'None', value: 'none' },
  { name: 'Dots', value: 'radial-gradient(black 1px, transparent 1px)' },
  { name: 'Lines', value: 'repeating-linear-gradient(45deg, #606dbc, #606dbc 10px, #465298 10px, #465298 20px)' },
];

const fontFamilies = ['Arial', 'Verdana', 'Times New Roman', 'Courier', 'serif', 'sans-serif'];
const blendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion'];

const BackgroundCustomizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');
  const [pattern, setPattern] = useState<Pattern>(predefinedPatterns[0]);
  const [patternOpacity, setPatternOpacity] = useState<number>(1);
  const [patternScale, setPatternScale] = useState<number>(20);
  const [customText, setCustomText] = useState<string>('');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [fontSize, setFontSize] = useState<number>(16);
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [textRotation, setTextRotation] = useState<number>(0);
  const [blendMode, setBlendMode] = useState<string>('normal');
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);

  const [patterns, setPatterns] = useState<Pattern[]>(predefinedPatterns);
  const [ballerInput, setBallerInput] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imagePosition, setImagePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const loadBallerImage = () => {
    if (ballerInput) {
      const url = `https://ballerz.cloud/images/ballerz/${ballerInput}/public`;
      setImageUrl(url);
    }
  };

  const generateCustomPattern = useCallback(() => {
    if (customText) {
      return {
        name: 'Custom Text',
        value: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${fontSize * 10}' height='${fontSize * 2}'%3E%3Ctext x='50%25' y='50%25' fill='${encodeURIComponent(textColor)}' font-size='${fontSize}px' font-family='${encodeURIComponent(fontFamily)}' text-anchor='middle' dominant-baseline='middle' transform='rotate(${textRotation}, ${fontSize * 5}, ${fontSize})'%3E${customText}%3C/text%3E%3C/svg%3E")`
      };
    }
    return null;
  }, [customText, textColor, fontSize, fontFamily, textRotation]);


  const handleImageDrag = (e: React.DragEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setImagePosition({ x, y });
    }
  };



  useEffect(() => {
    const newPattern = generateCustomPattern();
    if (newPattern) {
      setPatterns([...predefinedPatterns, newPattern]);
      setPattern(newPattern);
    } else {
      setPatterns(predefinedPatterns);
    }
  }, [generateCustomPattern]);

  const backgroundStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
    backgroundImage: pattern.value !== 'none' ? pattern.value : 'none',
    backgroundSize: `${patternScale * 10}px ${patternScale * 2}px`,
    backgroundRepeat: 'repeat',
    opacity: patternOpacity,
    mixBlendMode: blendMode as any,
    position: 'relative',
    overflow: 'hidden',
  };
  const imageStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${imagePosition.x}px`,
    top: `${imagePosition.y}px`,
    maxWidth: '100%',
    maxHeight: '100%',
    cursor: 'move',
  };

  const saveDesign = () => {
    const designName = prompt('Enter a name for this design:');
    if (designName) {
      const newDesign: SavedDesign = {
        name: designName,
        backgroundColor,
        pattern,
        patternOpacity,
        patternScale,
        customText,
        textColor,
        fontSize,
        fontFamily,
        textRotation,
        blendMode,
        ballerInput,
        imagePosition,
      };
      setSavedDesigns([...savedDesigns, newDesign]);
    }
  };

  const loadDesign = (design: SavedDesign) => {
    setBackgroundColor(design.backgroundColor);
    setPattern(design.pattern);
    setPatternOpacity(design.patternOpacity);
    setPatternScale(design.patternScale);
    setCustomText(design.customText);
    setTextColor(design.textColor);
    setFontSize(design.fontSize);
    setFontFamily(design.fontFamily);
    setTextRotation(design.textRotation);
    setBlendMode(design.blendMode);
    setBallerInput(design.ballerInput);
    setImageUrl(`https://ballerz.cloud/images/ballerz/${design.ballerInput}/public`);
    setImagePosition(design.imagePosition);
  };

  const exportBackground = () => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">
        <defs>
          <pattern id="bg-pattern" patternUnits="userSpaceOnUse" width="${patternScale * 10}" height="${patternScale * 2}">
            <image href="${pattern.value}" width="${patternScale * 10}" height="${patternScale * 2}" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="${backgroundColor}" />
        <rect width="100%" height="100%" fill="url(#bg-pattern)" opacity="${patternOpacity}" style="mix-blend-mode: ${blendMode};" />
      </svg>
    `;
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    // saveAs(blob, 'background.svg');
  };


  const downloadPreview = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw pattern
    if (pattern.value !== 'none') {
      const patternImage = new Image();
      patternImage.onload = () => {
        const patternCanvas = document.createElement('canvas');
        patternCanvas.width = patternScale * 10;
        patternCanvas.height = patternScale * 2;
        const patternCtx = patternCanvas.getContext('2d');
        if (patternCtx) {
          patternCtx.drawImage(patternImage, 0, 0, patternCanvas.width, patternCanvas.height);
          const pat = ctx.createPattern(patternCanvas, 'repeat');
          if (pat) {
            ctx.globalAlpha = patternOpacity;
            ctx.fillStyle = pat;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;
          }
        }

        // Draw baller image
        if (imageUrl) {
          const ballerImage = new Image();
          ballerImage.onload = () => {
            ctx.drawImage(ballerImage, imagePosition.x, imagePosition.y);
            
            // Convert canvas to image and download
            canvas.toBlob((blob) => {
              if (blob) {
                // saveAs(blob, 'background_preview.png');
              }
            });
          };
          ballerImage.src = imageUrl;
        } else {
          // If there's no baller image, download immediately
          canvas.toBlob((blob) => {
            if (blob) {
              // saveAs(blob, 'background_preview.png');
            }
          });
        }
      };
      patternImage.src = pattern.value;
    } else {
      // If there's no pattern, just draw the baller image (if any) and download
      if (imageUrl) {
        const ballerImage = new Image();
        ballerImage.onload = () => {
          ctx.drawImage(ballerImage, imagePosition.x, imagePosition.y);
          canvas.toBlob((blob) => {
            if (blob) {
              // saveAs(blob, 'background_preview.png');
            }
          });
        };
        ballerImage.src = imageUrl;
      } else {
        // If there's no baller image either, download immediately
        canvas.toBlob((blob) => {
          if (blob) {
            // saveAs(blob, 'background_preview.png');
          }
        });
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Background Customizer</h2>
      <div className="mb-4">
        <label className="block mb-2">Baller Image:</label>
        <input 
          type="text" 
          value={ballerInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBallerInput(e.target.value)}
          className="p-2 border rounded mr-2"
          placeholder="Enter baller number"
        />
        <button onClick={loadBallerImage} className="bg-blue-500 text-white px-4 py-2 rounded">
          Load Image
        </button>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Background Color:</label>
        <input 
          type="color" 
          value={backgroundColor} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBackgroundColor(e.target.value)}
          className="p-1 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Pattern:</label>
        <select 
          value={pattern.name}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
            setPattern(patterns.find(p => p.name === e.target.value) || patterns[0])
          }
          className="p-2 border rounded"
        >
          {patterns.map((p) => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Custom Text Pattern:</label>
        <input 
          type="text" 
          value={customText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomText(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Enter text for custom pattern"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Text Color:</label>
        <input 
          type="color" 
          value={textColor} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextColor(e.target.value)}
          className="p-1 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Font Size:</label>
        <input 
          type="range" 
          min="8" 
          max="72" 
          value={fontSize}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFontSize(parseInt(e.target.value))}
          className="w-full"
        />
        <span>{fontSize}px</span>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Pattern Opacity:</label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.1"
          value={patternOpacity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPatternOpacity(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Pattern Scale:</label>
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={patternScale}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPatternScale(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Font Family:</label>
        <select 
          value={fontFamily}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFontFamily(e.target.value)}
          className="p-2 border rounded"
        >
          {fontFamilies.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Text Rotation:</label>
        <input 
          type="range" 
          min="0" 
          max="360" 
          value={textRotation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextRotation(parseInt(e.target.value))}
          className="w-full"
        />
        <span>{textRotation}°</span>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Blend Mode:</label>
        <select 
          value={blendMode}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBlendMode(e.target.value)}
          className="p-2 border rounded"
        >
          {blendModes.map((mode) => (
            <option key={mode} value={mode}>{mode}</option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Preview:</h3>
        <div 
          className="w-full h-64 border rounded relative"
          style={backgroundStyle}
        >
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Baller"
              style={imageStyle}
              draggable
              onDragEnd={handleImageDrag}
            />
          )}
        </div>
        <canvas 
          ref={canvasRef} 
          width="1000" 
          height="1000" 
          style={{ display: 'none' }}
        ></canvas>
      </div>

      <div className="mt-4">
        <button onClick={saveDesign} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save Design</button>
        <button onClick={exportBackground} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Export as SVG</button>
        <button onClick={downloadPreview} className="bg-purple-500 text-white px-4 py-2 rounded">Download Preview</button>
      </div>

   

      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Saved Designs:</h3>
        <ul>
          {savedDesigns.map((design, index) => (
            <li key={index} className="mb-2">
              <button onClick={() => loadDesign(design)} className="bg-gray-200 px-2 py-1 rounded">
                {design.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BackgroundCustomizer;