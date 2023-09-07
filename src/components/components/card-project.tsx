import { Avatar, Stack, Typography } from "@mui/material";
import MuiLink from "@mui/material/Link";
import { IProject } from "../props/IProject";
import { ROUTES } from "../../config/navigation";
import { CardNewNft } from "./card-nft";

interface CardProjectProps {
  project: IProject;
}

export const CardProject = ({project}: CardProjectProps) => {
  const _variants = project.variants;
  var totalSupply = 0;
  var totalRemaining = 0;
  _variants?.forEach((variant) => {
    totalSupply += variant.supply;
    totalRemaining += variant.remaining;
  })
  return (
    <MuiLink
      key={`${project._id}`}
      href={`${ROUTES.project}${project._id}`}
      sx={{color: "white", textDecoration: "none"}}
    >
      <CardNewNft
        key={project.name}
        width={{ xs: 260, sm: 260 }}
        height={{ xs: 332, sm: 332 }}
        padding={{ xs: "14px 16px 40px", sm: "24px 24px" }}
        imgHeight={{ xs: 216, sm: 200 }}
        imgSrc={project.coverUrl}
      >
        <Stack direction={"row"} spacing={1} alignItems="center">
          <MuiLink href={`${ROUTES.artistProfile}${project?.artist?._id}`}>
            <Avatar src={project?.artist?.avatarUrl} sx={{width: 36, height: 36}} />
          </MuiLink>
          <Stack maxWidth="155px" spacing="4px">
            <Typography variant="p2" fontSize={{ xs: 13, sm: 15 }} color="white">
              {project.artist?.nickname}
            </Typography>
            <Typography
              variant="subheadline"
              display="inline-block"
              fontSize={{ xs: 15, sm: 15 }}
              color="white"
              noWrap
            >
              {project.name.toLowerCase()}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
          marginTop={2}
        >
          <Stack spacing={1}>
            <Typography fontSize={{ xs: 14, sm: "inherit" }} color="white">
              {`${totalRemaining} / ${totalSupply}`}
            </Typography>
          </Stack>
        </Stack>
      </CardNewNft>
    </MuiLink>
  )
};
