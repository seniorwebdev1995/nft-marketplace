export const PERK_LIST = ["Parks 1 GOLD", "Perks 2 GOLD"];

export const CARD_STYLES = {
  basic: {
    background:
      "linear-gradient(116.41deg, rgba(103, 103, 103, 0.5) -56.52%, rgba(45, 37, 58, 0.5) 130.2%)",
    boxShadow: "0px 1.0929px 27.3224px rgba(69, 42, 124, 0.1)",
    backdropFilter: "blur(63.9333px)",
    description: ["", ""],
  },
  gold: {
    background:
      "linear-gradient(110.56deg, rgba(179, 117, 25, 0.5) 2.43%, rgba(255, 224, 116, 0.4) 54.82%, rgba(255, 255, 255, 0) 106.69%)",
    filter: "drop-shadow(0px 1.10087px 27.5218px rgba(69, 42, 124, 0.1))",
    backdropFilter: "blur(64.4px)",
    description: ["Gold", "Rare"],
  },
  platinium: {
    background:
      "linear-gradient(111.8deg, rgba(155, 155, 155, 0.5) 2.43%, rgba(255, 255, 255, 0.5) 53.95%, rgba(255, 255, 255, 0) 105.08%)",
    filter: "drop-shadow(0px 1.09689px 27.4221px rgba(69, 42, 124, 0.1))",
    backdropFilter: "blur(64.1667px)",
    description: ["Platinum", "Royalties"],
  },
  diamond: {
    background:
      "linear-gradient(111.21deg, rgba(47, 184, 255, 0.275) 2.43%, rgba(165, 224, 255, 0.47) 55.25%, rgba(255, 255, 255, 0) 104.27%)",
    filter: "drop-shadow(0px 1.08628px 27.1569px rgba(69, 42, 124, 0.1))",
    backdropFilter: "blur(63.5461px)",
    description: ["Diamond", "Royalties"],
  },
};

export const NftRanksList = ["basic", "gold", "platinium", "diamond"];

export const SocialLinksFooter = [
  { 
    label: "instagram",
    background: "#574E65",
    link: 'https://www.instagram.com/metamusikk/',
    order: 1 
  },
  { 
    label: "twitter",
    background: "#574E65",
    link: 'https://twitter.com/metamusiknft',
    order: 2,
  },
  {
  label: "discord",
  background: "#7A3EE0",
  link: 'https://discord.gg/MmYjrgT3',
  order: 3,
  }
];
