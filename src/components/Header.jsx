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
      {/* burger menu */}
      <div className="burger-menu">
        <input
          className="hamburger"
          type="checkbox"
          id="icon-menu-burger"
          tabindex="0"
        />
        <label aria-label="Ouvrir menu" for="icon-menu-burger">
          <span></span>
        </label>
        <nav className="flex-parent menu-mobile">
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
    </>
  );
};

export default Header;
