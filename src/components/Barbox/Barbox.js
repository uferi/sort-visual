import React, { Component } from 'react';

import classes from './Barbox.module.css';

class Barbox extends Component {

    render() {

        const bars = this.props.values.map( (value, i) => {
            const heightValue = (value * 100).toString()+'%';
            const style = {
                height: heightValue
            }
            
            const barClasses = [classes.Bar];

            for(let value in this.props.selectedValues){
                if(this.props.selectedValues[value] === i){
                    barClasses.push(classes.Selected)
                }
            }
            
            for(let value in this.props.changedValues){
                if(this.props.changedValues[value] === i){
                    barClasses.push(classes.Changed)
                }
            }


            return(
                <div 
                    key={i} 
                    className={barClasses.join(' ')} 
                    style={style}>

                </div>
            )
        })

        return (
            <div className={classes.BarboxContainer}>
                <div className={classes.Barbox}>
                    {bars}
                </div>
            </div>
        )
    }
}

export default Barbox;