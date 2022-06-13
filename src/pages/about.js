const About = () => {
    return (
        <>  
           <br/><br/>
           <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">Acerca de esta Aplicación Web</h1>
                <p className="lead">Esta es una aplicación para la detección de intrusos. Se encarga de detectar los rasgos faciales de una persona, examinando la posición de sus <b>ojos, nariz, boca, cejas y contorno del rostro </b>.
                A su vez, detecta <b>la edad, el género y la expresión facial</b> que tiene la persona (<b>tristeza, enojo, sorpresa, felicidad</b>). Dados estos parámetros de entrada te hará saber si la persona que pasa frente a la cámara web es o no un intruso.
                La aplicación hace uso de una <b>Red Neuronal Convolucional (RNN) </b> para realizar la detección y reconocimiento facial. </p>
                <hr className="my-4" />
                <p>Para utilizarla debes de iniciar sesión, ¡así que dirígete a la página de Inicio para hacerlo!</p>
            </div>
           </div> 
        </>
    )
};

export default About;