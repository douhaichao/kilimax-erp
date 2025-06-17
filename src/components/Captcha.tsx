
import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
}

const Captcha = ({ onVerify }: CaptchaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    onVerify(false);
    return result;
  };

  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise lines
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `hsl(${Math.random() * 360}, 50%, 70%)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw text
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < text.length; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 40%)`;
      ctx.save();
      ctx.translate(25 + i * 25, canvas.height / 2);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    // Add noise dots
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 50%, 60%)`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  useEffect(() => {
    const text = generateCaptcha();
    drawCaptcha(text);
  }, []);

  useEffect(() => {
    if (userInput.length === 4) {
      const isValid = userInput.toLowerCase() === captchaText.toLowerCase();
      onVerify(isValid);
    } else {
      onVerify(false);
    }
  }, [userInput, captchaText, onVerify]);

  const refreshCaptcha = () => {
    const text = generateCaptcha();
    drawCaptcha(text);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Verification Code
      </label>
      <div className="flex items-center space-x-2">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={120}
            height={40}
            className="border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={refreshCaptcha}
            className="absolute -top-2 -right-2 p-1 bg-white border border-gray-300 rounded-full text-gray-500 hover:text-gray-700 transition-colors shadow-sm"
            title="Refresh captcha"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter code"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.slice(0, 4))}
          className="flex-1 h-10 px-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          maxLength={4}
          required
        />
      </div>
    </div>
  );
};

export default Captcha;
