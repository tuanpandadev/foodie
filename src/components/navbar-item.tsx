import { Link } from "react-router-dom";

export function NavbarItem() {
  return (
    <>
      <li>
        <Link className="hover:!border-none" to="/">
          Home
        </Link>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li>
              <Link className="hover:!border-none" to="/menu">
                All
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:!border-none">
                Salad
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:!border-none">
                Pizza
              </Link>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Services</summary>
          <ul className="p-2 min-w-40">
            <li>
              <Link to={"/"} className="hover:!border-none">
                Online Order
              </Link>
            </li>
            <li>
              <Link to={"/"} className="hover:!border-none">
                Table Booking
              </Link>
            </li>
            <li>
              <Link to={"/"} className="hover:!border-none">
                Order Tracking
              </Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link to={"/"} className="hover:!border-none">
          Offers
        </Link>
      </li>
    </>
  );
}
