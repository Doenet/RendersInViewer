import React, { Component } from 'react';


export default class Document extends Component{
  constructor(props){
    super(props);
    this.addRemoveChildren = this.addRemoveChildren.bind(this);
    this.children = this.props.children;

    this.props.updateObject.addRemoveChildren = this.addRemoveChildren;

  }

  addRemoveChildren(addOrRemove,index,components){
    if (addOrRemove === "add"){
      this.children.splice(index,0,...components);
      this.forceUpdate();
    }else{
      this.children.splice(index,1);
      this.forceUpdate();
    }
  }

  render(){
    return <>{this.children}</>
  }
}