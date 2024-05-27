import { ButtonProperties } from "@/types/components";

export default function CustomButton({
  button,
  className,
}: {
  button: ButtonProperties;
  className?: string;
}) {
  const { action, title, bgColor, textColor, rounded, full, type, disabled } =
    button;
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={action}
      className={`${bgColor} px-4 py-2 md:py-3 text-sm lg:text-lg ${textColor} font-medium ${
        full ? "w-full" : "w-fit"
      } ${rounded && "rounded-lg"} ${className}`}
    >
      {title}
    </button>
  );
}
