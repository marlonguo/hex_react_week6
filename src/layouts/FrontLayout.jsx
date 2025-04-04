import { NavLink, Outlet } from "react-router-dom";

const routes = [
  { path: "/", name: "首頁" },
  { path: "/products", name: "產品列表" },
  { path: "/cart", name: "購物車" },
  { path: "/admin", name: "後臺登入" },
];

export default function FrontLayout() {
  return (
    <>
      <nav className="container-fluid navbar navbar-expand-lg">
        <div
          className="collapse navbar-collapse bg-danger-subtle"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {routes.map((route) => (
              <li key={route.path} className="nav-item">
                <NavLink
                  className="nav-link fs-3"
                  aria-current="page"
                  to={route.path}
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
