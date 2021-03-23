import React, { Component } from 'react';

import classes from './Slider.module.css';

class Slider extends Component {
    state = {
        value: 11
    }

    componentDidMount() {
        this.setState({value: this.props.initValue})
    }

    onSliderChangeHandler = (event) => {
        // console.log(event.target.value);
        this.props.onChanged(event.target.value);
        this.setState({value: event.target.value});
    }

    render() {
        let barText = '';
        if(this.props.showValue){
            barText += this.state.value;
        }
        if(this.props.showText){
            barText += " " + this.props.barText;
        }
        
        return(
            <div className={classes.SliderContainer} >
                <input 
                    className={classes.Slider} 
                    type="range" 
                    min={this.props.min}
                    max={this.props.max} 
                    value={this.state.value}
                    onChange={this.onSliderChangeHandler}
                    />
                <div className={classes.Baramount} >
                    {barText}
                </div>
            </div>
        )
    }
}

export default Slider;