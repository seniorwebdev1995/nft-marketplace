import { useMemo, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Stack,
} from "@mui/material";

import { ButtonGradient } from "../../../components/buttons/button-gradient";
import { NoItems } from "./no-items";
import { useBlockchainContext } from "../../../../context";

import { theme } from "../../../../config/theme";
import { IProject } from "../../../props/IProject";

import { CardNewProject } from "../../../components/card-new-project";
import { NewProjectModal } from "./new-project-modal";
import { NewProjectSuccessModal } from "./new-collection-success-modal";


export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface Stats {
  buyers: number;
  sales: number;
  amountUSD: number;
}


type NftCollectionProps = {
  projects: IProject[];
  prCreated: () => void;
}

export const NftCollection = ({ projects, prCreated }: NftCollectionProps) => {
  const { auth } = useBlockchainContext();
  const profileComplete = useMemo(() => {
    var percentage = 0;
    if (auth) {
      if (auth.nickname) {
        percentage += 20;
      }
      if (auth.biography) {
        percentage += 20;
      }
      if (auth.avatarUrl) {
        percentage += 20;
      }
      if (auth.bannerUrl) {
        percentage += 20;
      }
      if (auth.genres && auth.genres.length > 0) {
        percentage += 20;
      } 
    }
    return percentage;
  }, [auth]);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const [coverUrl, setSoverUrl] = useState("");
  const [nickName, setNickName] = useState("");
  const [projectName, setProjectName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  }

  const handleProjectCreated = ({ coverUrl, nickName, projectName }) => {
    setSoverUrl(coverUrl);
    setNickName(nickName);
    setProjectName(projectName);

    setOpen(false);
    setOpenSuccess(true);
    prCreated();
  }

  const handleProjectCreatedOkay = () => {
    setOpenSuccess(false);
  }

  return (
    <Container
      disableGutters
      maxWidth="lg"
      sx={{ marginBottom: 9, marginTop: 3 }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={4}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
          >
            <Typography fontSize={48} fontWeight="700" marginBottom="8px">
              {auth.visitorCount || 0}
            </Typography>
            <Typography
              textTransform={"uppercase"}
              fontSize={12}
              fontWeight="700"
              marginBottom="8px"
              color={"#9BA0B5"}
            >
              views total
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
          >
            <Typography fontSize={48} fontWeight="700" marginBottom="8px">
              {auth.saleCount || 0}
            </Typography>
            <Typography
              textTransform={"uppercase"}
              fontSize={12}
              fontWeight="700"
              marginBottom="8px"
              color={"#9BA0B5"}
            >
              Sales total
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
          >
            <Typography fontSize={48} fontWeight="700" marginBottom="8px">
              {auth.revenue?.toFixed(2) || 0}
            </Typography>
            <Typography
              textTransform={"uppercase"}
              fontSize={12}
              fontWeight="700"
              marginBottom="8px"
              color={"#9BA0B5"}
            >
              EUR made
            </Typography>
          </Stack>
        </Grid>
        <Stack
          width="100%"
          alignItems="flex-end"
          marginTop="20px"
        >
          <ButtonGradient
            label="Create project"
            fullWidth={false}
            disabled={profileComplete !== 100}
            onClick={handleClickOpen}
          />
        </Stack>
      </Grid>
      <Stack marginTop={"20px"}>
        {projects.length === 0 ? (
          <NoItems />
        ) : (
          <Box
            display="grid"
            justifyContent={"center"}
            gridTemplateColumns={{
              xs: "repeat(1, minmax(150px, 1fr))",
              md: "repeat(3, minmax(150px, 1fr))",
            }}
            gap={{ xs: "22px", lg: 5 }}
          >
            {projects.map((project, index) => (
              <CardNewProject
                key={index}
                coverUrl={project?.coverUrl}
                project={project}
              />
            ))}
          </Box>
        )}
      </Stack>
      <NewProjectModal projectCreated={handleProjectCreated} onClose={handleClose} open={open} />
      <NewProjectSuccessModal onClose={handleCloseSuccess} projectCreated={handleProjectCreatedOkay} open={openSuccess} coverUrl={coverUrl} nickName={nickName} projectName={projectName} />
    </Container>
  );
};
