import { useState } from "react";

export function usePasswordVisibility() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handlePasswordVisiblity = (e) => {
    e.preventDefault();
    setIsPasswordVisible((cond) => !cond);
  };

  return { isPasswordVisible, handlePasswordVisiblity };
}
