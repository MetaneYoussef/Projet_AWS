import React, { useState } from "react";
import './Connexion.css';
import { Link } from "react-router-dom";

function Connexion() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="connexion-container">
      <div className="left-section">
        {/* Insérez votre image ici */}
      </div>
      <div className="right-section">
        <div className="logo-container" style={{ position: 'relative', textAlign: 'center' }}>
          <Link to="/"> {/* Use Link component with the destination path */}
            <img src={require("./RondSansFond.png")} alt="Votre logo" style={{ width: '140px', height: 'auto', zIndex: 1, position: 'relative' }} />
          </Link>
          <div className="circle-logo-background"></div>
        </div>
        <div className="login-box">
          <h2>S'identifier</h2>
          <form>
            <label htmlFor="email" >Adresse e-mail</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">S'identifier</button>
            <br></br>
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="rememberMe">Se souvenir de moi</label>
            </div>
          </form>
          <div className="signup-link">
            <p>Première visite sur What To Watched ?</p>
            <p><a href="/inscription">Inscrivez-vous</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;