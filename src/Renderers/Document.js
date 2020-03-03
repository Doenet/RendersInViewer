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
      //Add
      this.children.splice(index,0,...components);
      this.forceUpdate();
    }else{
      //Remove

    }

  }

  render(){
    return <>{this.children}</>
  }
}