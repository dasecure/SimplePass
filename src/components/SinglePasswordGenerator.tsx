import React, { useState } from 'react';

interface Props {
  onGenerate: (seed: string, account: string) => void;
  generatedPassword: string;
}

const SinglePasswordGenerator: React.FC<Props> = ({ onGenerate, generatedPassword }) => {
  const [seed, setSeed] = useState('');
  const [account, setAccount] = useState('');

  const handleGenerate = () => {
    if (seed && account) {
      onGenerate(seed, account);
    } else {
      alert('Please enter both seed and account name');
    }
  };

  return (
    <div>
      <h2>Single Password Generation</h2>
      <input
        type="text"
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
        placeholder="Enter seed"
      />
      <input
        type="text"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        placeholder="Enter account name"
      />
      <button onClick={handleGenerate}>Generate Password</button>
      {generatedPassword && <div>Generated Password: {generatedPassword}</div>}
    </div>
  );
};

export default SinglePasswordGenerator;