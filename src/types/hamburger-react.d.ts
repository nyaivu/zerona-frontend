declare module "hamburger-react" {
  import * as React from "react";

  interface HamburgerProps {
    toggled?: boolean;
    toggle?: (toggled: boolean) => void;
    size?: number;
    color?: string;
    rounded?: boolean;
    label?: string;
    duration?: number;
    distance?: "sm" | "md" | "lg";
    easing?: string;
    hideOutline?: boolean;
  }

  export const Twirl: React.FC<HamburgerProps>;
  export const Squash: React.FC<HamburgerProps>;
  export const Spin: React.FC<HamburgerProps>;
  export const Spiral: React.FC<HamburgerProps>;
  export const Cross: React.FC<HamburgerProps>;
}
