import { Outlet } from "@remix-run/react";

const Header = () => (
  <header>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item has-text-weight-bold has-text-link" href="/">
          <span className="icon">
            <i className="fas fa-utensils"></i>
          </span>
          RecipeDB
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="footer">
    <div className="content has-text-centered">
      <p>
        &copy; 2024. All rights reserved.
      </p>
    </div>
  </footer>
);

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}