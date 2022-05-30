import React from 'react';
import * as faceApi from 'face-api.js';

const faceMap = {
  anger: "🤬",
  surprise: "😲",
  fear: "😖",
  neutral: "😶",
  happy: "😄",
  sad: "😞"
};

class App extends React.Component {

  screen = React.createRef();

  state = { 
    faces: [] 
  };

  componentDidMount() {

    this.execute();

  }

  execute = async () => {
   
    try {

      await faceApi.nets.tinyFaceDetector.load( "/models/" );

      await faceApi.loadFaceExpressionModel( `/models/` );
      
      this.mediaStream = await navigator.mediaDevices.getUserMedia({

        screen: { 
          mode: "user" 
        }

      });

      this.screen.current.srcObject = this.mediaStream;

    } catch ( error ) {

      this.log( error.name, error.message, error.stack );
      
    }
  };

 

}

export default App;
