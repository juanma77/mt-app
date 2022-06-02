import React, {Component} from 'react';
import * as faceApi from 'face-api.js';

const faceModel = {

  neutral: "😶",
  happy: "😄",
  sad: "😞",
  angry: "🤬",
  fearful: "😖",
  disgusted: "🤢",
  surprised: "😲"

};

class App extends Component {

  video = React.createRef();

  state = { 
    expressions: [] 
  };

  componentDidMount() {
    this.execute();
  }

  execute = async () => {
   
    try {

      await faceApi.nets.tinyFaceDetector.load('/models/');
      await faceApi.loadFaceExpressionModel('/models/');

      this.mediaStream = await navigator.mediaDevices.getUserMedia({

        video: { 
          detection: "user" 
        }

      });

      this.video.current.srcObject = this.mediaStream;

    } 
    catch (error) {

      console.log( error );
    
    }
  };

  reproduce = async () => {

    if(this.video.current.paused || this.video.current.ended || !faceApi.nets.tinyFaceDetector.params) {
      
      setTimeout(() => this.reproduce());

      return;
    }

    const options = new faceApi.TinyFaceDetectorOptions({
      inputSize: 512,
      scoreThreshold: 0.5
    });

    const output = await faceApi.detectSingleFace(this.video.current, options).withFaceExpressions();

    if (output) {
      
      const expressions = output.expressions.reduce((precision, { expression, probability }) => {

          precision.push([faceModel[expression], probability]);
          return precision;

        },
        []
      );
      
      this.setState(() => (
        { expressions }
      ));
    }

    setTimeout(() => this.reproduce(), 1000);

  };

  render() {
    return (

      <div className="App">

        <nav class="navbar navbar-dark bg-dark">
          <a class="navbar-brand" href="/">
            IntrusionDetectionApp
          </a>
        </nav>




        <div className="card">
          <div className="card-body">
            <h5 className="card-title">You're being recorder!</h5>
            <h6 className="card-subtitle mb-2 text-muted">Proceeed with caution</h6>
            <p className="card-text">

              Happy face = No intruder
              Angry face = Intruder 
              Neutral face = No intruder

            </p>


            <div>

          {this.state.expressions.sort((expressionsUnordered, expressionsOrdered) => expressionsOrdered[1] - expressionsUnordered[1]).filter((i, j) => j < 3).map(([originalExpressions, finalExpressions]) => (
              <p key={originalExpressions + finalExpressions}>
                {originalExpressions} {finalExpressions}
              </p>
            ))}
            
        </div>
        <div>
          <video onPlay={this.reproduce} ref={this.video} autoPlay />
        </div>
           
          </div>
        </div>


        
      </div>

    );
  }
}

export default App; 