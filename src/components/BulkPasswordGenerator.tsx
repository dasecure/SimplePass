import React, { useState } from 'react';
import Papa from 'papaparse';

interface Props {
  onGenerate: (seed: string, accounts: string[]) => void;
  generatedPasswords: Array<{ account: string; password: string }>;
}

const BulkPasswordGenerator: React.FC<Props> = ({ onGenerate, generatedPasswords }) => {
  const [seed, setSeed] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerate = () => {
    if (seed && file) {
      Papa.parse(file, {
        complete: (results) => {
          const accounts = results.data.map((row: any) => row[0]).filter((account: string) => account);
          onGenerate(seed, accounts);
        },
      });
    } else {
      alert('Please enter a seed and select a CSV file');
    }
  };

  return (
    <div>
      <h2>Bulk Password Generation</h2>
      <input
        type="text"
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        placeholder="Enter seed for bulk generation"
      />
      <input type="file" accept=".csv" onChange={handleFileChange} />
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
                <td>{password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BulkPasswordGenerator;