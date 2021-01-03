import * as Tone from "tone";
import react from "react";

const Sequencer = () => {
  const synth = react.useRef(null);
  const pattern = react.useRef(null);
  const [userPattern, setUserPattern] = react.useState([
    "C4",
    "E4",
    "G4",
    "B4",
    "C5",
    "B4",
    "G4",
    "E4",
  ]);
  const [userStringPattern, setUserStringPattern] = react.useState("");
  const [isPlaying, setIsPlaying] = react.useState(false);

  const string_to_array = (str) => {
    return str.trim().split(" ");
  };

  const pattern_start = () => {
    if (isPlaying) return;

    pattern.current = new Tone.Pattern(function (time, note) {
      synth.current.triggerAttackRelease(note, 0.5, time);
    }, userPattern);
    pattern.current.playbackRate = speed;
    synth.current = new Tone.Synth();
    synth.current.toMaster();
    synth.current.volume.value = -40;
    pattern.current.start(0);
    Tone.Transport.start();
    setIsPlaying(true);
  };

  const pattern_stop = () => {
    if (!isPlaying) return;
    pattern.current.stop();
    setIsPlaying(false);
  };

  const submit_pattern = () => {
    setUserPattern(string_to_array(userStringPattern));
  };

  const volHandler = (event) => {
    synth.current.volume.value = event.target.value;
  };

  const [speed, setSpeed] = react.useState(1);
  const speedUp = () => {
    setSpeed(speed + 1);
    pattern.current.playbackRate = speed;
  };
  const slowDown = () => {
    if (pattern.current.playbackRate == 1) return;
    setSpeed(speed - 1);
    pattern.current.playbackRate = speed;
  };

  return (
    <div className=" border-2 border-black ">
      <my_title className="text-1xl m-3">Sequencer</my_title>
      <div className="flex w-200 h-200 bg-gray-200p-6 m-3 grid grid-cols-5  ">
        <div className="place-self-center justify-center border border-gray-800 p-3">
          <div>
            <input
              type="range"
              id="volume"
              name="volume"
              min="-60"
              max="130"
              onChange={volHandler}
            />
            <label for="volume">Volume</label>
          </div>
        </div>
        <div className="text-center place-self-center ">
          <p className="text-center justify-center">
            Enter a sequence of notes in scientific pitch notation:
          </p>
          <p className="text-center"> ex. "C4 E4 G4 E4 Fb4 E#4"</p>
        </div>
        <input
          className="text-center my-10"
          type="text"
          placeholder="C4 E4 G4 B4 C5 B4 G4 E4"
          onChange={(event) => setUserStringPattern(event.target.value)}
        />
        <div className="place-self-center ">
          <button
            className="border border-gray-700 rounded-md p-3 m-5 bg-blue-200"
            onClick={submit_pattern}
          >
            Submit Pattern
          </button>
        </div>

        <div className="place-self-center justify-center border border-gray-800 p-3">
          <div className="place-self-center justify-center border border-gray-800 p-3">
            <h1>
              <button
                className="border border-gray-700 rounded-md p-2"
                onClick={pattern_start}
              >
                Start Pattern
              </button>
            </h1>
            <h1>
              <button
                className="border border-gray-700 rounded-md  p-2"
                onClick={pattern_stop}
              >
                Stop Pattern
              </button>
            </h1>
          </div>
          <div className="place-self-center justify-center border border-gray-800 p-3">
            <h1>
              <button
                className="border border-gray-700 rounded-md p-2"
                onClick={speedUp}
              >
                Double Speed
              </button>
            </h1>
            <h1>
              <button
                className="border border-gray-700 rounded-md  p-2"
                onClick={slowDown}
              >
                Half Speed
              </button>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sequencer;
