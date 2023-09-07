import { SectionDefault } from "../../../layout/section";

import { CardNft } from "../../../components/cards/nft";
import { Box } from "@mui/material";
import { Carousel } from "../../../components/carousel";

import { IVariant } from "../../../props/IVariant";
import { IArtist } from "../../../props/IArtist";
import { ROUTES } from "../../../../config/navigation";
import { useBlockchainContext } from "../../../../context";
import { IProject } from "../../../props/IProject";

interface NftProjectAcessProps {
  project: IProject;
  cards: IVariant[] | undefined;
  artist: IArtist;
}

export const NftProjectAcess = ({ cards, artist, project }: NftProjectAcessProps) => {
  const { translateLang } = useBlockchainContext();
  
  return (
    <SectionDefault
      title={translateLang("tokenTitle")}
      subtitle={translateLang("tokenSubtitle")}
      titleColor={"#BB6BE0"}
    >
      <Carousel>
        {cards?.map((card, index) => {
          var date = new Date();
          let year = date?.getFullYear().toString()
          return (
            <Box
              key={index}
              minWidth={250}
              maxWidth={{ md: 275 }}
              paddingLeft={{ xs: 2, md: 0 }}
            >
              <CardNft
                collectionName={project.name}
                author={artist?.nickname}
                nft={card}
                id={card._id}
                target={ROUTES.checkout}
                imgSrc={card.coverUrl}
                startDateAsIso={year}
              />
            </Box>
          );
        })}
      </Carousel>
    </SectionDefault>
  );
};
