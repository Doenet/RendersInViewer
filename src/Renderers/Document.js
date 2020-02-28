import React, { Component } from 'react';


export default class Document extends Component{
  render(){
    return <>{this.props.children}</>
  }
}