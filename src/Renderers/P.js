import React, { Component } from 'react';

export default class P extends Component{
  constructor(props){
    super(props);
    this.props.updatable.callUpdate = this.update;
  }

  update(msg){
    console.log(`Inside of P component ${msg}`);
    
  }

  render(){
    return <p>{this.props.svData.text}</p>
  }
}