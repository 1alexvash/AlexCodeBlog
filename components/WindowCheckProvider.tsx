import React, { useEffect, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

const WindowCheckProvider = ({ children }: Props) => {
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCheckingSession(false);
    }
  }, [checkingSession]);

  if (checkingSession) {
    return <React.Fragment />;
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
};

export default WindowCheckProvider;
