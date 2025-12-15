'use client';

import { useState, useEffect, InputHTMLAttributes, forwardRef } from 'react';

interface ZipCodeCheckerProps extends InputHTMLAttributes<HTMLInputElement> {
  onValidationChange: (isValid: boolean) => void;
}

const ZipCodeChecker = forwardRef<HTMLInputElement, ZipCodeCheckerProps>(
  ({ onValidationChange, ...props }, ref) => {
    const [isValid, setIsValid] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
      // For now, accept any 5-digit ZIP code
      // In production, you'd check against a list of allowed ZIP codes
      const zipCode = (props.value as string) || '';
      const zipRegex = /^\d{5}$/;
      
      if (zipCode.length === 0) {
        setIsValid(false);
        setMessage('');
        onValidationChange(false);
      } else if (zipRegex.test(zipCode)) {
        setIsValid(true);
        setMessage('✓ Valid ZIP code');
        onValidationChange(true);
      } else {
        setIsValid(false);
        setMessage('Please enter a valid 5-digit ZIP code');
        onValidationChange(false);
      }
    }, [props.value, onValidationChange]);

    return (
      <div>
        <label className="block text-sm font-medium mb-2">ZIP Code</label>
        <input
          ref={ref}
          type="text"
          maxLength={5}
          className={`w-full px-4 py-2 border rounded-lg ${
            isValid ? 'border-green-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-gray-900`}
          {...props}
        />
        {message && (
          <p className={`mt-1 text-sm ${isValid ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    );
  }
);

ZipCodeChecker.displayName = 'ZipCodeChecker';

export default ZipCodeChecker;

