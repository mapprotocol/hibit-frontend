import React, { useEffect, useRef, useState } from 'react';

interface CylinderCanvasProps {
    price: number;
    initialPrice: number;
}

const CylinderCanvas: React.FC<CylinderCanvasProps> = ({ price, initialPrice }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [currentPrice, setCurrentPrice] = useState(price);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const rectWidth = 100;
        const rectHeight = 300;
        const rectDepth = 100; // z 轴长度
        const baseX = 400;
        const baseY = height / 2;
        const midX = rectWidth;
        const midY = rectHeight / 2;

        const clearCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };

        const draw3DRectangle = (currentPrice: number, initialPrice: number) => {
            clearCanvas();
            ctx.save();

            ctx.translate(width / 2, height / 2);

            // Calculate price offset
            const priceOffset = ((currentPrice - initialPrice) / initialPrice) * (midY);

            // Draw the white base rectangle
            ctx.beginPath();
            ctx.moveTo(baseX, baseY - midY); // top-left
            ctx.lineTo(baseX + rectWidth, baseY - midY); // top-right
            ctx.lineTo(baseX + rectWidth, baseY + midY); // bottom-right
            ctx.lineTo(baseX, baseY + midY); // bottom-left
            ctx.closePath();
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();

            // Draw the top rect platform (3D perspective)
            ctx.beginPath();
            ctx.moveTo(baseX, baseY - midY); // top-left
            ctx.lineTo(baseX + rectWidth, baseY - midY); // top-right
            ctx.lineTo(baseX + rectWidth + rectDepth / 2, baseY - midY - rectDepth / 2); // top-right depth
            ctx.lineTo(baseX + rectDepth / 2, baseY - midY - rectDepth / 2); // top-left depth
            ctx.closePath();
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();

            // Draw the side rect face (3D perspective)
            ctx.beginPath();
            ctx.moveTo(baseX + rectWidth, baseY - midY); // top-right
            ctx.lineTo(baseX + rectWidth + rectDepth / 2, baseY - midY - rectDepth / 2); // top-right depth
            ctx.lineTo(baseX + rectWidth + rectDepth / 2, baseY + midY - rectDepth / 2); // bottom-right depth
            ctx.lineTo(baseX + rectWidth, baseY + midY); // bottom-right
            ctx.closePath();
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();

            // Top part (green if price increases)
            if (priceOffset > 0) {
                ctx.beginPath();
                ctx.moveTo(baseX, baseY - midY - priceOffset); // top-left
                ctx.lineTo(baseX + rectWidth, baseY - midY - priceOffset); // top-right
                ctx.lineTo(baseX + rectWidth + rectDepth / 2, baseY - midY - priceOffset - rectDepth / 2); // top-right depth
                ctx.lineTo(baseX + rectDepth / 2, baseY - midY - priceOffset - rectDepth / 2); // top-left depth
                ctx.closePath();
                ctx.fillStyle = 'green';
                ctx.fill();
                ctx.strokeStyle = 'black';
                ctx.stroke();
            }

            // Bottom part (red if price decreases)
            if (priceOffset < 0) {
                ctx.beginPath();
                ctx.moveTo(baseX, baseY + midY); // bottom-left
                ctx.lineTo(baseX + rectWidth, baseY + midY); // bottom-right
                ctx.lineTo(baseX + rectWidth + rectDepth / 2, baseY + midY + rectDepth / 2); // bottom-right depth
                ctx.lineTo(baseX + rectDepth / 2, baseY + midY + rectDepth / 2); // bottom-left depth
                ctx.closePath();
                ctx.fillStyle = 'red';
                ctx.fill();
                ctx.strokeStyle = 'black';
                ctx.stroke();
            }

            ctx.restore();
        };

        const animate = () => {
            const step = (price - currentPrice) / 10;
            if (Math.abs(step) > 0.1) {
                setCurrentPrice((prevPrice) => prevPrice + step);
                draw3DRectangle(currentPrice + step, initialPrice);
                requestAnimationFrame(animate);
            } else {
                setCurrentPrice(price);
                draw3DRectangle(price, initialPrice);
            }
        };

        animate();
    }, [price, currentPrice, initialPrice]);

    return <canvas ref={canvasRef} width={800} height={600} />;
};

export default CylinderCanvas;