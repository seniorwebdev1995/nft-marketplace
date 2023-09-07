import { theme } from "../../../../config/theme";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MuiLink from "@mui/material/Link";
import { useBlockchainContext } from "../../../../context";
import { IProject } from "../../../props/IProject";

export const ProjectMembersInfo = ({project}:{project:IProject}) => {
  const { translateLang } = useBlockchainContext();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  const table: { type: "info" | "link"; label: string; value: string, link?: string }[] = [
    {
      type: "info",
      label: translateLang("edition"),
      value: `${project.name} - ${project.artist?.nickname}`,
    },
    {
      type: "info",
      label: translateLang("blockchain"),
      value: "Matic(Polygon) Mainnet",
    },
    {
      type: "link",
      label: translateLang("contractAdress"),
      value: project.address,
      link: `${process.env.REACT_APP_MATIC_URL}/address/${project.address}`,
    },
    // {
    //   type: "link",
    //   label: translateLang("openSea"),
    //   value: "Royal LDS",
    // },
    {
      type: "link",
      label: translateLang("legal"),
      link: "https://metamusik.notion.site/General-ressources-87ab4de0ddd54e9e89a310bf4e2c0fe4",      
      value: "Read now",
    },
  ];

  return (
    <List
      sx={{
        border: { xs: "none", md: "1px solid rgba(255, 255, 255, 0.2)" },
      }}
    >
      {table.map((item, idx) => (
        <ListItem
          key={idx}
          divider={!downMd && idx !== table.length - 1}
          sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <ListItemText
            primary={
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Typography>{item?.label}</Typography>
                {item?.type === "info" ? (
                  <Typography>{item?.value}</Typography>
                ) : (
                  <MuiLink href={item.link} target="_blank" display="inline-flex" alignItems="center">
                    {item?.value}
                    <ArrowRightAltIcon sx={{ marginLeft: 1 }} />
                  </MuiLink>
                )}
              </Stack>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
