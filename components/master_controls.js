import * as Tone from "tone";

import react from "react";
import Sequencer from "./sequencer.js";
import Oscillator from "./oscillator_main.js";
import Drum from "./drum.js";

const Master_Controls = (props) => {
  return (
    <div>
      <div className="w-50 h-50 bg-gray-200 border-2 border-black p-6 m-2 text-center">
        <h1>Master Controls</h1>
        <div className="p-2 m-2 grid grid-rows-2">
          <button
            className="border border-gray-700 rounded-md p-3 bg-blue-200"
            onClick={() => props.setList([...props.list, <Sequencer />])}
          >
            Add Synthesizer
          </button>
          <button
            className="border border-gray-700 rounded-md p-3 bg-blue-200"
            onClick={() => props.setList([...props.list, <Oscillator />])}
          >
            Add Oscillator
          </button>
          <button
            className="border border-gray-700 rounded-md p-3 bg-blue-200"
            onClick={() => props.setList([...props.list, <Drum />])}
          >
            Add Drum Machine
          </button>
        </div>
      </div>
    </div>
  );
};

export default Master_Controls;
