import React, { Component } from 'react';
import './Caption.css';
import dots from './img/bg_dot.png';

function Caption(props) {
    return (
        <div id='caption' className='row'>
            <div id='filter'>
                <div id='dots'>
                    {/* <img id='dots' src={dots} alt='dots' /> */}
                    <div id='caption_img'><img src={props.img} alt='caption_img' /></div><br />
                    <div id='caption_text'>{props.text}</div>
                </div>
            </div>
        </div>
    );
}
export default Caption;