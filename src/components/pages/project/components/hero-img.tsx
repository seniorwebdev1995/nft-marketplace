import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export const NftProjectHeroImg = ({imageUrl}:{imageUrl:string}) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        ".little-hero": {
          width: "100%",
          height: "100%",
          backgroundBlendMode: "lighten, normal, normal",
          filter:
            "drop-shadow(0px 23.17px 100px rgba(0, 0, 0, 0.1)) drop-shadow(0px 64.99px 50px rgba(0, 0, 0, 0.2))",
          borderRadius: "4.33154px",
        },
      }}
      padding={{ xs: 11, sm: 20, md: 0 }}
      height={{xs: "300px", sm: "420px", md: "600px"}}
      maxHeight={{ xs: 940, md: "100%" }}
    >
    </Stack>
  );
};
