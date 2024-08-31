import React, { useState } from 'react';
import SinglePasswordGenerator from './components/SinglePasswordGenerator';
import BulkPasswordGenerator from './components/BulkPasswordGenerator';
import { generatePassword } from './utils/passwordGenerator';
import './App.css';

const App: React.FC = () => {
  const [singlePassword, setSinglePassword] = useState<string>('');
  const [bulkPasswords, setBulkPasswords] = useState<Array<{ account: string; password: string }>>([]);

  const handleSingleGenerate = (seed: string, account: string) => {
    const password = generatePassword(seed, account);
    setSinglePassword(password);
  };

  const handleBulkGenerate = (seed: string, accounts: string[]) => {
    const passwords = accounts.map(account => ({
      account,
      password: generatePassword(seed, account)
    }));
    setBulkPasswords(passwords);
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <SinglePasswordGenerator onGenerate={handleSingleGenerate} generatedPassword={singlePassword} />
      <BulkPasswordGenerator onGenerate={handleBulkGenerate} generatedPasswords={bulkPasswords} />
    </div>
  );
};

export default App;