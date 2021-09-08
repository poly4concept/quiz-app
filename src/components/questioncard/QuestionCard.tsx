import React from 'react';
import { AnswerObject } from '../../App'
import './QuestionCard.css'
import styled from 'styled-components';
type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement> ) =>void ;
    questionNr: number;
    userAnswer: AnswerObject | undefined;
    totalQuestions: number;
}
const QuestionCard: React.FC<Props> = ({ question, answers, callback, questionNr, userAnswer, totalQuestions }) => {
    
  return (
    <div>
          <div className="card-info">
            <p className="topic">
              General Knowledge
            </p>
            <p>
              About { totalQuestions - questionNr } questions to go
            </p>
          </div>  
          <progress className="progress" max={totalQuestions} value={questionNr}></progress>
          <div className="card">
              <p dangerouslySetInnerHTML={{ __html: question }} className="question" />
              <div>
                  {answers.map(answer => (
                      <ButtonWrapper
                          key={answer}
                          correct={userAnswer?.correctAnswer === answer}
                          userClicked={userAnswer?.answer === answer}
                          >
                              <button className="option" disabled={userAnswer? true : false} value={answer} onClick={callback}>
                              <span dangerouslySetInnerHTML={{ __html: answer}} />
                              </button>
                      </ButtonWrapper>
                  ))}
              </div>
        </div>
      </div>
    )
}


export default QuestionCard;


type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.8s ease-in;
  button {
    user-select: none;
    color: ${({ correct, userClicked }) =>
      correct
        ? 'green'
        : !correct && userClicked
        ? 'red'
        : 'black'};
  }
`;
