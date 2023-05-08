import { CONTRACT_KEYCHAINS, ValidNetwork } from '@daohaus/keychain-utils';
import { ArgType, POSTER_TAGS, ZERO_ADDRESS, encodeFunction, encodeValues, getNonce, handleErrorMessage, isArray, isBoolean, isNumberish, isString, toBaseUnits } from "@daohaus/utils";
import { LOCAL_ABI } from '@daohaus/abis';
import { TARGET_DAO } from '../targetDao';


export type SummonParams = {
    daoName?: string;
    tokenName?: string;
    tokenSymbol?: string;
    lootTokenName?: string;
    lootTokenSymbol?: string;
    votingTransferable?: boolean;
    nvTransferable?: boolean;
    quorum?: string;
    minRetention?: string;
    sponsorThreshold?: string;
    newOffering?: string;
    votingPeriod?: string;
    votingPeriodInSeconds?: number;
    gracePeriod?: string;
    gracePeriodInSeconds?: number;
    shamans?:
      | ''
      | {
          shamanAddresses: string[];
          shamanPermissions: string[];
        };
    members?:
      | ''
      | {
          memberAddresses: string[];
          memberShares: string[];
          memberLoot: string[];
        };
  };
  
  export const handleKeychains = (chainId: ValidNetwork) => {
    const { POSTER } = CONTRACT_KEYCHAINS;
    const v3Contracts = [ POSTER];
  
    if (v3Contracts.every((contract) => contract[chainId])) {
      return {
        POSTER: POSTER[chainId] || '',
      };
    }
  
    throw new Error('Could not find V3 contracts for this network');
  };
  
  export const encodeMintParams = (formValues: SummonParams) => {
    const { members } = formValues;
  
    if (
      !members ||
      !isArray(members?.memberAddresses) ||
      members.memberAddresses.some((addr) => !isString(addr)) ||
      !isArray(members?.memberShares) ||
      members.memberShares.some((shares) => !isNumberish(shares)) ||
      !isArray(members?.memberLoot) ||
      members.memberLoot.some((shares) => !isNumberish(shares))
    ) {
      console.log('ERROR: Form Values', formValues);
      throw new Error(
        'encodeMintParams recieved arguments in the wrong shape or type'
      );
    }
  
    const wholeShareAmts = members.memberShares;
    const sharesInBaseUnits = wholeShareAmts.map((shares) => toBaseUnits(shares));
    const wholeLootAmts = members.memberLoot;
    const lootInBaseUnits = wholeLootAmts.map((loot) =>
      toBaseUnits(loot.toString())
    );
  
    const encoded = encodeValues(
      ['address[]', 'uint256[]', 'uint256[]'],
      [members.memberAddresses, sharesInBaseUnits, lootInBaseUnits]
    );
  
    if (isString(encoded)) {
      return encoded;
    }
    throw new Error('Encoding Error');
  };
  
  export const encodeTokenParams = (formValues: SummonParams) => {
    const tokenName = formValues.tokenName;
    const tokenSymbol = formValues.tokenSymbol;
    const lootTokenName = formValues.lootTokenName;
    const lootTokenSymbol = formValues.lootTokenSymbol;
    const pauseVoteToken = formValues.votingTransferable;
    const pauseNvToken = formValues.nvTransferable;
  
    if (
      !isString(tokenName) ||
      !isString(tokenSymbol) ||
      !isString(lootTokenName) ||
      !isString(lootTokenSymbol) ||
      !isBoolean(pauseVoteToken) ||
      !isBoolean(pauseNvToken)
    ) {
      console.log('ERROR: Form Values', formValues);
  
      throw new Error(
        'encodeTokenParams recieved arguments in the wrong shape or type'
      );
    }
  
    const encoded = encodeValues(
      ['string', 'string', 'string', 'string', 'bool', 'bool'],
      [
        tokenName,
        tokenSymbol,
        lootTokenName,
        lootTokenSymbol,
        pauseVoteToken,
        pauseNvToken,
      ]
    );
  
    if (isString(encoded)) {
      return encoded;
    }
    throw new Error('Encoding Error');
  };
  
  const governanceConfigTX = (formValues: SummonParams) => {
    const {
      votingPeriodInSeconds,
      gracePeriodInSeconds,
      newOffering,
      quorum,
      sponsorThreshold,
      minRetention,
    } = formValues;
  
    if (
      !isNumberish(votingPeriodInSeconds) ||
      !isNumberish(gracePeriodInSeconds) ||
      !isNumberish(newOffering) ||
      !isNumberish(quorum) ||
      !isNumberish(sponsorThreshold) ||
      !isNumberish(minRetention)
    ) {
      throw new Error(
        'governanceConfigTX recieved arguments in the wrong shape or type'
      );
    }
  
    const encodedValues = encodeValues(
      ['uint32', 'uint32', 'uint256', 'uint256', 'uint256', 'uint256'],
      [
        votingPeriodInSeconds,
        gracePeriodInSeconds,
        newOffering,
        quorum,
        sponsorThreshold,
        minRetention,
      ]
    );
    const encoded = encodeFunction(LOCAL_ABI.BAAL, 'setGovernanceConfig', [
      encodedValues,
    ]);
    if (isString(encoded)) {
      return encoded;
    }
    throw new Error('Encoding Error');
  };
  
  export const shamanConfigTX = (formValues: SummonParams) => {
    const { shamans } = formValues;
  
    if (shamans === '' || !shamans) {
      const encoded = encodeFunction(LOCAL_ABI.BAAL, 'setShamans', [[], []]);
      if (isString(encoded)) {
        return encoded;
      }
      throw new Error('Encoding Error');
    }
    if (
      !isArray(shamans?.shamanAddresses) ||
      shamans.shamanAddresses.some((addr) => !isString(addr)) ||
      !isArray(shamans?.shamanPermissions) ||
      shamans.shamanPermissions.some((addr) => !isNumberish(addr))
    ) {
      console.log('ERROR: Form Values', formValues);
      throw new Error(
        'shamanConfigTX recieved arguments in the wrong shape or type'
      );
    }
    const encoded = encodeFunction(LOCAL_ABI.BAAL, 'setShamans', [
      shamans.shamanAddresses,
      shamans.shamanPermissions,
    ]);
    if (isString(encoded)) {
      return encoded;
    }
    throw new Error('Encoding Error');
  };
  
  const metadataConfigTX = (formValues: SummonParams, posterAddress: string) => {
    const { daoName } = formValues;
    if (!isString(daoName)) {
      console.log('ERROR: Form Values', formValues);
      throw new Error('metadataTX recieved arguments in the wrong shape or type');
    }
  
    const METADATA = encodeFunction(LOCAL_ABI.POSTER, 'post', [
      JSON.stringify({ name: daoName }),
      POSTER_TAGS.summoner,
    ]);
  
    const encoded = encodeFunction(LOCAL_ABI.BAAL, 'executeAsBaal', [
      posterAddress,
      0,
      METADATA,
    ]);
    if (isString(encoded)) {
      return encoded;
    }
    throw new Error('Encoding Error');
  };
  
  // THIS IS ONLY USED IN V3_FACTORY_ORIGINAL CONTRACT
  const tokenConfigTX = (formValues: SummonParams) => {
    const pauseVoteToken = !formValues.votingTransferable;
    const pauseNvToken = !formValues.nvTransferable;
  
    const encoded = encodeFunction(LOCAL_ABI.BAAL, 'setAdminConfig', [
      pauseVoteToken,
      pauseNvToken,
    ]);
  
    if (isString(encoded)) {
      return encoded;
    }
    throw new Error('Encoding Error');
  };
  
  // THIS IS ONLY USED IN V3_FACTORY_ORIGINAL CONTRACT
  export const shareConfigTX = (formValues: SummonParams) => {
    const { members } = formValues;
  
    if (
      !members ||
      !isArray(members?.memberAddresses) ||
      members.memberAddresses.some((addr) => !isString(addr)) ||
      !isArray(members?.memberShares) ||
      members.memberShares.some((shares) => !isNumberish(shares))
    ) {
      console.log('ERROR: Form Values', formValues);
      throw new Error(
        'shareConfigTX recieved arguments in the wrong shape or type'
      );
    }
  
    const wholeShareAmts = members.memberShares;
    const sharesInBaseUnits = wholeShareAmts.map((shares) => toBaseUnits(shares));
    const encoded = encodeFunction(LOCAL_ABI.BAAL, 'mintShares', [
      members.memberAddresses,
      sharesInBaseUnits,
    ]);
  
    if (isString(encoded)) {
      return encoded;
    }
    throw new Error('Encoding Error');
  };
  
  // THIS IS ONLY USED IN V3_FACTORY_ORIGINAL CONTRACT
  export const lootConfigTX = (formValues: SummonParams) => {
    const { members } = formValues;
  
    if (
      !members ||
      !isArray(members?.memberAddresses) ||
      members.memberAddresses.some((addr) => !isString(addr)) ||
      !isArray(members?.memberShares) ||
      members.memberShares.some((shares) => !isNumberish(shares))
    ) {
      console.log('ERROR: Form Values', formValues);
      throw new Error(
        'shareConfigTX recieved arguments in the wrong shape or type'
      );
    }
  
    const wholeLootAmts = members.memberLoot;
    const lootInBaseUnits = wholeLootAmts.map((loot) =>
      toBaseUnits(loot.toString())
    );
    const encoded = encodeFunction(LOCAL_ABI.BAAL, 'mintLoot', [
      members.memberAddresses,
      lootInBaseUnits,
    ]);
    if (isString(encoded)) {
      return encoded;
    }
    throw new Error('Encoding Error');
  };
  
  
  export const assembleTxArgs = (
    formValues: Record<string, unknown>,
    chainId: ValidNetwork,
    summonerAddress: string | undefined,
    squadAddress: string | undefined,
    safeAddress?: string,
  ): ArgType[] => {
    const tokenName = formValues['tokenName'];
    const tokenSymbol = formValues['tokenSymbol'];
    const lootTokenName = 'Non Voting '+ tokenName;
    const lootTokenSymbol = 'nv'+ tokenName;
  
    if (
      !isString(tokenName) ||
      !isString(tokenSymbol) ||
      !isString(lootTokenName) ||
      !isString(lootTokenSymbol)
    ) {
      console.log('ERROR: Form Values', formValues);
  
      throw new Error(
        'assembleSummonTx recieved arguments in the wrong shape or type'
      );
    }
  
    if(!summonerAddress || !squadAddress) {
      throw new Error('Missing summoner or squad address')
    }
  
  
    const defaultGovernanceConfig: SummonParams = {
      votingPeriodInSeconds: TARGET_DAO.VOTING_PERIOD, 
      gracePeriodInSeconds: TARGET_DAO.GRACE_PERIOD,
      newOffering: TARGET_DAO.NEW_OFFERING,
      quorum: TARGET_DAO.QUORUM,
      sponsorThreshold: TARGET_DAO.SPONSOR_THRESHOLD,
      minRetention: TARGET_DAO.MIN_RETENTION,
    }
  const defaultShamanConfig: SummonParams = {
    shamans: ""
  }
  const defaultMetadataConfig: SummonParams = {
    daoName: tokenSymbol + " DAO"
  }
  const defaultMintParams: SummonParams = {
    members: {
      memberAddresses: [summonerAddress, squadAddress],
      memberShares: [TARGET_DAO.SUMMONER_SUPPLY, TARGET_DAO.SQUAD_SUPPLY],
      memberLoot: ["0","0"]
    }
  }
  const defaultTokenParams: SummonParams = {
    tokenName: tokenName,
    tokenSymbol: tokenSymbol,
    lootTokenName: lootTokenName,
    lootTokenSymbol: lootTokenSymbol,
    votingTransferable: true,
    nvTransferable: false
  }
  
  
    const { POSTER } = handleKeychains(chainId);
  
    const mintParams = encodeMintParams(defaultMintParams);
  
    const tokenParams = encodeTokenParams(defaultTokenParams);
  
    const initActions = [
      governanceConfigTX(defaultGovernanceConfig),
      shamanConfigTX(defaultShamanConfig),
      metadataConfigTX(defaultMetadataConfig, POSTER),
    ];
    const args = [
      safeAddress || ZERO_ADDRESS,
      ZERO_ADDRESS,
      getNonce(),
      mintParams,
      tokenParams,
      initActions,
    ];
    console.log('args', args);
  
    return args;
  };