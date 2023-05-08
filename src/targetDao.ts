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
    SQUAD: "0x1b83e9c91c4f90ea19af16b65214702f7a20a1a7",
    SUMMONER_SUPPLY: "900000000000", 
    SQUAD_SUPPLY: "100000000000",
    VOTING_PERIOD: 604800,
    GRACE_PERIOD: 604800,
    NEW_OFFERING: "0",
    QUORUM: "25",
    SPONSOR_THRESHOLD: "150000000000000000000000000000",
    MIN_RETENTION: "25",

  
};
