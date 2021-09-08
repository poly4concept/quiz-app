import React from 'react'
import './Next.css'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
type NextProps = {
  Next: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
};

const Next = (props: NextProps) => {
    return (
        <div className="next-container">
            <button className="next" onClick={props.Next}>
                Next Question 
                <ChevronRightIcon/>
            </button>
        </div>
    )
}

export default Next
