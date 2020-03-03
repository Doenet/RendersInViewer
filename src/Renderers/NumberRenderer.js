import React, { Component } from 'react';


export default class NumberRenderer extends Component{
  constructor(props){
    super(props);

    this.children = this.props.children;
    this.update = this.update.bind(this);

    this.props.updateObject.update = this.update;

    this.state = {
      value:props.svData.value
    }

  }



  update(newStateVariables){
    this.setState(newStateVariables)
  }

  render(){
    let value = Number(this.state.value)+1;
    
    return <div width="100px" height="100px" 
    onClick={()=>this.props.requestUpdate({value})}>
      {this.state.value}</div>
  }
}