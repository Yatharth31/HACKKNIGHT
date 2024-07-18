import React, { useState, useEffect, useCallback } from 'react';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing input
//  import { db } from '../../lib/firebase.ts';
import { getFirestore, collection, setDoc, doc, addDoc } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import firebase from '@/lib/firebase';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE4mXfv6POrB5BI0rdRG1xqhjTmdBHJqg",
  authDomain: "hacknight-9df7d.firebaseapp.com",
  projectId: "hacknight-9df7d",
  storageBucket: "hacknight-9df7d.appspot.com",
  messagingSenderId: "76709410323",
  appId: "1:76709410323:web:e890e240a0b39f35a4f1e6",
  measurementId: "G-HW75LS2LLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const allQuestions = [
    {
      question: "What is the purpose of creating a budget?",
      choices: ['a) To limit spending', 'b) To track income and expenses', 'c) To achieve financial goals', 'd) All of the above'],
      correctAnswer: 'd) All of the above'
    },
    {
      question: "Define fixed expenses and provide an example.",
      choices: ['a) Expenses that change from month to month', 'b) Expenses that remain constant each month', 'c) Expenses incurred only on weekends', 'd) Expenses related to entertainment'],
      correctAnswer: 'b) Expenses that remain constant each month'
    },
    {
      question: "What are variable expenses and give an example.",
      choices: ['a) Expenses that remain constant each month', 'b) Expenses that change from month to month', 'c) Expenses incurred only on weekends', 'd) Expenses related to entertainment'],
      correctAnswer: 'b) Expenses that change from month to month'
    },
    {
      question: "What is an emergency fund?",
      choices: ['a) Money saved for unexpected expenses', 'b) Money saved for vacations', 'c) Money invested in the stock market', 'd) Money spent on entertainment'],
      correctAnswer: 'a) Money saved for unexpected expenses'
    },
    {
      question: "What is a savings account?",
      choices: ['a) A bank account that earns interest', 'b) A bank account for daily transactions', 'c) An account for paying bills', 'd) An account for taking loans'],
      correctAnswer: 'a) A bank account that earns interest'
    },
    {
      question: "What is a checking account?",
      choices: ['a) A bank account for daily transactions', 'b) A bank account that earns interest', 'c) An account for saving money', 'd) An account for investments'],
      correctAnswer: 'a) A bank account for daily transactions'
    },
    {
      question: "What is compound interest?",
      choices: ['a) Interest on the initial principal only', 'b) Interest on both the initial principal and the accumulated interest', 'c) Interest on loans', 'd) Interest on expenses'],
      correctAnswer: 'b) Interest on both the initial principal and the accumulated interest'
    },
    {
      question: "What is a credit score?",
      choices: ['a) A number that represents a persons creditworthiness', 'b) A number that represents a persons income', 'c) A number that represents a persons savings', 'd) A number that represents a persons expenses'],
      correctAnswer: 'a) A number that represents a persons creditworthiness'
    },
    {
      question: "What is the purpose of a credit report?",
      choices: ['a) To track a persons financial transactions', 'b) To provide information about a persons credit history', 'c) To calculate a persons net worth', 'd) To record a persons monthly expenses'],
      correctAnswer: 'b) To provide information about a persons credit history'
    },
    {
      question: "What is the difference between a debit card and a credit card?",
      choices: ['a) Debit cards use funds directly from a bank account, credit cards allow borrowing money', 'b) Debit cards earn interest, credit cards do not', 'c) Debit cards are used for large purchases, credit cards are for small purchases', 'd) Debit cards have higher fees than credit cards'],
      correctAnswer: 'a) Debit cards use funds directly from a bank account, credit cards allow borrowing money'
    },
    {
      question: "What is an investment portfolio?",
      choices: ['a) A collection of investments owned by an individual or organization', 'b) A savings account', 'c) A type of credit card', 'd) A document that tracks expenses'],
      correctAnswer: 'a) A collection of investments owned by an individual or organization'
    },
    {
      question: "What is the stock market?",
      choices: ['a) A market where stocks are bought and sold', 'b) A market for grocery shopping', 'c) A market for real estate', 'd) A market for foreign exchange'],
      correctAnswer: 'a) A market where stocks are bought and sold'
    },
    {
      question: "What is a bond?",
      choices: ['a) A loan made to a corporation or government', 'b) A type of stock', 'c) A type of savings account', 'd) A credit card fee'],
      correctAnswer: 'a) A loan made to a corporation or government'
    },
    {
      question: "What is a mutual fund?",
      choices: ['a) An investment vehicle that pools money from many investors to buy securities', 'b) A type of bank account', 'c) A type of bond', 'd) A retirement savings plan'],
      correctAnswer: 'a) An investment vehicle that pools money from many investors to buy securities'
    },
    {
      question: "What is an exchange-traded fund (ETF)?",
      choices: ['a) A type of investment fund that is traded on stock exchanges', 'b) A savings account', 'c) A type of bond', 'd) A type of insurance'],
      correctAnswer: 'a) A type of investment fund that is traded on stock exchanges'
    },
    {
      question: "What is a 401(k) plan?",
      choices: ['a) A retirement savings plan offered by employers', 'b) A type of savings account', 'c) A type of investment fund', 'd) A loan plan'],
      correctAnswer: 'a) A retirement savings plan offered by employers'
    },
    {
      question: "What is a Roth IRA?",
      choices: ['a) An individual retirement account where contributions are made with after-tax dollars', 'b) A type of savings account', 'c) A loan plan', 'd) An insurance plan'],
      correctAnswer: 'a) An individual retirement account where contributions are made with after-tax dollars'
    },
    {
      question: "What is the purpose of diversification in investing?",
      choices: ['a) To spread risk across different investments', 'b) To increase fees', 'c) To focus on one type of investment', 'd) To save money in one place'],
      correctAnswer: 'a) To spread risk across different investments'
    },
    {
      question: "What is a dividend?",
      choices: ['a) A payment made by a corporation to its shareholders', 'b) A type of bond', 'c) A type of stock', 'd) An insurance policy'],
      correctAnswer: 'a) A payment made by a corporation to its shareholders'
    },
    {
      question: "What is a capital gain?",
      choices: ['a) The profit from the sale of an asset', 'b) A type of savings account', 'c) A type of bond', 'd) A loan payment'],
      correctAnswer: 'a) The profit from the sale of an asset'
    },
    {
      question: "What is the difference between gross income and net income?",
      choices: ['a) Gross income is before taxes, net income is after taxes', 'b) Gross income is after taxes, net income is before taxes', 'c) Gross income includes expenses, net income does not', 'd) Gross income is only for businesses, net income is only for individuals'],
      correctAnswer: 'a) Gross income is before taxes, net income is after taxes'
    },
    {
      question: "What is a loan?",
      choices: ['a) Money borrowed that is expected to be paid back with interest', 'b) Money saved for emergencies', 'c) Money invested in the stock market', 'd) Money spent on entertainment'],
      correctAnswer: 'a) Money borrowed that is expected to be paid back with interest'
    },
    {
      question: "What is a mortgage?",
      choices: ['a) A loan used to purchase real estate', 'b) A savings account', 'c) A type of investment', 'd) A credit card fee'],
      correctAnswer: 'a) A loan used to purchase real estate'
    },
    {
      question: "What is the difference between a secured loan and an unsecured loan?",
      choices: ['a) A secured loan is backed by collateral, an unsecured loan is not', 'b) A secured loan has higher interest rates, an unsecured loan has lower interest rates', 'c) A secured loan is for individuals, an unsecured loan is for businesses', 'd) A secured loan is for short-term, an unsecured loan is for long-term'],
      correctAnswer: 'a) A secured loan is backed by collateral, an unsecured loan is not'
    },
    {
      question: "What is the purpose of insurance?",
      choices: ['a) To protect against financial loss', 'b) To save money for vacations', 'c) To invest in the stock market', 'd) To pay off loans'],
      correctAnswer: 'a) To protect against financial loss'
    },
    {
      question: "What is health insurance?",
      choices: ['a) Insurance that covers medical expenses', 'b) Insurance that covers car damage', 'c) Insurance that covers home repairs', 'd) Insurance that covers travel expenses'],
      correctAnswer: 'a) Insurance that covers medical expenses'
    },
    {
      question: "What is life insurance?",
      choices: ['a) Insurance that pays out a sum of money on the death of the insured person', 'b) Insurance that covers medical expenses', 'c) Insurance that covers car damage', 'd) Insurance that covers travel expenses'],
      correctAnswer: 'a) Insurance that pays out a sum of money on the death of the insured person'
    },
    {
      question: "What is property insurance?",
      choices: ['a) Insurance that covers damage to property', 'b) Insurance that covers medical expenses', 'c) Insurance that covers travel expenses', 'd) Insurance that covers investments'],
      correctAnswer: 'a) Insurance that covers damage to property'
    },
    {
      question: "What is an insurance premium?",
      choices: ['a) The amount paid for an insurance policy', 'b) The amount received from an insurance policy', 'c) The amount invested in the stock market', 'd) The amount saved for emergencies'],
      correctAnswer: 'a) The amount paid for an insurance policy'
    },
    {
      question: "What is an insurance deductible?",
      choices: ['a) The amount paid out of pocket before the insurance covers the rest', 'b) The amount received from an insurance policy', 'c) The amount invested in the stock market', 'd) The amount saved for emergencies'],
      correctAnswer: 'a) The amount paid out of pocket before the insurance covers the rest'
    },
    {
      question: "What is a financial plan?",
      choices: ['a) A comprehensive evaluation of an individuals current and future financial state', 'b) A savings account', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) A comprehensive evaluation of an individuals current and future financial state'
    },
    {
      question: "What is net worth?",
      choices: ['a) The difference between total assets and total liabilities', 'b) The total income earned in a year', 'c) The total expenses in a month', 'd) The total amount of loans taken'],
      correctAnswer: 'a) The difference between total assets and total liabilities'
    },
    {
      question: "What is a financial goal?",
      choices: ['a) A specific objective to be achieved with financial planning', 'b) A type of savings account', 'c) A type of investment', 'd) A type of loan'],
      correctAnswer: 'a) A specific objective to be achieved with financial planning'
    },
    {
      question: "What is a budget surplus?",
      choices: ['a) When income exceeds expenses', 'b) When expenses exceed income', 'c) When savings are depleted', 'd) When investments perform poorly'],
      correctAnswer: 'a) When income exceeds expenses'
    },
    {
      question: "What is a budget deficit?",
      choices: ['a) When expenses exceed income', 'b) When income exceeds expenses', 'c) When savings are depleted', 'd) When investments perform poorly'],
      correctAnswer: 'a) When expenses exceed income'
    },
    {
      question: "What is a financial statement?",
      choices: ['a) A formal record of financial activities', 'b) A type of savings account', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) A formal record of financial activities'
    },
    {
      question: "What is an income statement?",
      choices: ['a) A financial statement that shows revenue and expenses over a period of time', 'b) A type of savings account', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) A financial statement that shows revenue and expenses over a period of time'
    },
    {
      question: "What is a balance sheet?",
      choices: ['a) A financial statement that shows assets, liabilities, and equity at a specific point in time', 'b) A type of savings account', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) A financial statement that shows assets, liabilities, and equity at a specific point in time'
    },
    {
      question: "What is cash flow?",
      choices: ['a) The movement of money in and out of an account', 'b) The total amount of savings', 'c) The total amount of loans', 'd) The total amount of investments'],
      correctAnswer: 'a) The movement of money in and out of an account'
    },
    {
      question: "What is liquidity?",
      choices: ['a) The ability to quickly convert assets into cash', 'b) The ability to save money', 'c) The ability to take loans', 'd) The ability to invest in the stock market'],
      correctAnswer: 'a) The ability to quickly convert assets into cash'
    },
    {
      question: "What is a tax?",
      choices: ['a) A mandatory financial charge imposed by the government', 'b) A type of savings account', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) A mandatory financial charge imposed by the government'
    },
    {
      question: "What is income tax?",
      choices: ['a) A tax on individual or corporate earnings', 'b) A tax on property', 'c) A tax on sales', 'd) A tax on imports'],
      correctAnswer: 'a) A tax on individual or corporate earnings'
    },
    {
      question: "What is a sales tax?",
      choices: ['a) A tax on sales of goods and services', 'b) A tax on property', 'c) A tax on income', 'd) A tax on investments'],
      correctAnswer: 'a) A tax on sales of goods and services'
    },
    {
      question: "What is property tax?",
      choices: ['a) A tax on real estate property', 'b) A tax on income', 'c) A tax on sales', 'd) A tax on imports'],
      correctAnswer: 'a) A tax on real estate property'
    },
    {
      question: "What is an estate tax?",
      choices: ['a) A tax on the transfer of the estate of a deceased person', 'b) A tax on property', 'c) A tax on sales', 'd) A tax on income'],
      correctAnswer: 'a) A tax on the transfer of the estate of a deceased person'
    },
    {
      question: "What is a payroll tax?",
      choices: ['a) A tax on wages and salaries', 'b) A tax on sales', 'c) A tax on property', 'd) A tax on imports'],
      correctAnswer: 'a) A tax on wages and salaries'
    },
    {
      question: "What is a capital gains tax?",
      choices: ['a) A tax on the profit from the sale of an asset', 'b) A tax on sales', 'c) A tax on property', 'd) A tax on income'],
      correctAnswer: 'a) A tax on the profit from the sale of an asset'
    },
    {
      question: "What is a tax deduction?",
      choices: ['a) An expense that can be subtracted from gross income to reduce taxable income', 'b) A type of savings account', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) An expense that can be subtracted from gross income to reduce taxable income'
    },
    {
      question: "What is a tax credit?",
      choices: ['a) An amount of money that can be subtracted directly from taxes owed', 'b) A type of savings account', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) An amount of money that can be subtracted directly from taxes owed'
    },
    {
      question: "What is a budget?",
      choices: ['a) A plan for managing income and expenses', 'b) A type of savings account', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) A plan for managing income and expenses'
    },
    {
      question: "What is financial literacy?",
      choices: ['a) The ability to understand and use various financial skills', 'b) The ability to read financial books', 'c) The ability to save money', 'd) The ability to invest in the stock market'],
      correctAnswer: 'a) The ability to understand and use various financial skills'
    },
    {
      question: "What is inflation?",
      choices: ['a) The rate at which the general level of prices for goods and services rises', 'b) The rate at which income increases', 'c) The rate at which savings grow', 'd) The rate at which investments gain value'],
      correctAnswer: 'a) The rate at which the general level of prices for goods and services rises'
    },
    {
      question: "What is deflation?",
      choices: ['a) The decrease in the general price level of goods and services', 'b) The decrease in income', 'c) The decrease in savings', 'd) The decrease in investments'],
      correctAnswer: 'a) The decrease in the general price level of goods and services'
    },
    {
      question: "What is the purpose of a financial advisor?",
      choices: ['a) To provide financial guidance and advice', 'b) To open a savings account', 'c) To grant loans', 'd) To sell insurance'],
      correctAnswer: 'a) To provide financial guidance and advice'
    },
    {
      question: "What is a pension?",
      choices: ['a) A retirement plan that provides a monthly income', 'b) A type of savings account', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) A retirement plan that provides a monthly income'
    },
    {
      question: "What is social security?",
      choices: ['a) A government program that provides retirement, disability, and survivor benefits', 'b) A type of insurance', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) A government program that provides retirement, disability, and survivor benefits'
    },
    {
      question: "What is a will?",
      choices: ['a) A legal document that states how a persons assets will be distributed after their death', 'b) A type of insurance', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) A legal document that states how a persons assets will be distributed after their death'
    },
    {
      question: "What is estate planning?",
      choices: ['a) The process of arranging for the disposal of a persons estate', 'b) The process of saving for a house', 'c) The process of investing in the stock market', 'd) The process of taking loans'],
      correctAnswer: 'a) The process of arranging for the disposal of a persons estate'
    },
    {
      question: "What is a trust?",
      choices: ['a) A legal arrangement in which one person holds property for the benefit of another', 'b) A type of savings account', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) A legal arrangement in which one person holds property for the benefit of another'
    },
    {
      question: "What is an annuity?",
      choices: ['a) A financial product that provides a series of payments made at equal intervals', 'b) A type of savings account', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) A financial product that provides a series of payments made at equal intervals'
    },
    {
      question: "What is a financial market?",
      choices: ['a) A marketplace where buyers and sellers trade financial securities', 'b) A marketplace for grocery shopping', 'c) A marketplace for real estate', 'd) A marketplace for foreign exchange'],
      correctAnswer: 'a) A marketplace where buyers and sellers trade financial securities'
    },
    {
      question: "What is a financial intermediary?",
      choices: ['a) An institution that facilitates the channeling of funds between lenders and borrowers', 'b) An institution that sells groceries', 'c) An institution that buys real estate', 'd) An institution that trades foreign exchange'],
      correctAnswer: 'a) An institution that facilitates the channeling of funds between lenders and borrowers'
    },
    {
      question: "What is an initial public offering (IPO)?",
      choices: ['a) The first sale of stock by a company to the public', 'b) The first purchase of a bond', 'c) The first deposit into a savings account', 'd) The first withdrawal from a checking account'],
      correctAnswer: 'a) The first sale of stock by a company to the public'
    },
    {
      question: "What is a financial ratio?",
      choices: ['a) A numerical comparison of two or more financial values', 'b) A type of savings account', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) A numerical comparison of two or more financial values'
    },
    {
      question: "What is leverage?",
      choices: ['a) The use of borrowed capital to increase the potential return of an investment', 'b) The use of savings to buy groceries', 'c) The use of loans to pay off debts', 'd) The use of income to pay taxes'],
      correctAnswer: 'a) The use of borrowed capital to increase the potential return of an investment'
    },
    {
      question: "What is a merger?",
      choices: ['a) The combination of two or more companies into a single entity', 'b) The division of a company into multiple entities', 'c) The purchase of a bond', 'd) The sale of a stock'],
      correctAnswer: 'a) The combination of two or more companies into a single entity'
    },
    {
      question: "What is an acquisition?",
      choices: ['a) The purchase of one company by another', 'b) The sale of a company to another', 'c) The combination of two companies into one', 'd) The division of a company into multiple entities'],
      correctAnswer: 'a) The purchase of one company by another'
    },
    {
      question: "What is a hostile takeover?",
      choices: ['a) The acquisition of a company against the wishes of its management', 'b) The sale of a company to another', 'c) The combination of two companies into one', 'd) The division of a company into multiple entities'],
      correctAnswer: 'a) The acquisition of a company against the wishes of its management'
    },
    {
      question: "What is a financial audit?",
      choices: ['a) An independent examination of financial information', 'b) A type of savings account', 'c) A type of loan', 'd) A type of investment'],
      correctAnswer: 'a) An independent examination of financial information'
    },
    {
      question: "What is financial risk?",
      choices: ['a) The possibility of losing money on an investment', 'b) The possibility of earning a high return', 'c) The possibility of saving money', 'd) The possibility of paying off debts'],
      correctAnswer: 'a) The possibility of losing money on an investment'
    },
];

function QandA() {
  const [showQuestionBox, setShowQuestionBox] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Pick a random question when component mounts
    setCurrentQuestionIndex(Math.floor(Math.random() * allQuestions.length));
  }, []);

  const openQuestionBox = useCallback(() => {
    setShowQuestionBox(true);
  }, []);

  const closeQuestionBox = useCallback(() => {
    setShowQuestionBox(false);
    setSelectedAnswer('');
  }, []);

  const closeScoreModal = () => {
    setScore(null);
  };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   if (selectedAnswer) {
  //     const correctAnswer = allQuestions[currentQuestionIndex].correctAnswer;
  //     setScore(selectedAnswer === correctAnswer ? 100 : 0);
  //     closeQuestionBox();
  //   } else {
  //     alert("Please select an option before submitting.");
  //   }
  // };

  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.value);
  };
  const getCurrentUserId = () => {
    const auth = getAuth();
    if (auth.currentUser) {
      return auth.currentUser.uid;
    } else {
      // Handle case where no user is signed in
      console.error("No user signed in.");
      return null;
    }
  };
 // Example usage
const handleFormSubmit = async (event) => {
  event.preventDefault();
  if (selectedAnswer) {
    const correctAnswer = allQuestions[currentQuestionIndex].correctAnswer;
    const userScore = selectedAnswer === correctAnswer ? 100 : 0;

    try {
      // Get current user ID
      const userId = getCurrentUserId();

      if (!userId) {
        // Handle error or return if no user is signed in
        return;
      }

      // Update document in "rewards" collection
      const rewardsDocRef = doc(db, 'rewards', userId); // Example of using user's ID as document ID
      await setDoc(rewardsDocRef, {
        score: userScore
      }, { merge: true });

      // Display score or handle UI state
      setScore(userScore);
      closeQuestionBox();
    } catch (error) {
      console.error('Error adding document: ', error);
      // Handle error state or UI feedback
    }
  } else {
    alert('Please select an option before submitting.');
  }
};
  const currentQuestion = allQuestions[currentQuestionIndex];

  return (
    <div className="QandA container mt-5">
      <button id="question-btn" className="btn btn-primary mb-3" onClick={openQuestionBox}>Question</button>

      {showQuestionBox && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentQuestion.question) }}></h5>
                <button type="button" className="close" onClick={closeQuestionBox}>&times;</button>
              </div>
              <div className="modal-body">
                <div className="mb-3">Rewards: Rs.10</div>
                <form id="question-form" onSubmit={handleFormSubmit}>
                  {currentQuestion.choices.map((choice, index) => (
                    <div key={index} className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="answer"
                        value={choice}
                        onChange={handleOptionChange}
                        checked={selectedAnswer === choice}
                      />
                      <label className="form-check-label">
                        {DOMPurify.sanitize(choice)}
                      </label>
                    </div>
                  ))}
                  <button type="submit" className="btn btn-success mt-3">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {score !== null && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Your Score</h5>
                <button type="button" className="close" onClick={closeScoreModal}>&times;</button>
              </div>
              <div className="modal-body">
                <p>Your score: {score}%</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeScoreModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QandA;
