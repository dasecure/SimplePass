import React, { useState } from 'react';
import { LuCopy, LuCheck } from "react-icons/lu";
import { PasswordOptions } from '../utils/passwordGenerator';

interface Props {
  onGenerate: (seed: string, account: string, options: PasswordOptions) => void;
  generatedPassword: string;
}

const SinglePasswordGenerator: React.FC<Props> = ({ onGenerate, generatedPassword }) => {
  const [seed, setSeed] = useState('');
  const [account, setAccount] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 20,
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSpecialChars: true,
  });

  const handleGenerate = () => {
    if (seed && account) {
      onGenerate(seed, account, options);
    } else {
      alert('Please enter both seed and account');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value),
    }));
  };

  return (
    <div>
      <h2>Single Password Generation</h2>
      <input
        type="password"
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        placeholder="Enter seed"
      />
      <input
        type="text"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        placeholder="Enter account"
      />
      <div>
        <label>
          Password Length:
          <input
            type="number"
            name="length"
            value={options.length}
            onChange={handleOptionChange}
            min="1"
            max="100"
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="useUppercase"
            checked={options.useUppercase}
            onChange={handleOptionChange}
          />
          Uppercase
        </label>
        <label>
          <input
            type="checkbox"
            name="useLowercase"
            checked={options.useLowercase}
            onChange={handleOptionChange}
          />
          Lowercase
        </label>
        <label>
          <input
            type="checkbox"
            name="useNumbers"
            checked={options.useNumbers}
            onChange={handleOptionChange}
          />
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            name="useSpecialChars"
            checked={options.useSpecialChars}
            onChange={handleOptionChange}
          />
          Special Characters
        </label>
      </div>
      <button onClick={handleGenerate}>Generate Password</button>
      {generatedPassword && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <p>Generated Password: {generatedPassword}</p>
          {copied ? 
            <LuCheck color="green" size={20} /> : 
            <LuCopy 
              size={20} 
              onClick={() => copyToClipboard(generatedPassword)}
              style={{ cursor: 'pointer' }}
            />
          }
        </div>
      )}
    </div>
  );
};

export default SinglePasswordGenerator;