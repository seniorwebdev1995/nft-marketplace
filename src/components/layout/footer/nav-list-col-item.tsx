import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { Typography } from "@mui/material";

interface Props {
  label: string;
  titleColor?: string;
  href?: string;
  newTab?: boolean;
}

export const FooterNavListColItem = ({
  label,
  titleColor,
  href = "/",
  newTab = true,
}: Props) => {
  return titleColor ? (
    <Typography
      textTransform={"uppercase"}
      variant="bodyB1"
      color={titleColor}
      gutterBottom
    >
      {label}
    </Typography>
  ) : (
    <MuiLink href={href} target={newTab ? "_blank" : ""} sx={{
      color: "white",
      textDecoration: "none",
      paddingBottom: {
        xs: 1
      }
    }}>
      {label}
    </MuiLink>
  );
};
