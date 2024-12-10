import React, { useState, useRef, useEffect } from 'react';

const EditableMultiLineTextComponent: React.FC<{
  value: string;
  onUpdate: (value: string) => void;
  className?: string;
}> = ({
  value,
  onUpdate,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const textSpanRef = useRef<HTMLSpanElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [initialHeight, setInitialHeight] = useState<number | null>(null);

  // Gradient Animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientSlide {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      .animate-gradient {
        background: linear-gradient(90deg, rgb(229 231 235), rgb(75 85 99), rgb(229 231 235));
        background-size: 200% 100%;
        animation: gradientSlide 3s linear infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Initial text height measurement
  useEffect(() => {
    if (textSpanRef.current && !initialHeight) {
      const height = textSpanRef.current.offsetHeight;
      setInitialHeight(height);
    }
  }, []);

  const handleClick = () => {
    if (!initialHeight && textSpanRef.current) {
      const height = textSpanRef.current.offsetHeight;
      setInitialHeight(height);
    }
    setIsEditing(true);
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea && initialHeight) {
      const newHeight = Math.max(initialHeight, textarea.scrollHeight);
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    if (isEditing) {
      adjustTextareaHeight();
    }
  }, [currentValue, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (currentValue !== value) {
      onUpdate(currentValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setCurrentValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`w-full bg-transparent outline-none ${className}`}
          style={{
            height: initialHeight ? `${initialHeight - 1}px` : 'auto',
            appearance: 'none',
            border: 'none',
            borderBottom: '1px solid black',
            margin: 0,
            padding: '8px 0',
            font: 'inherit',
            lineHeight: 'inherit',
            verticalAlign: 'baseline',
            boxSizing: 'border-box',
            display: 'block',
            overflow: 'hidden'
          }}
          autoFocus
        />
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`relative group ${className}`}
    >
      <span
        ref={textSpanRef}
        className="block cursor-text relative"
        style={{
          margin: 0,
          padding: '8px 0',
          boxSizing: 'content-box'
        }}
      >
        {value}
        <div className="absolute bottom-0 left-0 right-0 border-b border-transparent" />
      </span>
      <div className="absolute bottom-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100">
        <div className="w-full h-full animate-gradient" />
      </div>
    </div>
  );
};

export default EditableMultiLineTextComponent; 