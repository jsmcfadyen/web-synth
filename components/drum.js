import * as Tone from "tone";
import react from "react";

const Sampler = () => {
  const hiHat = react.useRef(null);
  const pattern = react.useRef(null);
  const [isPowered, setPowered] = react.useState(false);
  const [isPlaying, setIsPlaying] = react.useState(false);
  const [userStringPattern, setUserStringPattern] = react.useState("");
  const [userPattern, setUserPattern] = react.useState([
    "8n",
    "8n",
    "8n",
    "8n",
  ]);

  const string_to_array = (str) => {
    return str.trim().split(" ");
  };
  const pattern_start = () => {
    hiHat.current = new Tone.NoiseSynth().toDestination();
    setPowered(true);

    if (isPlaying) return;

    pattern.current = new Tone.Pattern(function (time, note) {
      hiHat.current.triggerAttackRelease(note, 0.5, time);
    }, userPattern);

    hiHat.current = new Tone.Synth();
    hiHat.current.toMaster();
    pattern.current.start(0);
    Tone.Transport.start();
    setIsPlaying(true);
  };

  const pattern_stop = () => {
    if (!isPowered) return;
    if (!isPlaying) return;
    pattern.current.stop();
    setIsPlaying(false);
  };

  return (
    <div className=" border-2 border-black ">
      <div className="flex w-200 h-200 bg-gray-200   m-2 grid grid-cols-5">
        <my_title className="text-1xl m-3">Drum Machine</my_title>
        <div></div>
        <div></div>
        <div></div>
        <div className="place-self-center justify-center border border-gray-800 p-3">
          <button
            className="border border-gray-700 rounded-md  p-2"
            onClick={pattern_start}
          >
            Start Kick
          </button>
          <button
            className="border border-gray-700 rounded-md  p-2"
            onClick={pattern_stop}
          >
            Stop Kick
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sampler;
