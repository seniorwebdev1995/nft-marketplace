import { CircleBlur } from "../../components/circle-blur";
import { ReactNode } from "react";
import { FooterNav } from "../footer/nav";

import { Header } from "../header/header";
import { HeaderButtonsProps } from "../header/header-buttons";

interface Props extends HeaderButtonsProps {
  children: ReactNode;
}

export const LayoutDefault = ({
  children,
  login,
  contact,
  ...metaProps
}: Props) => {
  return (
    <div>
      <CircleBlur
        background="secondary.main"
        width="100%"
        height="100%"
        blur="100px"
        propsStyle={{
          maxWidth: "614px",
          maxHeight: "614px",
          position: "absolute",
          left: "-215px",
          top: "-248px",
          opacity: "0.2",
        }}
      />
      <Header contact={contact} />
      <main>{children}</main>
      <FooterNav />
    </div>
  );
};
