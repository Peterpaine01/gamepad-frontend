import { Link } from "react-router-dom";

// Images

// PDF

// Je récupère les props
const Header = ({ logo, token }) => {
  return (
    <>
      <header>
        <div className="top-menu">
          <div className="container flex-parent">
            <Link className="logo" to="/">
              <img src={logo} alt="logo Gamepad" />
            </Link>

            <nav className="flex-parent">
              <Link className="btn-light" to={`/favoris`}>
                My Collection
              </Link>
              {token ? (
                <Link className="btn-solid" to={`/`}>
                  Logout
                </Link>
              ) : (
                <>
                  <Link className="btn-solid" to={`/login`}>
                    Login
                  </Link>
                </>
              )}
              {/* Si token existe, c'est que je suis connecté, j'affiche le bouton déconnexion, sinon j'affiche les 2 autres boutons */}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
