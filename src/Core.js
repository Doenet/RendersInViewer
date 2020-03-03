//Super lame core.  Just hardcoded lifecycle method calls.

class Core {
  constructor({ coreReadyCallback, coreUpdatedCallback }) {

    this.requestUpdate = this.requestUpdate.bind(this)
    this.coreUpdatedCallback = coreUpdatedCallback;

    this.fullListOfRenderers = [
      "Document",
      "NumberRenderer"
    ]
    this.treeOfRenderers = [
      {
        rendererType: "Document",
        componentName: "_document1",
        stateVariableData: {},
        children: [{
          componentName: "_number1",
          rendererType: "NumberRenderer",
          stateVariableData: { value: "1" },
          children: [],
        }]
      }
    ];
       //** Timed method calls **
    //Let viewer know we are ready
    setTimeout(coreReadyCallback, 0);
  }

  requestUpdate({value}){
    console.log('Request Update');
    this.coreUpdatedCallback(
      [
        {
          instructionType: "UpdateStateVariable",
          newStateVariableValues: {
            _number1:
            {
              value: value,
            }
          }
        }
      ]
    )
  }
}

export default Core;

    // this.fullListOfRenderers = [
    //   "Document",
    //   "P"
    // ]
    

    // this.treeOfRenderers = [
    //   {
    //     rendererType: "Document",
    //     componentName: "_document1",
    //     stateVariableData: {},
    //     children: [{
    //       componentName: "_p1",
    //       rendererType: "P",
    //       stateVariableData: { text: "1" },
    //       children: [],
    //     },
    //     {
    //       componentName: "_p2",
    //       rendererType: "P",
    //       stateVariableData: { text: "4" },
    //       children: [],
    //     }
    //     ]
    //   }
    // ]

    // coreReadyCallback();

 

    //Update information in viewer
   

//     let instructions = [
//       {
//         instructionType: "AddComponents",
//         parentComponentName: "_document1",
//         // addedChildrenIndexes:[2,3,4],
//         childIndex:1,
//         components:[{
//           componentName: "_p3",
//           rendererType: "P",
//           stateVariableData: { text: "2" },
//           children: [],
//         },{
//           componentName: "_p4",
//           rendererType: "P",
//           stateVariableData: { text: "3" },
//           children: [],
//         }]

//       }
//     ]

//     setTimeout(() => coreUpdatedCallback(instructions), 2000);

//  let instructions2 = [
//       {
//         instructionType: "DeleteComponents",
//         parentComponentName: "_document1",
//         childNames:["_p1","_p3"],
//         childIndex:0,
//         numberToRemove:2,
//       }]


//     setTimeout(() => coreUpdatedCallback(instructions2), 4000);

//     let instructions3 = [
//       {
//         instructionType: "UpdateStateVariable",
//         newStateVariableValues: {
//           _p4:
//           {
//             text: "One",
//           },
//           _p2:
//           {
//             text: "Two",
//           }
//         }

//       }]


//     setTimeout(() => coreUpdatedCallback(instructions3), 6000);


 