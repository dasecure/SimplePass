import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { LuCopy, LuCheck } from "react-icons/lu";
import { PasswordOptions } from '../utils/passwordGenerator';

interface Props {
  onGenerate: (seed: string, accounts: string[], options: PasswordOptions) => void;
  generatedPasswords: Array<{ account: string; password: string }>;
  initialAccounts: string[];
}

const BulkPasswordGenerator: React.FC<Props> = ({ onGenerate, generatedPasswords, initialAccounts }) => {
  const [seed, setSeed] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [accounts, setAccounts] = useState<string[]>(initialAccounts);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 20,
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSpecialChars: true,
  });

  useEffect(() => {
    if (initialAccounts.length > 0) {
      handleGenerate();
    }
  }, [initialAccounts]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerate = () => {
    if (seed && (file || accounts.length > 0)) {
      if (file) {
        Papa.parse(file, {
          complete: (results) => {
            const parsedAccounts = results.data
              .map((row: any) => row[0])
              .filter((account: string) => account)
              .map((account: string) => account.trim());
            setAccounts(parsedAccounts);
            onGenerate(seed, parsedAccounts, options);
          },
        });
      } else {
        onGenerate(seed, accounts.map(account => account.trim()), options);
      }
    } else if (accounts.length > 0) {
      onGenerate(seed, accounts.map(account => account.trim()), options);
    } else {
      alert('Please enter a seed and select a CSV file or provide accounts via URL');
    }
  };

  const copyToClipboard = async (text: string, account: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [account]: true }));
      setTimeout(() => setCopiedStates(prev => ({ ...prev, [account]: false })), 3000);
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
      <h2>Bulk Password Generation</h2>
      <input
        type="password"
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        placeholder="Enter seed for bulk generation"
      />
      {initialAccounts.length === 0 && (
        <div className="file-input-wrapper">
          <div className="file-input-button">Choose CSV File</div>
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
      )}
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
      <button onClick={handleGenerate}>Generate Bulk Passwords</button>
      {generatedPasswords.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {generatedPasswords.map(({ account, password }) => (
              <tr key={account}>
                <td>{account}</td>
                <td style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {password}
                  {copiedStates[account] ? 
                    <LuCheck color="green" size={20} /> : 
                    <LuCopy 
                      size={20} 
                      onClick={() => copyToClipboard(password, account)}
                      style={{ cursor: 'pointer' }}
                    />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BulkPasswordGenerator;