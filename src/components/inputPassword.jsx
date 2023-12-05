import { React, forwardRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOff } from "lucide-react";

const ConfirmPasswordInputWithToggle = forwardRef((props, ref) => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        className="rounded-lg border-black text-lg font-bold"
        type={showConfirmPassword ? "text" : "password"}
        ref={ref}
        {...props}
      />
      <span
        className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      >
        {showConfirmPassword ? (
          <EyeIcon /> // Ganti dengan ikon mata yang sesuai
        ) : (
          <EyeOff /> // Ganti dengan ikon mata yang sesuai
        )}
      </span>
    </div>
  );
});

const PasswordInputWithToggle = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className="rounded-lg border-black text-lg font-bold"
        ref={ref}
        {...props}
      />
      <span
        className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeIcon /> // Ganti dengan ikon mata yang sesuai
        ) : (
          <EyeOff /> // Ganti dengan ikon mata yang sesuai
        )}
      </span>
    </div>
  );
});

export { ConfirmPasswordInputWithToggle, PasswordInputWithToggle };
