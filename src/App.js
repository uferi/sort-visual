import React, { Component } from 'react';

// import logo from './logo.svg';
import './App.css';

import Layout from './containers/Layout/Layout';

class App extends Component {
  state = {
    barAmount: 64,
    values: [],
    selectedValues: [],
    changedValues: [],
    tempo: 1000,
    algorithm: 'select',
    isRunning: false,
    bubbleParms: null,
    insertionParms: null,
    selectionParms: null,
  }

  componentDidMount() {
    this.generateValues(this.state.barAmount);
    this.mainSortingLoop();
  }

  onBarAmountChangedHandler = (newAmount) => {
    this.generateValues(newAmount);
  }

  onTempoChangedHandler = (newTempo) => {
    // console.log(newTempo);
    this.setState({tempo: newTempo});
  }

  onAlgorithmChangedHandler = (newAlgorithm) => {
    // console.log(newAlgorithm);
    this.setState({
      algorithm: newAlgorithm
    });
    this.initParams(newAlgorithm, this.state.barAmount);
  }

  onStartStopClickedHandler = () => {
    // console.log('StartStop - invoked: actual isRUnning:', this.state.isRunning);
    this.setState({isRunning: !this.state.isRunning})
  }

  onResetHandler = () => {
    console.log('RESET - clicked');
  }

  generateValues = (newAmount, randomize=false) => {
    const newValues = [];
    for(let i=0; i<newAmount; i++){
      if(i>=this.state.barAmount || this.state.values.length===0 || randomize){
        newValues.push(Math.random());
      } else {
        newValues.push(this.state.values[i]);
      }
    }
    this.setState({
      barAmount: newAmount,
      values: newValues,
      selectedValues: [],
      changedValues: []
    });
    this.initParams(this.state.algorithm, newAmount);
  }

  onRandomizedClickedHandler = () => {
    // console.log('RANDOMIZE!');
    this.generateValues(this.state.barAmount, true);
  }

  initParams = (algorithm, barAmount) => {
    let newParams;      
    switch (algorithm){
      case 'bubble':
          newParams = {
          currentId: 0,
          maxId: barAmount-1,
          stepId: 0,
          maxSteps: 2,
          isSorted: true
        }
        this.setState({
          isRunning: false,
          bubbleParms: newParams,
          selectedValues: [],
          changedValues: []
        });
        return;
      case 'insertion':
        newParams = {
          currentId: 1,
          startId: 1,
          maxId: barAmount-1,
          stepId: 0,
          maxSteps: 2,
          isSorted: true
        }
        this.setState({
          isRunning: false,
          insertionParms: newParams,
          selectedValues: [],
          changedValues: []
        });
        return;
      case 'selection':
        newParams = {
          currentId: 0,
          startId: 0,
          maxId: barAmount-1,
          stepId: 0,
          maxSteps: 2,
          minValue: 1000,
          minValueId: 0,
          isSorted: true
        }
        this.setState({
          isRunning: false,
          selectionParms: newParams,
          selectedValues: [],
          changedValues: []
        });
        return;
      default:
        return;
    }
  }

  mainSortingLoop = () => {
    this.doTheSorting();
    setTimeout(this.mainSortingLoop, (1001-this.state.tempo));
  }

  doTheSorting = () => {
    if(this.state.isRunning){
      switch (this.state.algorithm){
        case 'bubble':
          return this.bubbleSort();
        case 'insertion':
          return this.insertionSort();
        case 'selection':
          return this.selectionSort();
        default:
          return console.log('[NOT IMPLEMENTED YET!]');
      }
    }
  }

  //------------------------ SELECTION SORT ------------------------
  selectionSort = () => {
    // console.log('[Selection sort] - making a step');
    const updatedParms = {...this.state.selectionParms};
    const newValues = [...this.state.values];
    // let newSelection = [...this.state.selectedValues];
    let newSelection = [];
    let newChanged = [];
    
    newSelection.push(updatedParms.currentId);
    newChanged.push(updatedParms.startId);
    const actualValue = newValues[updatedParms.currentId];
    
    if(actualValue < updatedParms.minValue){
      if(updatedParms.minValue !== 1000){
        updatedParms.isSorted = false;
      }
      updatedParms.minValueId = updatedParms.currentId;
      updatedParms.minValue = actualValue;
    }
    newChanged.push(updatedParms.minValueId);

    updatedParms.stepId++;
    updatedParms.stepId = updatedParms.stepId % 2;
    
    if(updatedParms.currentId === updatedParms.maxId){
      const startValue = newValues[updatedParms.startId];
      const minValue = newValues[updatedParms.minValueId];
      newValues[updatedParms.startId] = minValue;
      newValues[updatedParms.minValueId] = startValue;
      updatedParms.minValue = 1000;

      updatedParms.currentId = updatedParms.startId;
      updatedParms.startId++;
      updatedParms.minValueId = updatedParms.startId;
    } else {
      // this.initParams(this.state.algorithm, this.state.barAmount);
    }
    
    updatedParms.currentId++;

    this.setState({
      selectedValues: newSelection,
      changedValues: newChanged,
      values: newValues,
      selectionParms: updatedParms
    });

    if( updatedParms.startId === 1 && updatedParms.isSorted ){
        this.initParams(this.state.algorithm, this.state.barAmount);
      }

    if(updatedParms.startId === updatedParms.maxId){
      this.initParams(this.state.algorithm, this.state.barAmount);
    }

  }

  //------------------------ INSERTION SORT ------------------------
  insertionSort = () => {
    // console.log('[Insertion sort] - making a step');
    const updatedParms = {...this.state.insertionParms};
    const newValues = [...this.state.values];
    let newSelection = [...this.state.selectedValues];
    let newChanged = [];
    if(updatedParms.stepId === 0) {
      newChanged.push(updatedParms.currentId);
    } else {
      const valueOne = newValues[updatedParms.currentId];
      const valueTwo = newValues[updatedParms.currentId-1];
      if(valueOne<valueTwo){
        newChanged.push(updatedParms.currentId-1);
        newValues[updatedParms.currentId] = valueTwo;
        newValues[updatedParms.currentId-1] = valueOne;
        updatedParms.currentId--;
      } else {
        newChanged.push(updatedParms.currentId);
        updatedParms.startId++;
        updatedParms.currentId = updatedParms.startId;
      }
    }
    updatedParms.stepId++;
    updatedParms.stepId = updatedParms.stepId % 2;

    this.setState({
      selectedValues: newSelection,
      changedValues: newChanged,
      values: newValues,
      insertionParms: updatedParms
    });

    if(updatedParms.currentId>updatedParms.maxId){
      this.initParams(this.state.algorithm, this.state.barAmount);
    }
  }

  //------------------------ BUBBLE SORT ------------------------
  bubbleSort = () => {
    // console.log('[Bubble sort] - entered');
    const updatedParms = {...this.state.bubbleParms};
    const newValues = [...this.state.values];
    let newSelection = [...this.state.selectedValues];
    let newChanged = [];

    if(this.state.bubbleParms.stepId === 0 ){
      // console.log('[Bubble sort] - selection step');
      // select here
      newSelection = [];
      newSelection.push(this.state.bubbleParms.currentId);
      newSelection.push(this.state.bubbleParms.currentId+1);
    } else {
      // change here if necessary
      const valueOne = newValues[this.state.bubbleParms.currentId];
      const valueTwo = newValues[this.state.bubbleParms.currentId+1];
      if(valueOne>valueTwo){
        updatedParms.isSorted = false;
        newSelection = [];
        newChanged.push(this.state.bubbleParms.currentId);
        newChanged.push(this.state.bubbleParms.currentId+1);
        newValues[this.state.bubbleParms.currentId] = valueTwo;
        newValues[this.state.bubbleParms.currentId+1] = valueOne;
      }
      updatedParms.currentId ++;
    }
    
    updatedParms.stepId ++;
    if(updatedParms.currentId === updatedParms.maxId){
      updatedParms.currentId = 0;
      updatedParms.maxId--;
    }
    if(updatedParms.stepId === updatedParms.maxSteps){
      updatedParms.stepId = 0;
    }

    this.setState({
      selectedValues: newSelection,
      changedValues: newChanged,
      values: newValues,
      bubbleParms: updatedParms
    });

    if(updatedParms.maxId === 0){
      this.initParams(this.state.algorithm, this.state.barAmount);
    }
    if(updatedParms.maxId === this.state.barAmount-2 && updatedParms.isSorted){
      this.initParams(this.state.algorithm, this.state.barAmount);
    }
  }

  render() {
    return (
      <div className="App">
        <Layout 
          barAmount={this.state.barAmount} 
          values={this.state.values} 
          selectedValues={this.state.selectedValues} 
          changedValues={this.state.changedValues} 
          tempo={this.state.tempo} 
          onAmountChanged={(newAmount) => this.onBarAmountChangedHandler(newAmount)} 
          onTempoChanged={(newTempo) => {this.onTempoChangedHandler(newTempo)}} 
          onAlgorithmChanged={(newAlgorithm) => {this.onAlgorithmChangedHandler(newAlgorithm)}} 
          onStartStopClicked={this.onStartStopClickedHandler} 
          onRandomizedClicked={this.onRandomizedClickedHandler}
          isRunning={this.state.isRunning} 
          algorithm={this.state.algorithm} />  
      </div>
    );
  }
}

export default App;
