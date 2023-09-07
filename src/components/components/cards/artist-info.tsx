import React, {useMemo} from "react";
import { CardContent, Stack, Typography, useMediaQuery } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// import { ROUTES } from "../../../config/navigation";
import { theme } from "../../../config/theme";
// import MuiLink from "@mui/material/Link";
import { IGenres } from "../../props/IArtist";
// import { generateKeySync } from "crypto";

interface Props {
  id?:string;
  name: string;
  genres?: IGenres[];
  category?: string;
  drop?: string;
  description?: string;
}

export const CardArtistInfo = ({
  name,
  genres,
  category = "Rap",
  drop = "Drop in progress",
  description = "Trending artist",
  id
}: Props) => {
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const ICON_SIZE = matches ? 13 : 24;
  const _genres = useMemo(() => {
    const _arrays: string[] = [];
    genres?.forEach(genre => _arrays.push(genre.name));
    return _arrays.join(', ');
  }, [genres]);

  return (
    <CardContent
      sx={{
        width: "100%",
        flex: 1,
        padding: { xs: 2, md: 4 },
      }}
    >
      <Stack
        sx={{
          color: "white",
        }}
      >
        <Typography
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              fontSize: 16,
            },
          })}
          variant="title1"
          marginBottom={2}
        >
          {name}
        </Typography>
        <Typography
          marginBottom={1}
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              fontSize: 9,
            },
          })}
        >
          {_genres}
        </Typography>

        {/* <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          marginBottom={{ xs: 1, sm: 2 }}
        >
          <img
            src={"/img/Crypto.svg"}
            alt="crypto"
          />
          <Typography
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                fontSize: 9,
              },
            })}
          >
            {drop}
          </Typography>
        </Stack> */}
        {/* <Stack
          direction="row"
          justifyContent={"flex-end"}
          alignItems="center"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <img
              src={"/img/fire.svg"}
              alt="fire"
            />
            <Typography
              marginBottom={{ xs: 1, sm: 2 }}
              sx={(theme) => ({
                [theme.breakpoints.down("sm")]: {
                  fontSize: 9,
                },
              })}
            >
              {description}
            </Typography>
          </Stack>
          <MuiLink
            href={ROUTES.artistProfile + id}
          >
            <IconButton
              sx={{
                backgroundColor: "#42A4FF",
                borderRadius: "50%",
                boxShadow: "0px 2px 8px rgba(191, 255, 98, 0.29)",
              }}
              aria-label="artist link"
              size="small"
            >
              <ChevronRightIcon fontSize="inherit" />
            </IconButton>
          </MuiLink>
        </Stack> */}
      </Stack>
    </CardContent>
  );
};
