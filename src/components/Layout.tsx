import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header className="navbar" style={{ position: 'relative', background: 'rgba(6,8,22,0.95)' }}>
        <div className="container">
          <Link to="/" className="brand">
            <span className="brand-badge">PC</span>
            <span>PixelCraft</span>
          </Link>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div className="footer-brand">
            <span>PixelCraft</span>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} PixelCraft. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;