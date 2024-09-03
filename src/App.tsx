import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SinglePasswordGenerator from './components/SinglePasswordGenerator';
import BulkPasswordGenerator from './components/BulkPasswordGenerator';
import HowItWorks from './components/HowItWorks';
import { generatePassword, PasswordOptions } from './utils/passwordGenerator';
import './App.css';

const App: React.FC = () => {
  const [singlePassword, setSinglePassword] = useState<string>('');
  const [bulkPasswords, setBulkPasswords] = useState<Array<{ account: string; password: string }>>([]);

  const handleSingleGenerate = (seed: string, account: string, options: PasswordOptions) => {
    const password = generatePassword(seed, account.trim(), options);
    setSinglePassword(password);
  };

  const handleBulkGenerate = (seed: string, accounts: string[], options: PasswordOptions) => {
    const passwords = accounts.map(account => ({
      account: account.trim(),
      password: generatePassword(seed, account.trim(), options)
    }));
    setBulkPasswords(passwords);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const acctdata = urlParams.get('acctdata');
    if (acctdata) {
      const accounts = acctdata.split(',').map(account => account.trim());
      const defaultOptions: PasswordOptions = {
        length: 20,
        useUppercase: true,
        useLowercase: true,
        useNumbers: true,
        useSpecialChars: true,
      };
      handleBulkGenerate('', accounts, defaultOptions);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header />
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              (() => {
                const urlParams = new URLSearchParams(window.location.search);
                const acctdata = urlParams.get('acctdata');
                return (
                  <div className="generator-container">
                    <SinglePasswordGenerator onGenerate={handleSingleGenerate} generatedPassword={singlePassword} />
                    <BulkPasswordGenerator 
                      onGenerate={handleBulkGenerate} 
                      generatedPasswords={bulkPasswords}
                      initialAccounts={acctdata ? acctdata.split(',').map(account => account.trim()) : []}
                    />
                  </div>
                );
              })()
            } />
            <Route path="/how-it-works" element={<HowItWorks />} />
            {/* Add routes for FAQ and About pages when you create them */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;