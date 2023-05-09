import { ValidNetwork } from "@daohaus/keychain-utils";

export const TARGET_DAO: {

    CHAIN_ID: ValidNetwork;
    SQUAD: string;
    SUMMONER_SUPPLY: string;
    SQUAD_SUPPLY: string;
    VOTING_PERIOD: number;
    GRACE_PERIOD: number;
    NEW_OFFERING: string;
    QUORUM: string;
    SPONSOR_THRESHOLD: string;
    MIN_RETENTION: string;

} = {

    CHAIN_ID: "0xa4b1",
    SQUAD: "0x6a6ec161efac2a7f8b65f3cb6b02d3d655ca278d", // squad safe
    SUMMONER_SUPPLY: "90000000000", 
    SQUAD_SUPPLY: "10000000000",
    VOTING_PERIOD: 604800,
    GRACE_PERIOD: 604800,
    NEW_OFFERING: "0",
    QUORUM: "25",
    SPONSOR_THRESHOLD: "150000000000000000000000000000",
    MIN_RETENTION: "25",

  
};
