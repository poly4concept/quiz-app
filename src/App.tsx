import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from '../src/components/questioncard/QuestionCard';
import Start from './components/start/start';
import Loading from './components/loading/Loading';
import Next from './components/next/Next';
// types
import { QuestionState, Difficulty } from './API';
// Styles
import './App.css'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
      <div className="App" >
        <h1>QUIZ APP</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <div className="start-interface">
            <p>Take this short to test your Knowledge</p>
            <Start start={startTrivia} />
          </div>
        ) : null}
        {!gameOver ? <p className='score'>Score : {score}</p> : null}
        {loading ? (<Loading />) : null}
        <div className="contain">
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
          {!gameOver && !loading ? (
            <div className={(!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1)? `Active` : `notActive`}>
              <Next Next={nextQuestion} />
            </div>
          ) : null}
          </div>
      </div>
    </>
  );
};

export default App;