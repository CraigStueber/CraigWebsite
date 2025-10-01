// CSS imports
declare module "*.css";
declare module "*.module.css";

// Image imports
declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "*.jpeg" {
  const value: string;
  export default value;
}
declare module "*.gif" {
  const value: string;
  export default value;
}
declare module "*.svg" {
  import * as React from "react";
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}
declare module "*.webp" {
  const value: string;
  export default value;
}

// Video & media
declare module "*.mp4" {
  const value: string;
  export default value;
}
declare module "*.webm" {
  const value: string;
  export default value;
}
declare module "*.wav" {
  const value: string;
  export default value;
}
declare module "*.mp3" {
  const value: string;
  export default value;
}

// Fonts & other assets
declare module "*.woff";
declare module "*.woff2";
declare module "*.ttf";
declare module "*.eot";
declare module "*.pdf";
