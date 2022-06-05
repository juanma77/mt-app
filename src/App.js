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

  // Start the recording calling the navigator object, and handling the error if it exists 
  const recordingHasStarted = () => {

    setScanFace( true );

    navigator.mediaDevices.getUserMedia( { video: { width: 300 } }).then( stream => {
        
      let video = screen.current;
        video.srcObject = stream;
        video.play();

      } )
      .catch( err => {
        console.error( "The application has encounter an error while starting the video:", err );
      });

  }

  // When recording started, we perform all operations we need on the user's face, so we draw landmarks, expressions and detections on it 
  const handleVideoOnPlay = () => {

    setInterval( async () => {

      if ( figuresOnFace && figuresOnFace.current ) {
        
        figuresOnFace.current.innerHTML = faceApi.createCanvasFromMedia( screen.current );

        const screenWindow = {
          width: videoAxisX,
          height: videoAxisY
        }

        // To match the face landmarks and face expressions with the user's face 
        faceApi.matchDimensions( figuresOnFace.current, screenWindow );

        // Call API to draw face landmarks and face expressions 
        const traits = await faceApi.detectAllFaces( screen.current, new faceApi.TinyFaceDetectorOptions() ).withFaceLandmarks().withFaceExpressions();

        // We need to resize traits and screen 
        const traitsWithNewDimensions = faceApi.resizeResults( traits, screenWindow );

        // Draw rectangle around user's face 
        figuresOnFace && figuresOnFace.current && figuresOnFace.current.getContext( '2d' ).clearRect (0, 0, videoAxisX, videoAxisY );

        // Traits are rendered with their new dimensions on screen  
        figuresOnFace && figuresOnFace.current && faceApi.draw.drawDetections( figuresOnFace.current, traitsWithNewDimensions );

        // Colocate face landmarks on the user's face  
        figuresOnFace && figuresOnFace.current && faceApi.draw.drawFaceLandmarks( figuresOnFace.current, traitsWithNewDimensions );

        // Locate face exressions on the user's face 
        figuresOnFace && figuresOnFace.current && faceApi.draw.drawFaceExpressions( figuresOnFace.current, traitsWithNewDimensions );

      }
    }, 100 )
  }

  // Stop the video recording 
  const stopRecording = () => {

    screen.current.pause();
    screen.current.srcObject.getTracks()[ 0 ].stop();
    setScanFace( false );

  }

  return (
    <div>
      <div style={ { textAlign: 'center', padding: '10px' } }>
        {
          scanFace && loadAllModels ?
            <button onClick={ stopRecording } 
                    style={ { cursor: 'pointer', backgroundColor: 'red', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' } }>
              Stop recording
            </button>

            :

            <button onClick={ recordingHasStarted } 
                    style={ { cursor: 'pointer', backgroundColor: 'blue', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' } }>
              Start recording
            </button>
        }
      </div>
      
      {
        scanFace ?
          loadAllModels ?
            <div>
              <div style={ { display: 'flex', justifyContent: 'center', padding: '10px' } }>
                <video width={ videoAxisX } height={ videoAxisY } ref={ screen } onPlay={ handleVideoOnPlay } style={ { borderRadius: '10px' } } />
                <canvas ref={ figuresOnFace } style={ { position: 'absolute' } } />
              </div>
            </div>
            :
            <div>Please wait...</div>
          :
          <>
          </>
      }
            
    </div>

  );
}

export default App;