import { styled } from "@mui/material/styles";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Card, CardMedia, Stack, Typography } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import { IProject } from "../props/IProject";
import { convertFromISODateWithFormat, toFixed } from "../../utils";

interface CardNftProps {
  coverUrl: string;
  project: IProject;
  imgHeight?: BoxProps["height"];
}

const CardBorder = styled(Box)(
  () => ({
    borderRadius: "4px",
    padding: "2px",
    overflow: "hidden",
    background: "linear-gradient(153.71deg, #5F5F5F 1.03%, #9DB7C9 51.87%, #705BC5 106.43%);",
  })
);

export const CardNewProject = ({
  coverUrl, project
}: CardNftProps) => (
    <CardBorder
      marginBottom={3}
      color="white"
    >
      <Card>
        <CardMedia
          component="img"
          height="228px"
          src={coverUrl || "/img/author/author-9.jpg"}
        />
        <Stack
          sx={{
            padding: "16px",
            background: "linear-gradient(110.56deg, rgba(255, 255, 255, 0.5) 2.43%, rgba(255, 255, 255, 0.5) 54.82%, rgba(204, 200, 196, 0) 106.69%);"
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarTodayOutlinedIcon sx={{fontSize: 16}} />
            <Typography sx={{fontSize: "14px", fontWeight: 400}}>
              {convertFromISODateWithFormat(project.createdAt, "DD/MM/YY HH:mm")}
            </Typography>
          </Stack>
          <Typography sx={{marginTop: "16px", fontSize: " 24px", fontWeight: 700}} noWrap>{project.name}</Typography>
          <Stack direction="row" justifyContent="space-between" marginTop="16px">
            <Stack spacing="4px">
              <Typography sx={{fontSize: "28px", fontWeight: 700}}>{project.artistRevenue?.toFixed(2) || 0}</Typography>
              <Typography sx={{fontSize: "12px", fontWeight: 400}}>Of sales (EUR)</Typography>
            </Stack>
            <Stack width="40%" spacing="4px">
              <Typography sx={{fontSize: "28px", fontWeight: 700}}>{toFixed(project.conversionRate, 2) || 0}%</Typography>
              <Typography sx={{fontSize: "12px", fontWeight: 400}}>Conversion rate</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" marginTop="16px">
            <Stack spacing="4px">
              <Typography sx={{fontSize: "28px", fontWeight: 700}}>{project.visitorCount || 0}</Typography>
              <Typography sx={{fontSize: "12px", fontWeight: 400}}>Visitors</Typography>
            </Stack>
            <Stack width="40%" spacing="4px">
              <Typography sx={{fontSize: "28px", fontWeight: 700}}>{project.saleCount || 0}</Typography>
              <Typography sx={{fontSize: "12px", fontWeight: 400}}>Sales</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </CardBorder>
);
