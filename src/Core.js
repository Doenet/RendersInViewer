//Super lame core.  Just hardcoded lifecycle method calls.

class Core {
  constructor({ coreReadyCallback, coreUpdatedCallback }) {

    this.fullListOfRenderers = [
      "Document",
      "P"
    ]

    this.treeOfRenderers = [
      {
        rendererType: "Document",
        componentName: "_document1",
        stateVariableData: {},
        children: [{
          componentName: "_p1",
          rendererType: "P",
          stateVariableData: { text: "1" },
          children: [],
        },
        {
          componentName: "_p2",
          rendererType: "P",
          stateVariableData: { text: "2" },
          children: [],
        }
        ]
      }
    ]

    // coreReadyCallback();

    //** Timed method calls **
    //Let viewer know we are ready
    setTimeout(coreReadyCallback, 0);

    //Update information in viewer
    let instructions = [
      {
        instructionType: "UpdateStateVariable",
        newStateVariableValues: {
          _p1:
          {
            text: "hello",
          },
          _p2:
          {
            text: "there",
          }
        }

      },
      {
        instructionType: "UpdateStateVariable",
        newStateVariableValues: {
          _p1:
          {
            text: "one",
          },
          _p2:
          {
            text: "two",
          }
        }

      }]
    setTimeout(() => coreUpdatedCallback(instructions), 2000);

  }
}

export default Core;