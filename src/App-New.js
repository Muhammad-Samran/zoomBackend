import React, { useState } from "react";

import "./App.css";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import axios from "axios";

function App() {
  const client = ZoomMtgEmbedded.createClient();
  const [signature, setSignature] = useState();

  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  var signatureEndpoint = "";
  // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
  var sdkKey = "iwVvncOBWw5iLsX85TbqRIr45U0zwkiDxJUy";
  var meetingNumber = "3889031766";
  var role = 0;
  var userName = "samran";
  var userEmail = "samransam12@gmail.com";
  var passWord = "testing";
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view/webinars#join-registered
  var registrantToken = "";
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJpd1Z2bmNPQld3NWlMc1g4NVRicVJJcjQ1VTB6d2tpRHhKVXkiLCJpYXQiOjE2NjIxMjE3MTYsImV4cCI6MTY2MjEyODkxNiwiYXBwS2V5IjoiaXdWdm5jT0JXdzVpTHNYODVUYnFSSXI0NVUwendraUR4SlV5IiwidG9rZW5FeHAiOjE2NjIxMjg5MTZ9.2GtIkMJub17RK5vtdo3zyMR7Se-1d5pHnmER3wKqnWk";

  const getSignature = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          meetingNumber: "3889031766",
          role: 0,
        },
      });
      setSignature(res.data.signature);
      startMeeting(res.data.signature);
      console.log("signature", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const startMeeting = (signature) => {
    let meetingSDKElement = document.getElementById("meetingSDKElement");

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      customize: {
        meetingInfo: [
          "topic",
          "host",
          "mn",
          "pwd",
          "telPwd",
          "invite",
          "participant",
          "dc",
          "enctype",
        ],
        toolbar: {
          buttons: [
            {
              text: "Custom Button",
              className: "CustomButton",
              onClick: () => {
                console.log("custom button");
              },
            },
          ],
        },
      },
    });

    client.join({
      sdkKey: sdkKey,
      signature: signature,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: userName,
      userEmail: userEmail,
      tk: registrantToken,
    });
  };

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
