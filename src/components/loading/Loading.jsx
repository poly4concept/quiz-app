import React from 'react'
import LoadingGif from '../../images/loading.gif'
import './Loading.css'

const Loading = () => {
    return (
        <div className="loading">
            <h4>Information Loading</h4>
            <img src={LoadingGif} alt=""/>
        </div>
    )
}

export default Loading;
