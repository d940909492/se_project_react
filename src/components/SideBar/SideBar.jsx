import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

export default function SideBar() {
  return (
    <aside className="sideBar">
      <div className="sideBar__row">
        <img className="sidebar__avatar" src={avatar} alt="User avatar" />
        <p className="sideBar__username">Terrence Tegegne</p>
      </div>
    </aside>
  );
}
