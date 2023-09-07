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

import { IInterest } from "../../../props/IInterest";
import { ButtonPrimary } from "../../../components/buttons/styles";
import { useBlockchainContext } from "../../../../context";
import { GET_ALL_GENRES } from "../../../gql/queries";
import { UPDATE_ME } from "../../../gql/mutations";

interface ICategoryMusic {
  index: number;
  category: any;
}

export const SignUpMusic = () => {
  const navigate = useNavigate();
  const { translateLang } = useBlockchainContext();

  const [categories, setCategories] = React.useState<ICategoryMusic[]>([]);
  const [allCategories, setAllCategories] = React.useState<IInterest[]>([]);

  const { data } = useQuery(GET_ALL_GENRES);
  const [updateMyGenres] = useMutation(UPDATE_ME, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      navigate(ROUTES.account);
    },
  });

  useEffect(() => {
    if (data) {
      setAllCategories(data?.getAllGenres);
    }
  }, [data]);

  const handleSetUserInterests = async () => {
    const genresToAdd = categories.map((interest) => interest.category._id);
    await updateMyGenres({ variables: { genreIds: genresToAdd } });
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
    <Stack width="100%" spacing="12px">
      <ButtonBack />

      <Typography variant="title1">{translateLang("stepTwoTitle")}</Typography>
      <Typography variant="p1">{translateLang("stepTwoSubtitle")}</Typography>

      <Box>
        <Grid
          marginTop={"20px"}
          container
          component="form"
          gridTemplateColumns={"repeat(auto-fit, minmax(50px,1fr))"}
          gap="15px"
        >
          {allCategories.map((item, index) => (
            <Grid key={index} item>
              <ToggleButton
                value={index}
                sx={(theme) => ({
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  color: "rgba(255, 255, 255, 0.4)",
                  borderRadius: "48px",
                  paddingY: "14px",
                  paddingX: "10px",
                  ...theme.typography.body1,
                  "&.Mui-selected": {
                    borderColor: "#42A4FF",
                    color: "white",
                    background: "#42A4FF",
                    ...theme.typography.bodyB1,
                  },
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
        <Stack marginTop={{ xs: 6, md: 12 }}>
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
