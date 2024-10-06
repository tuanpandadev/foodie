import { User } from "firebase/auth";
import { FaRegUser } from "react-icons/fa";

import { ProfileDrawer } from "@/components/modals/profile-drawer";
import { useState } from "react";

interface ProfileProps {
  user: User;
}

export function Profile({ user }: ProfileProps) {
  const [idDrawer] = useState("profile-drawer");
  return (
    <ProfileDrawer idDrawer={idDrawer}>
      <label
        htmlFor={idDrawer}
        className="drawer-button btn btn-ghost btn-circle avatar items-center justify-center !flex"
      >
        <div className="rounded-full">
          {user.photoURL ? (
            <img
              src={user.photoURL || "/images/profile.png"}
              alt={user.displayName || "Avatar"}
              className="size-5"
            />
          ) : (
            <div className="indicator">
              <FaRegUser className="size-5" />
            </div>
          )}
        </div>
      </label>
    </ProfileDrawer>
  );
}
