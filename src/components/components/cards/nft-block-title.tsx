import { Avatar, Stack, Typography } from "@mui/material";
import { IUser } from "../../props/IUser";

export interface CardNftBlockTitleProps {
  author?: string;
  avatarUrl?: string;
  name?: string;
  isUnknown?: boolean;
  title?:string;
  tokensLeft?: number;
  totalSupply?: number;
  seller?: IUser;
}

export const CardNftBlockTitle = ({
  author,
  name = "CIVILISATION",
  avatarUrl,
  isUnknown,
  tokensLeft,
  totalSupply,
  seller,
}: CardNftBlockTitleProps) => {
  return (
    <Stack flex={1} direction="row" alignItems="center" spacing={1}>
      {avatarUrl ? (
        <Avatar
          src={avatarUrl}
          sx={{
            filter: isUnknown ? "blur(4px)" : undefined,
          }}
        />
      ) : null}
      <Stack flex={1} direction="row" justifyContent="space-between" sx={{overflow: "hidden"}}>
        <Stack flex={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="white"  noWrap>
              {author?.toLocaleUpperCase()}
            </Typography>
            {!seller && totalSupply && <Typography variant="body2">{`${tokensLeft} / ${totalSupply}`}</Typography>}
          </Stack>
          <Typography variant="bodyB2" textTransform={"uppercase"} marginTop="2px" color="white" noWrap>
            {name}
          </Typography>
        </Stack>
        {seller && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              src={seller?.avatarUrl}
              sx={{
                filter: isUnknown ? "blur(4px)" : undefined,
              }}
            />
            {/* <Typography variant="body2" color="white" noWrap>
              {seller?.nickname}
            </Typography> */}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
