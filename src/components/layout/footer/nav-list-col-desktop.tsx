import Stack from "@mui/material/Stack";
import { FooterNavListColItem } from "./nav-list-col-item";

interface Props {
  title: string;
  titleColor?: string;
  data: { label: string; href?: string, newTab?: boolean }[];
}


export const FooterNavListColDesktop = ({
  title,
  titleColor = "primary.main",
  data,
}: Props) => {
  return (
    <Stack
      sx={{ display: { xs: "none", md: "flex" } }}
      spacing={{ xs: 1, md: "4px" }}
    >
      <FooterNavListColItem label={title} titleColor={titleColor} />
      {data.map((item) => (
        <FooterNavListColItem
          key={item?.label}
          label={item?.label}
          href={item?.href}
          newTab={item?.newTab}
        />
      ))}
    </Stack>
  );
};
