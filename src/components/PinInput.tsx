import React, { useRef, useEffect } from 'react';

interface PinInputProps {
  value: string; // up to 4 numeric digits
  onChange: (val: string) => void;
  isMasked?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  hasError?: boolean;
  idPrefix?: string;
}

export const PinInput: React.FC<PinInputProps> = ({
  value,
  onChange,
  isMasked = false,
  disabled = false,
  autoFocus = false,
  hasError = false,
  idPrefix = 'pin-digit',
}) => {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Ensure digits array of length 4
  const digits = [
    value[0] || '',
    value[1] || '',
    value[2] || '',
    value[3] || '',
  ];

  useEffect(() => {
    if (autoFocus && inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Current empty, focus previous
        inputRefs[index - 1].current?.focus();
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        onChange(newDigits.join(''));
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        onChange(newDigits.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs[index - 1].current?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      e.preventDefault();
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Extract only digits
    const cleanDigits = rawVal.replace(/\D/g, '');
    if (!cleanDigits) {
      const newDigits = [...digits];
      newDigits[index] = '';
      onChange(newDigits.join(''));
      return;
    }

    // Single digit input
    const char = cleanDigits[cleanDigits.length - 1];
    const newDigits = [...digits];
    newDigits[index] = char;
    const combined = newDigits.join('');
    onChange(combined);

    // Auto advance focus
    if (index < 3 && char) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pasted) {
      onChange(pasted);
      const nextFocusIdx = Math.min(pasted.length, 3);
      inputRefs[nextFocusIdx].current?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {[0, 1, 2, 3].map((index) => {
        const digit = digits[index];
        const isFilled = Boolean(digit);

        return (
          <div key={`${idPrefix}-${index}`} className="relative">
            <input
              id={`${idPrefix}-${index}`}
              ref={inputRefs[index]}
              type={isMasked ? 'password' : 'text'}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              disabled={disabled}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl text-center text-xl sm:text-2xl font-mono font-bold tracking-widest bg-white/[0.04] text-white transition-all outline-none border-2 select-none ${
                hasError
                  ? 'border-red-500/80 bg-red-500/10 text-red-200'
                  : isFilled
                  ? 'border-violet-500 bg-violet-500/15 shadow-lg shadow-violet-500/20 text-white'
                  : 'border-white/[0.12] hover:border-white/30 focus:border-violet-400 focus:bg-white/[0.08]'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {/* Visual Dot indicator if masked and filled */}
            {isMasked && isFilled && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-3.5 h-3.5 rounded-full bg-violet-300 shadow-sm" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
