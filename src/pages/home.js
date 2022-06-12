import { useNavigate } from 'react-router-dom';

// Function to validate user is using right credentials on login 
function validateForm( navigate ) {

  let user = document.forms[ "loginForm" ][ "loginUser" ].value;
  let password = document.forms[ "loginForm" ][ "loginPassword" ].value;

  if( user && password === "admin"  ) {

    navigate("/dashboard");

  } else {

    alert( "Please use the admininistrator credentials" );
    return false; 
   
  }

}

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
    <div>
      <br/>
      <div className="">
        <center><h1>¡Bienvenido!</h1></center>  
      </div>
      <form name="loginForm" className="container" id="loginForm">
        <br/>
        <div className="form-group row">
          <br/>
          <label htmlFor="inputUser">Usuario:</label>
          <input type="text" className="form-control" id="inputUser" placeholder="admin" name="loginUser" required />
        </div>

        <div className="form-group row">
          <label htmlFor="inputPassword">Contraseña:</label>
          <input type="password" className="form-control" id="inputPassword" placeholder="*****" name="loginPassword" required/>
        </div>
        <button type="submit" className="btn btn-primary form-group row" onClick={ () => validateForm(navigate) } >Inicar sesión</button>
        <div className= "container">
          <small id="loginHelp" className="form-text text-muted">NOTA: Por favor utiliza "admin" y "admin" como usuario y contraseña, respectivamente</small>
        </div>
      </form> 
    </div>
    </>
  )
};
  
export default Home;