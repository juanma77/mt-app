const About = () => {
    return (
        <>  
           <br/><br/><br/><br/><br/>
           <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">Acerca de esta Aplicación Web</h1>
                <p className="lead">Esta es una aplicación para la detección de intrusos. Se encarga de detectar las expresiones y rasgos faciales de una persona, y dados esos datos de entrada te hará saber si la persona frente a la cámara web es un intruso o no. 
                La aplicación hace uso de una Red Neuronal Convolucional (RNN) para realizar la detección y reconocimiento faciales. </p>
                <hr className="my-4" />
                <p>Para utilizarla debes de iniciar sesión, ¡así que dirígete a la página de Inicio para hacerlo!</p>
            </div>
           </div> 
        </>
    )
};

export default About;