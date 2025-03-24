import { NavLink, Outlet } from "react-router-dom";

const routes = [
  { path: "/", name: "前台首頁" },
  { path: "/admin/products", name: "產品列表" },
  // { path: "/admin", name: "後臺登入" },
];

export default function BackLayout() {
  return (
    <>
      <nav className="container-fluid navbar navbar-expand-lg bg-danger-subtle">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {routes.map((route) => (
              <li key={route.path} className="nav-item">
                <NavLink
                  className="nav-link fs-2"
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
