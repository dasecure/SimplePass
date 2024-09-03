import React from 'react';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
  return (
    <div className="how-it-works">
      <h2>How It Works: Password Generation Process</h2>
      
      <div className="flow-diagram">
        <div className="card">
          <h3>1. Input</h3>
          <p>Seed and Account information are provided</p>
        </div>
        <div className="arrow">→</div>
        <div className="card">
          <h3>2. Combine</h3>
          <p>Seed and Account are concatenated</p>
        </div>
        <div className="arrow">→</div>
        <div className="card">
          <h3>3. Hash</h3>
          <p>Combined string is hashed using SHA-256</p>
        </div>
        <div className="arrow">→</div>
        <div className="card">
          <h3>4. Encode</h3>
          <p>Hash is converted to Base64</p>
        </div>
        <div className="arrow">→</div>
        <div className="card">
          <h3>5. Extract</h3>
          <p>First 16 characters are taken</p>
        </div>
        <div className="arrow">→</div>
        <div className="card">
          <h3>6. Enforce Rules</h3>
          <p>Password is adjusted to meet security requirements</p>
        </div>
        <div className="arrow">→</div>
        <div className="card">
          <h3>7. Final Password</h3>
          <p>The generated password is ready for use</p>
        </div>
      </div>

      <div className="detailed-explanation">
        <h3>Detailed Explanation:</h3>
        <ol>
          <li><strong>Input:</strong> The process begins with two crucial pieces of information: the Seed (a secret phrase) and the Account (usually a username or email).</li>
          <li><strong>Combine:</strong> The Seed and Account are concatenated into a single string. This ensures that the same combination always produces the same password.</li>
          <li><strong>Hash:</strong> The combined string is then hashed using the SHA-256 algorithm. This creates a fixed-length, seemingly random output based on the input.</li>
          <li><strong>Encode:</strong> The binary hash is converted to a Base64 string. This step transforms the hash into printable characters.</li>
          <li><strong>Extract:</strong> To get a password of manageable length, the first 16 characters of the Base64 string are extracted.</li>
          <li><strong>Enforce Rules:</strong> This step ensures the password meets common security requirements:
            <ul>
              <li>If no uppercase letter is present, replace the first character with an uppercase letter.</li>
              <li>If no lowercase letter is present, replace the second character with a lowercase letter.</li>
              <li>If no number is present, replace the third character with a number.</li>
              <li>If no special character is present, replace the fourth character with a special character.</li>
            </ul>
          </li>
          <li><strong>Final Password:</strong> The result of all these steps is the final generated password.</li>
        </ol>
        <p>This process ensures that the same seed and account always generate the same password, while making it virtually impossible to reverse-engineer the seed from the password. The password rules ensure that the generated password meets common security requirements.</p>
      </div>
    </div>
  );
};

export default HowItWorks;