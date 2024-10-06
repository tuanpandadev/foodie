import React, { useEffect } from "react";

import { useAuth } from "@/hooks/use-auth";

import { Loading } from "@/components/loading";

export default function PrivateRouteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, setIsOpenModal } = useAuth();
  useEffect(() => {
    if (!user) {
      setIsOpenModal(true);
    }
  }, [user, setIsOpenModal]);

  if (isLoading) {
    return <Loading />;
  }
  if (user) {
    return children;
  }

  return null;
}
