import React, { Component } from 'react';


export default class Document extends Component{
  constructor(props){
    super(props);
    this.addChildren = this.addChildren.bind(this);
    this.removeChildren = this.removeChildren.bind(this);

    this.children = this.props.children;

    this.props.updateObject.addChildren = this.addChildren;
    this.props.updateObject.removeChildren = this.removeChildren;

  }

  addChildren(index,components){
      this.children.splice(index,0,...components);
      this.forceUpdate();
  }

  removeChildren(index,numberToRemove){
      this.children.splice(index,numberToRemove);
      this.forceUpdate();
  }

  render(){
    return <>{this.children}</>
  }
}