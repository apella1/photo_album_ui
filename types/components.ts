export interface ButtonProperties {
  action?: () => void;
  title: string;
  bgColor: string;
  textColor: string;
  rounded?: boolean;
  full?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean | undefined;
}
