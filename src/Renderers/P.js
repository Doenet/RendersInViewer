import React, { Component } from 'react';

export default class P extends Component{
  constructor(props){
    super(props);
    this.update = this.update.bind(this);

    this.props.updateObject.update = this.update;

    this.state = {
      text:props.svData.text
    }
  }

  update(newStateVariables){
    this.setState(newStateVariables)
  }

  render(){
    return <p>{this.state.text}</p>
  }
}