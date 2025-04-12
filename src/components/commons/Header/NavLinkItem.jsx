import { NavLink } from "react-router-dom";

const NavLinkItem = ({ to, label }) => (
  <li key={to}>
    <NavLink
      activeClassName="text-blue-600 underline"
      className="font-medium text-gray-500  hover:text-blue-600"
      to={to}
    >
      {label}
    </NavLink>
  </li>
);

export default NavLinkItem;
