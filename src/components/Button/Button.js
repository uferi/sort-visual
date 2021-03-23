import React, { Component } from 'react';

import classes from './Button.module.css';

class Button extends Component {

    render() {

        const btnClasses = [classes.Button];
        if(this.props.isRunning){
            btnClasses.push(classes.Running);
        }
        if(this.props.algorithm === 'select'){
            btnClasses.push(classes.Select);
        }

        return(
            <div 
                className={btnClasses.join(' ')} 
                onClick={this.props.clicked} >
                {this.props.text}
            </div>
        );
    }
}

export default Button;