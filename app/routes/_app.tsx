import { Outlet } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import styles from "~/styles/app.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const Header = () => (
  <header>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item has-text-weight-bold has-text-link" href="/">
          <span className="icon">
            <i aria-hidden="true" className="fas fa-utensils"></i>
          </span>
          Delish.club
        </a>
      </div>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="footer">
    <div className="content has-text-centered">
      <p>&copy; 2024. All rights reserved.</p>
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
