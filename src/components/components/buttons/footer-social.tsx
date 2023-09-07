import IconButton from "@mui/material/IconButton";

interface Props {
  label: string;
  link: string;
  background: string;
}


export const ButtonFooterSocial = ({
  background,
  label,
  link,
}: Props) => {

  return (
    <IconButton
      href={link}
      sx={{
        width: "40px",
        height: "40px",
        background: background,
        borderRadius: "8px",
      }}
    >
      <img
        src={`/img/social-${label}.svg`}
        alt={label}
      />
    </IconButton>
  );
};
