import { NavLink, Outlet } from "react-router-dom";

const routes = [
  { path: "/", name: "首頁" },
  { path: "/products", name: "產品列表" },
  { path: "/cart", name: "購物車" },
];

export default function FrontLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {routes.map((route) => (
                <li key={route.path} className="nav-item">
                  <NavLink
                    className="nav-link text-light"
                    aria-current="page"
                    to={route.path}
                  >
                    {route.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
