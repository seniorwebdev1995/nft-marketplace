import React, { useEffect, useState } from "react";
import { Dialog, Box, Grid, ToggleButton, useMediaQuery } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "cropperjs/dist/cropper.css";
import { useQuery, useMutation } from "@apollo/client";
import { ButtonGradient } from "../../../components/buttons/button-gradient";
import { useBlockchainContext } from "../../../../context";
import { GET_ALL_GENRES } from "../../../gql/queries";
import { theme } from "../../../../config/theme";
import { IGenres } from "../../../../types/auth";

interface Props {
  genres: IGenres[];
  open: boolean;
  onClose: () => void;
  onGenresUpdated: (updatedGenres: IGenres[]) => void;
}

interface ICategoryMusic {
  index: number;
  category: IGenres;
}

export const GenresModal = ({
  genres,
  open,
  onClose,
  onGenresUpdated,
}: Props) => {
  const { translateLang } = useBlockchainContext();
  const [isLoading, setIsLoading] = useState(false);
  const mediumViewport = useMediaQuery(theme.breakpoints.down("md"));
  const [categories, setCategories] = React.useState<ICategoryMusic[]>([]);
  const [allCategories, setAllCategories] = React.useState<IGenres[]>([]);

  const { data } = useQuery(GET_ALL_GENRES);

  useEffect(() => {
    if (data) {
      setAllCategories(data?.getAllGenres);
    }
  }, [data]);

  useEffect(() => {
    if (allCategories && genres) {
      allCategories.forEach((category, index) => {
        if (isGenres(category)) {
          setCategories((prev) => {
            let result = [...prev, { index, category }];
            return result;
          });
        }
      });
    }
  }, [allCategories, genres]);

  const isGenres = (category: IGenres) => {
    return genres.some((element) => {
      if (element._id === category._id) {
        return true;
      }
      return false;
    });
  };

  const handleSetUserInterests = async () => {
    const genresToAdd = categories.map((interest) => interest.category._id);
    let flag: boolean = false;
    const generesToDelete: string[] = [];
    allCategories.forEach((category) => {
      genresToAdd.forEach((element) => {
        if (element == category._id) {
          flag = true;
        }
      });
      if (!flag) {
        generesToDelete.push(category._id);
      }
      flag = false;
    });
    const genres: IGenres[] = categories.map((interest) => interest.category);
    setCategories([]);
    onGenresUpdated(genres);
  };

  const isSelected = (index: number) => {
    return categories.some((element) => {
      if (element.index === index) {
        return true;
      }
      return false;
    });
  };

  const toggle = ({ index, category }: ICategoryMusic) => {
    setCategories((prev) => {
      if (isSelected(index)) {
        return prev.filter((idx) => {
          return idx.index !== index;
        });
      } else {
        let result = [...prev, { index, category }];
        return result;
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableScrollLock={true}
      PaperProps={{
        sx: {
          margin: "0 12px",
          borderRadius: "8px",
        },
      }}
    >
      <Stack
        padding={{ xs: 2, md: 3 }}
        sx={{
          background: "#1A1C20",
        }}
      >
        <Typography variant="title1">{"Select your music style"}</Typography>

        <Box>
          <Grid
            marginTop={"20px"}
            container
            component="form"
            gridTemplateColumns={"repeat(auto-fit, minmax(50px,1fr))"}
            gap="25px"
          >
            {allCategories.map((item, index) => (
              <Grid key={index} item>
                <ToggleButton
                  value={index}
                  sx={(theme) => ({
                    borderColor: "rgba(255, 255, 255, 0.4)",
                    color: "rgba(255, 255, 255, 0.4)",
                    borderRadius: "48px",
                    paddingY: "10px",
                    paddingX: "15px",
                    ...theme.typography.body1,
                    "&.Mui-selected": {
                      borderColor: "#42A4FF",
                      color: "white",
                      background: "#42A4FF",
                      ...theme.typography.bodyB1,
                    },
                    fontSize: "14px",
                  })}
                  selected={isSelected(index)}
                  onChange={() => {
                    toggle({ index: index, category: item });
                  }}
                >
                  {item.name}
                </ToggleButton>
              </Grid>
            ))}
          </Grid>
          <Stack marginTop={{ xs: 3, md: 4 }}>
            <ButtonGradient
              fullWidth={mediumViewport && true}
              loading={isLoading}
              label={"Done"}
              onClick={handleSetUserInterests}
            />
          </Stack>
        </Box>
      </Stack>
    </Dialog>
  );
};
