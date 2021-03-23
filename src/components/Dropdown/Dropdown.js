import React, { Component } from 'react';

import classes from './Dropdown.module.css'

class Dropdown extends Component {

    onAlgorithmChangedHandler = (event) => {
        // console.log('Dropdown: ',event.target.value);
        this.props.onAlgorithmChanged(event.target.value);
    }

    render() {

        return(
            <div className={classes.Dropdown}>
                <select 
                    className={classes.Select} 
                    onChange={this.onAlgorithmChangedHandler} 
                    disabled={this.props.isRunning} >
                    <option value="select">Select an algorithm...</option>
                    <option value="selection">Selection sort</option>
                    <option value="insertion">Insertion sort</option>
                    <option value="bubble">Bubble sort</option>
                    <option value="merge">Merge sort</option>
                    <option value="quick">Quick sort</option>
                </select>
            </div>
        );
    }
}

export default Dropdown;