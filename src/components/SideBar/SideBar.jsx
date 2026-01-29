import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const firstLetter = (currentUser?.name || "?").trim().charAt(0).toUpperCase();
  const hasAvatar = Boolean(currentUser?.avatar);

  return (
    <aside className="sideBar">
      <div className="sideBar__row">
        {hasAvatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt="User avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{firstLetter}</div>
        )}

        <p className="sideBar__username">{currentUser?.name || "User"}</p>
      </div>

      <div className="sideBar__actions">
        <button
          className="sideBar__button"
          type="button"
          onClick={onEditProfile}
        >
          Edit profile
        </button>

        <button className="sideBar__button" type="button" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </aside>
  );
}
