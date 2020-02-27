import React, { Component } from 'react';
import Core from './Core';
import Document from './Renderers/Document';
import P from './Renderers/P';


class DoenetViewer extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.coreReady = this.coreReady.bind(this);
    
    this.core = new Core({coreReadyCallback:this.coreReady,coreUpdatedCallback:this.update});

  }

  coreReady(){
    console.log('CORE REPORTED IT IS READY!');
    console.log(this.core.treeOfRenderers);
    for (let renderName of this.core.fullListOfRenderers){
      console.log(renderName);
    }
  }

  update(){
    console.log('UPDATE!');
    
  }

  render(){
    return <p>test</p>;
  }

}

export default DoenetViewer;

