import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLocalShipping, MdEmail } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

import { useAuth } from "@/hooks/use-auth";

import { DrawerProvider } from "@/components/providers/drawer-provider";

interface ProfileDrawerProps {
  children: React.ReactNode;
  idDrawer: string;
}

export function ProfileDrawer({ children, idDrawer }: ProfileDrawerProps) {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logout successful");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <DrawerProvider idDrawer={idDrawer}>
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label
          htmlFor={idDrawer}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full flex w-80 p-4 overflow-y-auto overflow-x-hidden">
          {/* Header Drawer */}
          <div className="flex flex-col flex-none">
            <div className="flex w-full justify-center items-center gap-x-2">
              {/* Avatar */}
              <div className="avatar">
                <div className="w-12">
                  <img
                    src={user?.photoURL || "/images/profile.png"}
                    alt="Avatar"
                    className="bg-gray-200 p-[2px] rounded-full w-28 h-28"
                  />
                </div>
              </div>
              {/* Name & email */}
              <div className="flex flex-col">
                <span>{user?.displayName}</span>
                <span>{user?.email}</span>
              </div>
            </div>
            <hr className="w-4/5 mx-auto mt-6 my-3" />
          </div>

          {/* Body Drawer */}
          <div className="flex-1">
            <li>
              <a className="flex gap-x-3" href="/profile/update-profile">
                <CgProfile className="size-6" />
                <span>My Profile</span>
              </a>
            </li>
            <li>
              <a className="flex gap-x-3">
                <MdOutlineLocalShipping className="size-6" />
                <span>My Order</span>
              </a>
            </li>
            <li>
              <a className="flex gap-x-3">
                <IoSettingsSharp className="size-6" />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a className="flex gap-x-3">
                <MdEmail className="size-6" />
                <span>Contact Us</span>
              </a>
            </li>
          </div>

          <div className="flex-none">
            <li>
              <a className="flex gap-x-3" onClick={() => handleLogout()}>
                <IoIosLogOut className="size-6" />
                <span>Logout</span>
              </a>
            </li>
          </div>
        </ul>
      </div>
    </DrawerProvider>
  );
}
