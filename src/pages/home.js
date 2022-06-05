import {useNavigate} from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  return (

    <>
      <br/>
      <div className="">
        <center><h1>Bienvenido</h1></center>  
      </div>
      <form className="container">
        <br/>
        <div className="form-group row">
          <br/>
          <label htmlFor="exampleInputEmail1">Correo electrónico:</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ejemplo@gmail.com" />
        </div>
        <div className="form-group row">
          <label htmlFor="exampleInputPassword1">Contraseña:</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="*****" />
        </div>

        <button type="submit" className="btn btn-primary form-group row" onClick={ () => navigate('/dashboard') }>Iniciar sesión</button>

    </form> 

    </>

  )
};
  
export default Home;