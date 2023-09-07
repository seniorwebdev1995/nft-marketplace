import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import { ButtonBack } from "../../../components/buttons/back";
import { ROUTES } from "../../../../config/navigation";

// import { IInterest } from "../../../props/IInterest";
import { ButtonPrimary } from "../../../components/buttons/styles";
import { useBlockchainContext } from "../../../../context";
import { GET_ALL_GENRES } from "../../../gql/queries";
import { UPDATE_ARTIST_ME } from "../../../gql/mutations";
import { IGenres } from "../../../../types/auth";

interface ICategoryMusic {
  index: number;
  category: IGenres;
}

export const SignUpMusic = () => {
  const navigate = useNavigate();
  const { translateLang } = useBlockchainContext();

  const [categories, setCategories] = React.useState<ICategoryMusic[]>([]);
  const [allCategories, setAllCategories] = React.useState<IGenres[]>([]);

  const { data } = useQuery(GET_ALL_GENRES);
  const [updateArtistGenres] = useMutation(UPDATE_ARTIST_ME, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      navigate(ROUTES.artistAccount);
    },
  });

  useEffect(() => {
    if (data) {
      setAllCategories(data?.getAllGenres);
    }
  }, [data]);

  const handleSetUserInterests = async () => {
    const genresToAdd = categories.map((interest) => interest.category._id);
    await updateArtistGenres({
      variables: { genreIds: genresToAdd },
    });
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
    <Stack width="100%" spacing={{ xs: 3, md: 4 }}>
      <ButtonBack />
      <Typography
        variant="title1"
        fontWeight={700}
        fontSize={"28px"}
        lineHeight={"32px"}
      >
        {"What type of music do you play?"}
      </Typography>
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
                  color: "rgba(255, 255, 255, 0.7)",
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
        <Stack marginTop={{ xs: 6, md: 8 }} alignItems={"center"}>
          <ButtonPrimary
            onClick={handleSetUserInterests}
            disabled={categories.length === 0}
            type="button"
            fullWidth
            size="large"
            sx={{ maxWidth: { xs: "100%", md: 400 }, marginX: "auto" }}
          >
            {translateLang("validateBtn")}
          </ButtonPrimary>
        </Stack>
      </Box>
    </Stack>
  );
};
