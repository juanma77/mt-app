const Contact = () => {
    return (
        <>  
            <br/><br/><br/><br/><br/>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div className="card" style={{ width: '18rem' }}>
                            <a href="https://github.com/juanma77"><img src={ "../images/github.png" } className="card-img-top" alt="Author GitHub page " /></a>
                            <div className="card-body">
                                <h5 className="card-title">GitHub</h5>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={ "../images/author.PNG" } className="card-img-top" alt="Author GitHub page " />
                            <div className="card-body">
                                
                                <h5 className="card-title">Autor</h5>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div className="card" style={{ width: '18rem' }}>
                            <a href="https://www.linkedin.com/in/juan-manuel-l%C3%B3pez-santana-094486104/"><img src={ "../images/linkedin.png" } className="card-img-top" alt="Author Linkedin page " /></a>
                            <div className="card-body">
                                <h5 className="card-title">LinkedIn</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Contact;