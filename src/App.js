import React, { useState } from "react";

import "./App.css";
import { ZoomMtg } from "@zoomus/websdk";
import axios from "axios";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.7.0/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

function App() {
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
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
  var registrantToken = "";

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

  function startMeeting(signature) {
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: "",
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: sdkKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
