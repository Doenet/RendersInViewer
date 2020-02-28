import React, { Component } from 'react';
import Core from './Core';
import Document from './Renderers/Document';
import P from './Renderers/P';



class DoenetViewer extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.coreReady = this.coreReady.bind(this);
    this.buildTree = this.buildTree.bind(this);
    
    this.core = new Core({coreReadyCallback:this.coreReady,coreUpdatedCallback:this.update});
    this.doenetRenders = <>Loading...</>
  }




  coreReady(){
    let renderPromises = [];
    let rendererNames = [];
    for (let rendererName of this.core.fullListOfRenderers){
      rendererNames.push(rendererName);
      renderPromises.push(import(/* webpackMode: "lazy", webpackChunkName: "./renderers/[request]" */ `./Renderers/${rendererName}`));
    }
    
    renderersloadComponent(renderPromises,rendererNames).then((renderers)=>{
      this.renderers = renderers;
      this.buildTree();
    });

  }

  buildTree(){
      let P = React.createElement(this.renderers["P"], {key:"first"}); 
      
      this.doenetRenders = <>{P}</>
      this.forceUpdate();
  }

  update(){
    console.log('UPDATE!');
    
  }

  render(){
    return <>
    {this.doenetRenders}
    </>
  }

}

export default DoenetViewer;



async function renderersloadComponent(promises,rendererNames){

    var renderers = {};
    for (let [index,promise] of promises.entries()){
      try {
        let module = await promise;
        renderers[rendererNames[index]] = module.default;
      }catch(error){
        `Error loading ${rendererNames[index]} failed.`
      }
      
    }
    return renderers;
    
  }

