import { LoadingButton } from "@mui/lab";

interface Props {
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  label: string;
  onClick?: any;
}

export const ButtonGradient = ({
  fullWidth,
  disabled,
  loading,
  label,
  onClick,
}: Props) => {
  return (
    <LoadingButton
      disabled={disabled}
      onClick={onClick}
      loading={loading}
      fullWidth={fullWidth}
      type="submit"
      sx={(theme) => ({
        color: "white",
        background:
          "linear-gradient(93.18deg, #2F98FB 8.92%, #9B4AFA 102.88%);",
        height: "36px",
        borderRadius: "5px",
        textTransform: "uppercase",
        "&:hover": {
          opacity: 0.5,
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: 16,
        },
      })}
    >
      {label}
    </LoadingButton>
  );
};
