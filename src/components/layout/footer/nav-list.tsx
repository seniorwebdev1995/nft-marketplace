import Stack from "@mui/material/Stack";
import { FooterNavListCol } from "./nav-list-col";
import { ROUTES } from "../../../config/navigation";
import { useBlockchainContext } from "../../../context";

export const FooterNavList = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <Stack
      component="nav"
      direction={{ xs: "column", md: "row" }}
      justifyContent="flex-end"
      spacing={{ xs: 2, md: 10 }}
      aria-label="footer nav"
    >
      {[
        {
          title: translateLang("marketplace"),
          data: [
          { label: translateLang("artists"), href: ROUTES.artists },
          { label: translateLang("projects"), href: ROUTES.projects },
          { label: translateLang("nfts"), href: ROUTES.nfts },
          { label: translateLang("nftOnSale"), href: ROUTES.nftOnSale },
          { label: translateLang("auctions"), href: ROUTES.auctions },
          ],
        },
        {
          title: translateLang("artists"),
          data: [
            { label: translateLang("discoverMore"), href: ROUTES.join, newTab: false },
            { label: translateLang("loginAsArtist"), href: ROUTES.artistSignIn, newTab: false }],
        },
        {
          title: translateLang("links"),
          data: [
            { label: translateLang("terms"), href: "https://metamusik.notion.site/General-ressources-87ab4de0ddd54e9e89a310bf4e2c0fe4" },
            { label: translateLang("privacy"), href: "https://metamusik.notion.site/General-ressources-87ab4de0ddd54e9e89a310bf4e2c0fe4" },
            { label: translateLang("faqTitle"), href: "https://metamusik.notion.site/FAQ-be1d370336c548819727ae1633ee0cf2" }],            
        },
      ].map((col) => (
        <FooterNavListCol key={col?.title} {...col} />
      ))}
    </Stack>
  );
};
