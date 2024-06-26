import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <div className="grid gap-10">
          <Link className="p-2 g-col-2" to="/issues/list">
            Issues List
          </Link>
          <Link className="p-2 g-col-2" to="/issues/list-infinitescroll">
            Issues Infinite Scroll
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
