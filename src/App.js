import React, { useState, useEffect, useRef } from 'react';
import * as faceApi from 'face-api.js';

function App() {

  // To track part of the screen where user's face will appear 
  const screen = useRef();

  // Height and width for the video on screen 
  const videoAxisY = 480;
  const videoAxisX = 640;

  // To draw landmarks and expressions on the user's face
  const figuresOnFace = useRef();

  // To handle the state of the application; to know when all models are loaded and to scan user's face 
  const [ loadAllModels, setLoadAllModels ] = useState(false);
  const [ scanFace, setScanFace ] = useState(false);

  // Load all models; we need to use a promise due this is an async operation 
  useEffect( () => {

    const allModelsLoaded = async () => {

      const pathToModel = process.env.PUBLIC_URL + '/models';
      
      Promise.all( [
        faceApi.nets.tinyFaceDetector.loadFromUri( pathToModel ),
        faceApi.nets.faceLandmark68Net.loadFromUri( pathToModel ),
        faceApi.nets.faceRecognitionNet.loadFromUri( pathToModel ),
        faceApi.nets.faceExpressionNet.loadFromUri( pathToModel ),
      ] ).then( setLoadAllModels( true ) );

    }

    allModelsLoaded();

  }, [] );


  return (
    <div>
      
    </div>

  );
}

export default App;