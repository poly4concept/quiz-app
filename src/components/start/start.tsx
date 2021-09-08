import React from 'react'
import './start.css'

type StartProps = {
  start: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
};

function Start(props: StartProps): JSX.Element {
    return (
        <div>
            <button className="start" onClick={props.start}>
                Start the quiz
            </button>
        </div>
    )
}

export default Start;