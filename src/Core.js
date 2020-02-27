//Super lame core.  Just hardcoded lifecycle method calls.

class Core{
  constructor({coreReadyCallback,coreUpdatedCallback}){
    
    this.fullListOfRenderers = [
      "document",
      "p"
    ]

    this.treeOfRenderers = [
      {
        rendererType:"document",
        stateVariableData:{},
        children:[{
          rendererType:"p",
          stateVariableData:{text:"1"},
          children:[],
        }
        ]
      }
    ]

      
    //** Timed method calls **

    //Let viewer know we are ready
    setTimeout(coreReadyCallback,500);

    //Update information in viewer
    setTimeout(coreUpdatedCallback,2000);

  }
}

export default Core;