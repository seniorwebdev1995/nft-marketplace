import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useBlockchainContext } from "../../../../context";

export const IncompleteProfile = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <Box bgcolor={"primary.main"} paddingY={2} marginBottom={2}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={"center"}
          justifyContent="space-between"
          spacing={2}
          paddingX={1}
        >
          <Stack direction="row" alignItems={"center"} spacing={1}>
            <Typography variant="bodyB1">{translateLang("account.incomplet")}</Typography>
            <Typography>{translateLang("account.please")}</Typography>
          </Stack>

          <Button
            size="small"
            sx={(theme) => ({
              background: "#191225",
              color: "white",
              ...theme.typography.bodyB2,
            })}
          >
            {translateLang("account.completBtn")}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
