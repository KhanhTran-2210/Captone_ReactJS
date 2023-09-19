import React from "react";
import { useUserContext } from "../../contexts/UserContext/UserContext";

export default function Header() {
  const { currentUser, handleSignout } = useUserContext();
  return (
    <div>
      <h1>Đây là header</h1>
      {currentUser && (
        <div>
          <p>{currentUser.hoTen}</p>
          <button onClick={handleSignout}>Đăng xuất</button>
        </div>
      )}
    </div>
  );
}
