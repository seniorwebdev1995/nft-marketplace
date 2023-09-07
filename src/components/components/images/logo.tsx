import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

export const Logo = (
  props: Partial<
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
  >
) => {
  return <img {...props} src={"/img/logo.png"} alt="logo Metamusik" />;
};
