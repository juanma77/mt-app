import {useNavigate} from 'react-router-dom';

function validateForm( nav ) {

  let user = document.forms[ "loginForm" ][ "loginEmail" ].value;
  let password = document.forms[ "loginForm" ][ "loginPassword" ].value;

  if( user && password === "admin"  ) {

    nav('/dashboard');

  } else {

    alert("Please login using administrator credentials");

  }

}

const Home = () => {

  const navigate = useNavigate();

  return (

    <>
    <div>
      <br/>
      <div className="">
        <center><h1>Bienvenido</h1></center>  
      </div>

      <form name="loginForm" className="container">
        <br/>

        <div className="form-group row">

          <br/>
          <label htmlFor="inputEmail">Nombre de usuario:</label>
          <input type="text" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Jon Snow" name="loginEmail" />

        </div>

        <div className="form-group row">

          <label htmlFor="inputPassword">Contraseña:</label>
          <input type="password" className="form-control" id="inputPassword" placeholder="*****" name="loginPassword"/>

        </div>

        <button type="submit" className="btn btn-primary form-group row" onClick={ () => validateForm(navigate) }   >Iniciar sesión</button>

      </form> 

      

    </div>

    </>

  )
};
  
export default Home;