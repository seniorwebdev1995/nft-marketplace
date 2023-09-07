import MuiLink from "@mui/material/Link";
interface Props {
  label: string;
  path: string;
}

export const HeaderNavLink = ({ label, path }: Props) => {
  return (
    <MuiLink
      href={path}
      color="#FFF"
      underline="none"
      zIndex={200}
      sx={{
        "&.active": {
          color: "primary.main",
        },
      }}
    >
      {label}
    </MuiLink>
  );
};
