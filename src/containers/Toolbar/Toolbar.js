import React, { Component } from 'react';

import classes from './Toolbar.module.css';

import Slider from '../../components/Slider/Slider';
import Dropdown from '../../components/Dropdown/Dropdown';
import Button from '../../components/Button/Button';

class Toolbar extends Component {

    render() {

        let buttonTextStartStop = '';
        if(this.props.isRunning){
            buttonTextStartStop = 'Stop';
        } else {
            buttonTextStartStop = 'GO';
        }

        return (
            <div className={classes.Toolbar} >
                <div className={classes.Logo}>SORT VISUAL</div>
                <Slider 
                    min="16" 
                    max="256" 
                    initValue={this.props.barAmount} 
                    showValue 
                    showText
                    barText="bar" 
                    onChanged={(newAmount) => this.props.onAmountChanged(newAmount)} />
                <Button text="Random" clicked={this.props.onRandomizedClicked}/>
                <Dropdown 
                    onAlgorithmChanged={(newAlgorithm) => {this.props.onAlgorithmChanged(newAlgorithm)}} 
                    isRunning={this.props.isRunning} />
                <Button 
                    text={buttonTextStartStop} 
                    clicked={(this.props.algorithm === 'select') ? null : this.props.onStartStopClicked} 
                    isRunning={this.props.isRunning} 
                    algorithm={this.props.algorithm} />
                {/* <Button text="Reset" clicked={this.props.onRandomizedClicked}/> */}
                <Slider 
                    min="900" 
                    max="1000" 
                    initValue={this.props.tempo} 
                    // showValue 
                    showText
                    barText="tempo" 
                    onChanged={(newTempo) => this.props.onTempoChanged(newTempo)} />
            </div>
        )
    }
}

export default Toolbar;