import { useQuery } from 'react-query';

import {
  ValidNetwork,
  Keychain,
  GRAPH_API_KEYS,
} from '@daohaus/keychain-utils';
import { listRecords } from '@daohaus/moloch-v3-data';
import { handleErrorMessage } from '@daohaus/utils';

/**
 * Fetches a list of records from the specified DAO and of the given type
 * @param daoId - the DAO id to fetch the records from
 * @param chainId - the Ethereum network id to use
 * @param recordType - the type of record to fetch
 * @param pageSize - the number of records to fetch per page (default: 20)
 * @param offset - the offset from which to start fetching records (default: 0)
 * @param graphApiKeys - the API keys to use for accessing The Graph (default: GRAPH_API_KEYS)
 * @param credentialType - an optional type of credential to filter by
 * @returns a Promise that resolves to an array of record items
 * @throws an Error if the request fails
 */
const fetchRecords = async ({
  daoId,
  chainId,
  recordType,
  pageSize,
  offset,
  graphApiKeys,
  credentialType,
}: {
  daoId: string;
  chainId: ValidNetwork;
  recordType: string;
  pageSize: number;
  offset: number;
  graphApiKeys: Keychain;
  credentialType?: string;
}) => {
  try {
    const data = await listRecords({
      networkId: chainId,
      graphApiKeys: graphApiKeys,
      filter: { dao: daoId, table: recordType },
      paging: { pageSize, offset },
    });
    if (credentialType) {
      return data.items.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) =>
          item?.parsedContent?.credentialIdentifier === credentialType
      );
    }
    return data.items;
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ error, fallback: 'Error fetching records' })
    );
  }
};

/**
 * Hook that fetches a list of records of the given type for the specified DAO
 * @param daoId - the DAO id to fetch the records from
 * @param chainId - the Ethereum network id to use
 * @param recordType - the type of record to fetch
 * @param pageSize - the number of records to fetch per page (default: 20)
 * @param offset - the offset from which to start fetching records (default: 0)
 * @param graphApiKeys - the API keys to use for accessing The Graph (default: GRAPH_API_KEYS)
 * @param credentialType - an optional type of credential to filter by
 * @returns an object with the fetched records and error (if any), and other `useQuery` props
 */
export const useCookieReason = ({
  daoId,
  chainId,
  recordType,
  pageSize = 20,
  offset = 0,
  graphApiKeys = GRAPH_API_KEYS,
  credentialType,
}: {
  daoId: string;
  chainId: ValidNetwork;
  recordType: string;
  pageSize?: number;
  offset?: number;
  graphApiKeys?: Keychain;
  credentialType?: string;
}) => {

  const { data, error, ...rest } = useQuery(
    [credentialType || recordType, { daoId, chainId }],
    () =>
      fetchRecords({
        daoId,
        chainId: chainId as ValidNetwork,
        recordType,
        pageSize,
        offset,
        graphApiKeys,
        credentialType,
      }),
    { enabled: !!daoId && !!chainId }
  );  

  return { records: data, error: error as Error | null, ...rest };
};