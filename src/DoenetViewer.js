import React, { Component } from 'react';
import Core from './Core';


class DoenetViewer extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.coreReady = this.coreReady.bind(this);
    this.buildTree = this.buildTree.bind(this);

    this.rendererUpdateObjects = {};

    this.core = new Core({ coreReadyCallback: this.coreReady, coreUpdatedCallback: this.update });
    this.doenetRenders = <>Loading...</>
  }

  coreReady() {
    let renderPromises = [];
    let rendererNames = [];
    for (let rendererName of this.core.fullListOfRenderers) {
      rendererNames.push(rendererName);
      renderPromises.push(import(/* webpackMode: "lazy", webpackChunkName: "./renderers/[request]" */ `./Renderers/${rendererName}`));
    }

    renderersloadComponent(renderPromises, rendererNames).then((renderers) => {
      this.renderers = renderers;
      this.buildTree();
    });

  }

  buildTree() {
    this.doenetRenders = this.buildTreeHelper(this.core.treeOfRenderers);
    this.forceUpdate();
  }

  //Build tree depth first
  buildTreeHelper(tree) {
    var reactArray = [];
    var children = [];
    for (let node of tree) {
      if (node.children.length > 0) {
        //if has children go deeper
        children = this.buildTreeHelper(node.children);
      }
      let updateObject = {};
      let reactComponent = React.createElement(this.renderers[node.rendererType],
        {
          key: node.componentName,
          children,
          svData: node.stateVariableData,
          updateObject,
        });
      reactArray.push(reactComponent);
      this.rendererUpdateObjects[node.componentName] = updateObject;

      // reactArray.push({name:node.componentName,children})

    }

    return reactArray;



  }


  update(instructions) {
    for (let instruction of instructions){
    console.log(`${instruction.instructionType}!`);

      if (instruction.instructionType === "UpdateStateVariable"){
        for (let componentName in instruction.newStateVariableValues){
          this.rendererUpdateObjects[componentName].update(instruction.newStateVariableValues[componentName]);
        }
      }else if (instruction.instructionType === "AddComponents"){
        let renderer = this.rendererUpdateObjects[instruction.parentComponentName];
        let newComponents = this.buildTreeHelper(instruction.components);
        renderer.addRemoveChildren("add",instruction.childIndex,newComponents);
      }else if (instruction.instructionType === "DeleteComponents"){
        let renderer = this.rendererUpdateObjects[instruction.parentComponentName];
        delete this.rendererUpdateObjects[instruction.componentName];
        renderer.addRemoveChildren("remove",instruction.childIndex);
        
      }
    }


  }

  render() {
    return <>
      {this.doenetRenders}
    </>
  }

}

export default DoenetViewer;



async function renderersloadComponent(promises, rendererNames) {

  var renderers = {};
  for (let [index, promise] of promises.entries()) {
    try {
      let module = await promise;
      renderers[rendererNames[index]] = module.default;
    } catch (error) {
      `Error loading ${rendererNames[index]} failed.`
    }

  }
  return renderers;

}

