import React, { useRef, useEffect, useState, useCallback } from 'react';
import '../css/ColoringSketch.css';

const ColoringSketch = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(5);
  const [selectedSketch, setSelectedSketch] = useState(0);
  const [showColorPalette, setShowColorPalette] = useState(true);
  const [tool, setTool] = useState('brush'); // brush, eraser, fill

  // Pre-defined sketches (simple line drawings)
  const sketches = [
    {
      id: 0,
      name: 'Flower',
      data: 'M200,100 Q220,50 250,80 Q280,50 300,100 Q320,150 300,200 Q280,250 250,220 Q220,250 200,200 Q180,150 200,100 Z M250,150 L250,250 M230,180 L270,180 M230,210 L270,210'
    },
    {
      id: 1,
      name: 'Star',
      data: 'M250,50 L270,150 L370,150 L290,220 L320,320 L250,250 L180,320 L210,220 L130,150 L230,150 Z'
    },
    {
      id: 2,
      name: 'Heart',
      data: 'M250,180 Q220,150 190,180 Q160,210 190,240 L250,300 L310,240 Q340,210 310,180 Q280,150 250,180 Z'
    },
    {
      id: 3,
      name: 'House',
      data: 'M150,250 L250,150 L350,250 L350,350 L150,350 Z M250,150 L250,100 M200,200 L200,250 M300,200 L300,250 M230,300 L270,300'
    },
    {
      id: 4,
      name: 'Tree',
      data: 'M250,300 L250,200 M200,220 Q250,180 300,220 M220,240 Q250,210 280,240 M240,260 Q250,240 260,260'
    },
    {
      id: 5,
      name: 'Butterfly',
      data: 'M250,200 Q200,150 150,200 Q200,180 250,200 Q300,180 350,200 Q300,150 250,200 M250,200 L250,280 M220,240 L280,240'
    }
  ];

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#FFD93D', '#6BCF7F', '#C06BF0', '#FF8CC8', '#95E1D3',
    '#F38181', '#AA96DA', '#8FCACA', '#FFB6B9', '#FECA57',
    '#48C9B0', '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71',
    '#000000', '#FFFFFF', '#808080', '#A0522D', '#FFE4B5'
  ];

  const brushSizes = [2, 5, 10, 15, 20];

  const drawSketch = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const sketch = sketches[selectedSketch];
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the sketch
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    const paths = sketch.data.split('M').filter(path => path.trim());
    
    paths.forEach(path => {
      if (path.trim()) {
        const points = path.match(/(\d+),(\d+)/g);
        if (points && points.length > 0) {
          ctx.beginPath();
          const firstPoint = points[0].split(',');
          ctx.moveTo(parseInt(firstPoint[0]), parseInt(firstPoint[1]));
          
          for (let i = 1; i < points.length; i++) {
            const point = points[i].split(',');
            ctx.lineTo(parseInt(point[0]), parseInt(point[1]));
          }
          
          ctx.stroke();
        }
      }
    });
  }, [selectedSketch, sketches]);

  useEffect(() => {
    drawSketch();
  }, [drawSketch]);

  const startDrawing = (e) => {
    if (tool === 'fill') {
      fillArea(e);
      return;
    }
    
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || tool === 'fill') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
    }
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const fillArea = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const targetColor = getPixelColor(imageData, x, y);
    const fillColor = hexToRgb(currentColor);
    
    if (colorsMatch(targetColor, fillColor)) return;
    
    floodFill(imageData, x, y, targetColor, fillColor);
    ctx.putImageData(imageData, 0, 0);
  };

  const getPixelColor = (imageData, x, y) => {
    const index = (y * imageData.width + x) * 4;
    return {
      r: imageData.data[index],
      g: imageData.data[index + 1],
      b: imageData.data[index + 2],
      a: imageData.data[index + 3]
    };
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: 255
    } : null;
  };

  const colorsMatch = (color1, color2) => {
    return color1.r === color2.r && color1.g === color2.g && 
           color1.b === color2.b && color1.a === color2.a;
  };

  const floodFill = (imageData, startX, startY, targetColor, fillColor) => {
    const stack = [[startX, startY]];
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    
    while (stack.length > 0) {
      const [x, y] = stack.pop();
      
      if (x < 0 || x >= width || y < 0 || y >= height) continue;
      
      const index = (y * width + x) * 4;
      const currentColor = {
        r: data[index],
        g: data[index + 1],
        b: data[index + 2],
        a: data[index + 3]
      };
      
      if (!colorsMatch(currentColor, targetColor)) continue;
      
      data[index] = fillColor.r;
      data[index + 1] = fillColor.g;
      data[index + 2] = fillColor.b;
      data[index + 3] = fillColor.a;
      
      stack.push([x + 1, y]);
      stack.push([x - 1, y]);
      stack.push([x, y + 1]);
      stack.push([x, y - 1]);
    }
  };

  const clearCanvas = () => {
    drawSketch();
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `coloring-${sketches[selectedSketch].name}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="coloring-sketch-container">
      <div className="coloring-header">
        <h3 className="coloring-title">Creative Coloring Space</h3>
        <p className="coloring-subtitle">Relax and color these beautiful sketches</p>
      </div>

      <div className="coloring-workspace">
        {/* Sketch Selection */}
        <div className="sketch-selector">
          <h4>Choose a Sketch:</h4>
          <div className="sketch-grid">
            {sketches.map((sketch, index) => (
              <button
                key={sketch.id}
                className={`sketch-btn ${selectedSketch === index ? 'active' : ''}`}
                onClick={() => setSelectedSketch(index)}
              >
                {sketch.name}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width={500}
            height={400}
            className="coloring-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>

        {/* Tools Panel */}
        <div className="tools-panel">
          {/* Tool Selection */}
          <div className="tool-selector">
            <h4>Tools:</h4>
            <div className="tool-buttons">
              <button
                className={`tool-btn ${tool === 'brush' ? 'active' : ''}`}
                onClick={() => setTool('brush')}
              >
                🖌️ Brush
              </button>
              <button
                className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
                onClick={() => setTool('eraser')}
              >
                🧹 Eraser
              </button>
              <button
                className={`tool-btn ${tool === 'fill' ? 'active' : ''}`}
                onClick={() => setTool('fill')}
              >
                🪣 Fill
              </button>
            </div>
          </div>

          {/* Color Palette */}
          <div className="color-palette-section">
            <div className="palette-header">
              <h4>Colors:</h4>
              <button
                className="toggle-palette-btn"
                onClick={() => setShowColorPalette(!showColorPalette)}
              >
                {showColorPalette ? 'Hide' : 'Show'}
              </button>
            </div>
            {showColorPalette && (
              <div className="color-palette">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`color-btn ${currentColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrentColor(color)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Brush Size */}
          <div className="brush-size-section">
            <h4>Brush Size:</h4>
            <div className="brush-sizes">
              {brushSizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${brushSize === size ? 'active' : ''}`}
                  onClick={() => setBrushSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="action-btn clear-btn" onClick={clearCanvas}>
              🔄 Clear
            </button>
            <button className="action-btn download-btn" onClick={downloadImage}>
              💾 Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColoringSketch;
