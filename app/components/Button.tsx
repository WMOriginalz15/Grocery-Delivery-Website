"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-md
        transition
        w-full
        flex
        items-center
        justify-center
        gap-2
        border-2
        ${outline ? "bg-white border-[#43cea2] text-[#43cea2] hover:bg-[#e6f9f4] hover:text-[#185a9d]" : "bg-[#43cea2] border-[#43cea2] text-white hover:bg-[#185a9d] hover:border-[#185a9d]"}
        ${small ? "text-sm font-light py-1 px-2" : "text-md font-semibold py-3 px-4"}
        ${custom ? custom : ""}
        `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
