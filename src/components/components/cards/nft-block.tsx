import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import { NotificationManager } from "react-notifications";

import { CARD_STYLES } from "../../../config/data";
import { CardNftUtilities } from "./nft-utilities";
import { CardNftBlockPrice, CardNftBlockPriceProps } from "./nft-block-price";
import { CardNftBlockTitle, CardNftBlockTitleProps } from "./nft-block-title";
// import { NextLaunchCardBanner } from "@/screens/my-account/components/next-lauch-card-banner";
import { CardNftBlockLink, CardNftBlockLinkProps } from "./nft-block-link";
import { NftRankInfo, NftRankType } from "./nft-rank-info";
import { CardNftBlockSoldOut } from "./nft-block-sold-out";
import getStripe from "../../../utils/get-stripejs";
import { useBlockchainContext } from "../../../context";
import { ROUTES } from "../../../config/navigation";
import { useLazyQuery, useMutation } from "@apollo/client";
import { IUser } from "../../props/IUser";
import { PUSH_EVENT, CHECKOUT_PRIMARY_SESSION, CHECKOUT_SECONDARY_SESSION } from "../../gql/mutations";
import { LIST_VARIANTS } from "../../gql/queries";
import { IVariant } from "../../props/IVariant";

export interface NftItemCardProps
  extends CardNftBlockPriceProps,
    CardNftBlockTitleProps,
    CardNftBlockLinkProps {
  imgSrc: string;
  albumCategory?: NftRankType;
  size?: "sm" | "md" | "lg" | "xl";
  width?: string;
  height?: string;
  withContent?: "price" | "link" | "banner" | "soldOut";
  isUnknown?: boolean;
  id?: string;
  target?: string;
  seller?: IUser;
  collectionName?: string;
  utilities?: string[];
  totalSupply?: number;
  selected?: boolean;
  onUpdateCard?: (variant: IVariant) => void;
}

export const CardNftBlock = ({
  imgSrc,
  id,
  target,
  size = "md",
  albumCategory = "basic",
  withContent = "price",
  isUnknown = false,
  tokensLeft,
  totalSupply,
  utilities,
  selected,
  seller,
  onUpdateCard,
  ...props
}: NftItemCardProps) => {
  const [pushEvent] = useMutation(PUSH_EVENT, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: async (data) => {
      console.log(data);
    },
  });
  const [listVariants] = useLazyQuery(LIST_VARIANTS);
  const [checkoutPrimarySession] = useMutation(CHECKOUT_PRIMARY_SESSION, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: async (data) => {
      const session = data.checkoutPrimaryMarketSession?.session;
      if (session) {
        const stripe = await getStripe();
        const { error } = await stripe!.redirectToCheckout({
          sessionId: session.id,
        });
        console.warn(error.message);
      }
    },
  });
  const [checkoutSecondarySession] = useMutation(CHECKOUT_SECONDARY_SESSION, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: async (data) => {
      const session = data.checkoutSecondaryMarketSession?.session;
      if (session) {
        const stripe = await getStripe();
        const { error } = await stripe!.redirectToCheckout({
          sessionId: session.id,
        });
        console.warn(error.message);
      }
    },
  });
  const {auth} = useBlockchainContext();
  const navigate = useNavigate();

  const goTo = async (id?:string, target?:string) => {
    if (target === undefined || !tokensLeft) {
      return;
    }
    if (!auth.isAuth) {
      navigate(ROUTES.signIn + '/checkout');
      return;
    }
    if (seller?._id === auth.id) {
      return;
    }
    if (seller) {
      const variables = {
        offerId: id,
      };
      await checkoutSecondarySession({variables});
    } else {
      try {
        const {data} = await listVariants({variables: {id}});
        const edges = data.listVariants?.edges;
        if (edges && edges.length > 0) {
          const variant = edges[0].node;
          pushEvent({variables: {projectId: variant.projectId, variantId: id, key: "ProjectDetailNftClicked"}});
          if (variant?.remaining > 0) {
            const variables = {
              variantId: id,
            };
            await checkoutPrimarySession({variables});
          } else {
            NotificationManager.error("Too late ! there is no more supply for this NFT");
            onUpdateCard && onUpdateCard(variant);
          }
        }
      } catch (e) {
        NotificationManager.error("Something went wrong. Please try again later");
      }
    }
  }

  const { description, ...cardStyle } = CARD_STYLES[albumCategory];
  const borderStyle = {
    borderColor: "#9658FF",
    borderStyle: "solid",
    borderWidth: "2px",
  };
  return (
    <Box
      sx={{
        cursor: "pointer",
        borderRadius: "10px",
        padding: "4px",
        backgroundImage: cardStyle.background,
        ...(selected && borderStyle)
      }}
    >
      <Card
        onClick={() => id ? goTo(id, target) : null}
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          color: "white",
          paddingY: { sm: 1, md: 2, lg: 3, xl: 4 }[size],
          paddingX: { sm: 1, md: 2, lg: 4, xl: 5 }[size],
          ...cardStyle,
          background: "url(/img/card-pattern.svg), " + cardStyle.background,
          backgroundRepeat: "repeat-x, no-repeat",
          backgroundPosition: "0px -2rem, center",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            borderRadius: "10px",
            height: {xs: 240, md: 240 },
            marginBottom: 2,
            maxWidth: {xs: 310, md: 240 },
            maxHeight: 336,
            objectPosition: "50% 50%",
            filter: isUnknown ? "blur(4px)" : undefined,
          }}
          src={imgSrc || "/img/author/author-9.jpg"}
          alt="orelsan album cover"
        />
        <Stack spacing={1}>
          <CardNftBlockTitle
            avatarUrl={props.avatarUrl}
            author={props.author}
            name={props.title}
            isUnknown={isUnknown}
            tokensLeft={tokensLeft}
            totalSupply={totalSupply}
            seller={seller}
          />
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
            <CardNftUtilities perks={utilities}/>
            {withContent === "price" ? <CardNftBlockPrice  price = {props.price} /> : null}
          </Stack>
          {withContent === "soldOut" ? <CardNftBlockSoldOut /> : null}
          {withContent === "link" ? <CardNftBlockLink /> : null}
          {withContent === "banner" ? (
            <Box paddingY={2}>
              {/* <NextLaunchCardBanner
                deg={-5}
                variantText="subheadline"
                bottom={"2%"}
                left={"-10%"}
              /> */}
            </Box>
          ) : null}
        </Stack>
      </Card>
    </Box>
  );
};
