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
        faceApi.nets.ageGenderNet.loadFromUri( pathToModel )
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
        console.error( "La aplicación encontró un error al intentar iniciar la cámara web:", err );
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
        const traits = await faceApi.detectAllFaces( screen.current, new faceApi.TinyFaceDetectorOptions() ).withFaceLandmarks().withFaceExpressions().withAgeAndGender();

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

        // To locate text with age and gender on the user's face 
        traitsWithNewDimensions.forEach( trait => {

          const { age, 
                  gender, 
                  genderProbability } = trait

          new faceApi.draw.DrawTextField(

          [ `Age: ${ age.toPrecision(2) } years`, `Gender: ${gender} (${ genderProbability.toPrecision(2)} )` ],

          trait.detection.box.bottomRight

          ).draw(figuresOnFace.current)

        })
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
            <button className="btn btn-warning" onClick={ stopRecording }>
              Detener detección
            </button>
            :
            <div>

              <br/>
              <div className="container">
                <div className="jumbotron">
                  <h1 className="display-4">Antes de iniciar, algunos tips:</h1>
                  <p className="lead"> Al presionar el botón de "Detectar intrusos" se requerirá que 
                  le otorgue permiso al navegador para utilizar tu cámara web.</p>
                  <p className="lead">Para una adecuada detección de expresiones y rasgos faciales, asegúrate de tener una distancia media entre tu rostro y la cámara web.</p>
                  <p className="lead">El proceso de detección puede consumir recursos, por lo que te recomendamos cerrar otras aplicaciones. </p>
                  <hr className="my-4" />
                  <p>¡Adelante, a detectar intrusos!</p>
                </div>
              </div> 
              <button onClick={ recordingHasStarted } className="btn btn-primary">
              Detectar intrusos
              </button>
            </div>
        }
      </div>
      {
        scanFace ?
          loadAllModels ?
          <div class="container">
            <div class="row">
              <div class="col">
                <div>
                  <div>
                    <div style={ { display: 'flex', justifyContent: 'center', padding: '10px' } }>
                      <video width={ videoAxisX } height={ videoAxisY } ref={ screen } onPlay={ handleVideoOnPlay } style={ { borderRadius: '10px' } } />
                      <canvas ref={ figuresOnFace } style={ { position: 'absolute' } } />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                  <div className="" style={{ width: '18rem' }}>             
                    <table class="table" style={ { fontSize: '11px' } }>
                      <thead class="thead-dark">
                        <tr>
                          <th scope="col">Expresión</th>
                          <th scope="col">Rasgo no detectado</th>
                          <th scope="col">Probabilidad de intruso</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Sorpresa</td>
                        <td>Boca, nariz u ojos</td>
                        <td>Muy probable</td>
                      </tr>
                      <tr>
                        <td>Enojo</td>
                        <td>Boca, nariz u ojos</td>
                        <td>Muy probable</td>
                      </tr>
                      <tr>
                        <td>Felicidad</td>
                        <td>Ninguno</td>
                        <td>Muy probable</td>
                      </tr>
                      <tr>
                        <td>Neutral</td>
                        <td>Boca, nariz u ojos</td>
                        <td>Probable</td>
                      </tr>
                      <tr>
                        <td>Sorpresa</td>
                        <td>Ninguno</td>
                        <td>Probable</td>
                      </tr>
                      <tr>
                        <td>Enojo</td>
                        <td>Ninguno</td>
                        <td>Probable</td>
                      </tr>
                      <tr>                     
                        <td>Felicidad</td>
                        <td>Ninguno</td>
                        <td>No muy probable</td>
                      </tr>
                      <tr>
                        <td>Neutral</td>
                        <td>Ninguno</td>
                        <td>No muy probable</td>
                      </tr>
                      <tr>
                        <td>Enojo</td>
                        <td>Ninguno</td>
                        <td>No muy probable</td>
                      </tr>
                      <tr>
                        <td>Cualquiera</td>
                        <td>Boca, nariz u ojos</td>
                        <td>Muy probable</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
              </div>
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