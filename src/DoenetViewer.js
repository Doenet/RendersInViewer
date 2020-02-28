import React, { Component } from 'react';
import Core from './Core';


class DoenetViewer extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.coreReady = this.coreReady.bind(this);
    this.buildTree = this.buildTree.bind(this);

    this.temp = {};

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
      let updatable = {};
      let reactComponent = React.createElement(this.renderers[node.rendererType],
        {
          key: node.componentName,
          children,
          svData: node.stateVariableData,
          updatable,
        });
      reactArray.push(reactComponent);
      this.temp[node.componentName] = updatable;

      // reactArray.push({name:node.componentName,children})

    }

    return reactArray;



  }


  update() {
    console.log('UPDATE!');
    console.log(this.temp._p1);

    this.temp._p1.callUpdate('hello from update')

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

