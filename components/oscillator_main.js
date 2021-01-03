import * as Tone from "tone";

import react from "react";

const Oscillator = () => {
  const [octave, setOctave] = react.useState();
  const [powered, setPowered] = react.useState(false);
  const osc = react.useRef(null);
  const [userNote, setUserNote] = react.useState("C4");
  const autoFilter = react.useRef(null);

  const onButton = () => {
    if (powered) {
      return;
    }
    setPowered(true);
    osc.current = new Tone.OmniOscillator().toDestination();
    osc.current.frequency.value = "C4";
    osc.current.volume.value = -60;
    osc.current.start();

    autoFilter.current = new Tone.AutoFilter("4n").toDestination().start();
  };

  const offButton = () => {
    if (!powered) return;
    osc.current.stop();
    setPowered(false);
  };

  const downOctave = () => {
    osc.current.frequency.value = osc.current.frequency.value / 2;
    setOctave(octave - 1);
  };
  const upOctave = () => {
    osc.current.frequency.value = osc.current.frequency.value * 2;
    setOctave(octave + 1);
  };

  const freqHandler = (event) => {
    if (!powered) return;
    osc.current.frequency.value = event.target.value;
  };
  const filtDepthHandler = (event) => {
    if (!powered) return;
    autoFilter.current.depth.value = event.target.value;
    osc.current.connect(autoFilter.current).start();
  };
  const filtRateHandler = (event) => {
    if (!powered) return;
    autoFilter.current.frequency.value = event.target.value;
    osc.current.connect(autoFilter.current).start();
  };
  const volHandler = (event) => {
    if (!powered) return;
    osc.current.volume.value = event.target.value;
  };

  const submitNote = (event) => {
    if (!powered) return;
    osc.current.frequency.value = userNote;
  };

  return (
    <div className=" border-2 border-black ">
      <div className="flex w-200 h-200 bg-gray-200   m-2 grid grid-cols-4">
        <my_title className="text-1xl m-3">Oscillator</my_title>

        <div className="flex justify-center grid grid-cols-2  ">
          <button className=" border border-gray-700" onClick={onButton}>
            On
          </button>
          <button className="border border-gray-700" onClick={offButton}>
            Off
          </button>
        </div>
        <p className="self-center text-center">
          Single note drone: The LFO is modulating the filter cutoff frequency
        </p>
        <div className="self-center text-center">
          <input
            className="text-center"
            type="text"
            placeholder="C4"
            onChange={(event) => setUserNote(event.target.value)}
          />
          <button onClick={submitNote}>Submit Note</button>
        </div>
      </div>

      <div className="flex grid grid-cols-3">
        <div className="place-self-center justify-center border border-gray-800 p-3">
          <div>
            <input
              type="range"
              id="volume"
              name="volume"
              min="-130"
              max="130"
              value={osc.connect}
              onChange={volHandler}
            />
            <label for="volume">Amplitude Attenuation</label>
          </div>
          <div>
            <input
              type="range"
              id="frequency"
              name="frequency"
              min="60"
              max="2000"
              value={osc.connect}
              onChange={freqHandler}
            />
            <label for="frequency">Frequency</label>
          </div>
        </div>

        <div className="place-self-center justify-center m-6 border border-gray-800 p-3">
          <div>
            <input
              type="range"
              id="filter_lfo_depth"
              name="filter_lfo_depth"
              min="0"
              max="1"
              step="0.05"
              value={osc.connect}
              onChange={filtDepthHandler}
            />
            <label for="filter_lfo_depth">Filter LFO Depth</label>
          </div>
          <div>
            <input
              type="range"
              id="filter_lfo_rate"
              name="filter_lfo_rate"
              min="0"
              max="60"
              value={osc.connect}
              onChange={filtRateHandler}
            />
            <label for="filter_lfo_rate">Filter LFO Rate</label>
          </div>
        </div>

        <div className="place-self-center justify-center m-3 border border-gray-800 p-3">
          <h1 className="text-center">
            <button
              className="border border-gray-700 rounded-md"
              onClick={upOctave}
            >
              Up an Octave
            </button>
          </h1>
          <h1 className="text-center">
            <button
              className="border border-gray-700 rounded-md"
              onClick={downOctave}
            >
              Down an Octave
            </button>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Oscillator;
