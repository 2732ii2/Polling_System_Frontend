import React, { useEffect, useRef } from 'react';

const BorderColorDetector = ({ imageSrc, borderThickness }) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      canvas.width = img.width;
      
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const borderColors = getBorderColors(ctx, img.width, img.height, borderThickness);
      console.log('Border Colors:', borderColors);
    };
  }, [imageSrc, borderThickness]);

  const getBorderColors = (ctx, width, height, thickness) => {
    const topBorderColors = ctx.getImageData(0, 0, width, thickness).data;
    const bottomBorderColors = ctx.getImageData(0, height - thickness, width, thickness).data;
    const leftBorderColors = ctx.getImageData(0, 0, thickness, height).data;
    const rightBorderColors = ctx.getImageData(width - thickness, 0, thickness, height).data;

    const extractColors = (data, length) => {
      const colors = [];
      for (let i = 0; i < length; i += 4) {
        colors.push(`rgba(${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${data[i + 3] / 255})`);
      }
      return colors;
    };

    return {
      top: extractColors(topBorderColors, topBorderColors.length),
      bottom: extractColors(bottomBorderColors, bottomBorderColors.length),
      left: extractColors(leftBorderColors, leftBorderColors.length),
      right: extractColors(rightBorderColors, rightBorderColors.length),
    };
  };

  return (
    <div>
      <img ref={imgRef} src={imageSrc} alt="Border detection" style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ border: '1px solid black' }}></canvas>
    </div>
  );
};

export default BorderColorDetector;
