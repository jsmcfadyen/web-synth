import react, { useState } from "react";
import Master_Controls from "../components/master_controls.js";

export default function Home() {
  const [userListOfComponents, setUserListOfComponents] = react.useState([]);

  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"
          rel="stylesheet"
        />
      </head>
      <main className="space-y-4 ">
        <div className=" w-200 h-200 bg-gray-200 border-2 border-black ">
          <div className="m-2 grid grid-cols-3">
            <my_title className="text-5xl">NOISE BOX</my_title>
            <div className="text-right">
              <p>Add a Synthesizer and copy paste this into the text field!</p>
              <code>
                C4 D4 E4 C4 C4 D4 E4 C4 E4 F4 G4 G4 E4 F4 G4 G4 G4 F4 E4 C4 G4
                F4 E4 C4 C4 G3 C4 C4 C4 G3 C4 C4
              </code>
            </div>
            <div>
              {" "}
              <Master_Controls
                list={userListOfComponents}
                setList={setUserListOfComponents}
              />
            </div>
          </div>
          <div>{userListOfComponents}</div>
        </div>
      </main>
    </>
  );
}
