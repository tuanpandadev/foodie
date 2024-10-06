import React from "react";

import { AuthContext } from "@/components/providers/auth-provider";

export const useAuth = () => {
  return React.useContext(AuthContext);
};
