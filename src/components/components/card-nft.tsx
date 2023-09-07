import { NftRankType } from "./cards/nft-rank-info";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

interface NftRankProps {
  nftrank?: NftRankType;
}

interface CardNftProps extends NftRankProps, BoxProps {
  imgSrc: string;
  imgHeight?: BoxProps["height"];
  status?: string;
  showStatus?: boolean;
  margin?: string;
}

const CardNftBg: {
  [k in NftRankType]: {
    boxShadow: string;
    filter?: string;
    background: string;
  };
} = {
  basic: {
    boxShadow: "0px 1.0929px 27.3224px rgba(69, 42, 124, 0.1)",
    background:
      "linear-gradient(116.41deg, rgba(103, 103, 103, 0.5) -56.52%, rgba(45, 37, 58, 0.5) 130.2%)",
  },
  gold: {
    boxShadow:
      "0px 1.1008737087249756px 27.52184295654297px 0px rgba(69, 42, 124, 0.1)",
    filter: "drop-shadow(0px 1.10087px 27.5218px rgba(69, 42, 124, 0.1))",
    background:
      "linear-gradient(110.56deg, rgba(179, 117, 25, 0.5) 2.43%, rgba(255, 224, 116, 0.4) 54.82%, rgba(255, 255, 255, 0) 106.69%)",
  },
  platinium: {
    boxShadow: "0px 1.0929px 27.3224px rgba(69, 42, 124, 0.1)",
    filter: "drop-shadow(0px 1.09689px 27.4221px rgba(69, 42, 124, 0.1))",
    background:
      "linear-gradient(111.8deg, rgba(155, 155, 155, 0.5) 2.43%, rgba(255, 255, 255, 0.5) 53.95%, rgba(255, 255, 255, 0) 105.08%)",
  },
  diamond: {
    boxShadow: "0px 1.0929px 27.3224px rgba(69, 42, 124, 0.1)",
    filter: "drop-shadow(0px 1.08628px 27.1569px rgba(69, 42, 124, 0.1))",
    background:
      "linear-gradient(111.21deg, rgba(47, 184, 255, 0.275) 2.43%, rgba(165, 224, 255, 0.47) 55.25%, rgba(255, 255, 255, 0) 104.27%)",
  },
};

const borderRadius = 10;

const CardBorder = styled(Box)<NftRankProps>(
  ({ theme, nftrank = "basic" }) => ({
    borderRadius,
    padding: 3,
    overflow: "hidden",
    background: `${CardNftBg[nftrank]?.background}, ${theme?.palette?.content?.primary}`,
    boxShadow:
      "linear-gradient(167.63deg, #FFFFFF 1.94%, #FFFFFF 29.8%, #FFFFFF 53.05%, #FFFFFF 78.88%)",
    backdropFilter: "blur(64px)",
    filter: CardNftBg?.[nftrank]?.filter,
  })
);

const CardBlock = styled(Box)<NftRankProps>(({ theme }) => ({
  background: `url(/img/card-pattern.svg), ${theme?.palette?.background?.default}`,
  backgroundPosition: "top left, center",
  backgroundRepeat: "repeat-x",
  backgroundSize: "100%",
  borderRadius,
  width: "100%",
  height: "100%",
}));
const CardBg = styled(Box)<NftRankProps>(({ nftrank = "basic" }) => ({
  background: CardNftBg[nftrank]?.background,
  width: "100%",
  height: "100%",
  borderRadius,
}));

export const CardNewNft = ({
  nftrank = "basic",
  width = 275,
  height = 385,
  padding = "24px",
  children,
  imgSrc,
  imgHeight,
  status,
  showStatus,
  margin
}: CardNftProps) => (
  <CardBorder nftrank={nftrank} width={width} height={height} style={{ margin: margin ? margin : "auto" }}>
    <CardBlock nftrank={nftrank}>
      <CardBg nftrank={nftrank} padding={padding}>
        <Box
          borderRadius="10px"
          height={imgHeight}
          marginBottom="10px"
          sx={{
            position: "relative",
            borderRadius: "10px",
            overflow: "hidden",
          }}
          color="white"
        >
          {showStatus && <p style={{ display: "inline-block", fontFamily: "Overpass", marginBottom: "10px" }}>
            {status === 'Idle' ?
              <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#4FFF80" }} />Completed</> : (status === 'CreationPending' || status === 'TransferPending') ?
                <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#F7FB2F" }} />Pending</> : (status === 'CreationProcessing') ?
                  <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#F7FB2F" }} />Processing</> : (status === 'OnSale') ?
                    <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#2F98FB" }} />On Sale</> : (status === 'CreationFailed') ?
                      <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#F70000" }} />Failed</> : null}
          </p>}
          <img
            src={imgSrc || "/img/author/author-9.jpg"}
            height="100%"
            width="100%"
            style={{ borderRadius: "10px", objectFit: "cover" }}
            alt="avatar"
          />
        </Box>
        {children}
      </CardBg>
    </CardBlock>
  </CardBorder>
);
