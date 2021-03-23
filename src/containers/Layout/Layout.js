import React, { Component } from 'react';

import classes from './Layout.module.css';

import Toolbar from '../Toolbar/Toolbar';
import Barbox from '../../components/Barbox/Barbox';

class Layout extends Component {

    render(){

        return (
            <div className={classes.Layout} >
                <Toolbar 
                    barAmount={this.props.barAmount} 
                    tempo={this.props.tempo} 
                    onAmountChanged={(newAmount) => this.props.onAmountChanged(newAmount)} 
                    onTempoChanged={(newTempo) => {this.props.onTempoChanged(newTempo)}} 
                    onAlgorithmChanged={(newAlgorithm) => {this.props.onAlgorithmChanged(newAlgorithm)}} 
                    onStartStopClicked={this.props.onStartStopClicked} 
                    onRandomizedClicked={this.props.onRandomizedClicked} 
                    isRunning={this.props.isRunning} 
                    algorithm={this.props.algorithm} />
                <Barbox 
                    values={this.props.values} 
                    selectedValues={this.props.selectedValues} 
                    changedValues={this.props.changedValues} />
            </div>
        )
    }
}

export default Layout;