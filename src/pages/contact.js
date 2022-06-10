const Contact = () => {

    return (
        <>  
           <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">About IntruderApp</h1>
                <p className="lead">This is an intrusion detection application. It will detect face expressions and traits, and it will tell you if the person infront of the webcamera is an intruder. 
                But first, you need to login! So go to Home to start using this app. </p>
                <hr className="my-4" />
                <p>It uses a Convolutional Neural Network (CNN) to perform the face tracking and recognition. </p>
                
            </div>
           </div> 
        </>
    )
};

export default Contact;