import React from 'react';
import * as faceApi from 'face-api.js';

const faceModels = {
  anger: "🤬",
  surprise: "😲",
  fear: "😖",
  neutral: "😶",
  happy: "😄",
  sad: "😞"
};

class App extends React.Component {

  startVideo = React.createRef();

  state = { 
    models: [] 
  };

  componentDidMount() {

    this.run();

  }

  run = async () => {
   
    try {

      await faceApi.nets.tinyFaceDetector.load("/models/");

      await faceApi.loadFaceExpressionModel(`/models/`);
      
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        startVideo: { facingMode: "user" }
      });

      this.startVideo.current.srcObject = this.mediaStream;
    } catch (e) {
      this.log(e.name, e.message, e.stack);
    }
  };



}

export default App;
