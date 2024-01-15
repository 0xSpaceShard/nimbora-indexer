import { uint256 } from 'https://esm.sh/starknet';

const NETWORK = Deno.env.get('NETWORK');
const DATABASE_URL = Deno.env.get('DATABASE_URL');
const SinkType = 'postgres';
const TableName = 'liquity_lending_batches';
const Finality = 'DATA_STATUS_ACCEPTED';
const Network = `starknet-${NETWORK}`;

const newtorkConfiguration = (network) => {
  switch (network) {
    case 'goerli':
      return {
        startingBlock: 927880,
        streamUrl: 'https://goerli.starknet.a5a.ch',
        filter: {
          header: { weak: true },
          events: [
            {
              fromAddress: '0x016a8a20fafbe9afa5ddeaa03640656192c9e39bf96a34e0135de866beba619b',
              keys: ['0x1502ad39d6a2545a2ed37ddba44b02ecc2a62b06efa1d69213ff7c158a94a34'],
            },
          ],
        },
      };
    case 'sepolia':
      return {
        startingBlock: 927880,
        streamUrl: 'https://sepolia.starknet.a5a.ch',
        filter: {
          header: { weak: true },
          events: [
            {
              fromAddress: '0x016a8a20fafbe9afa5ddeaa03640656192c9e39bf96a34e0135de866beba619b',
              keys: ['0x1502ad39d6a2545a2ed37ddba44b02ecc2a62b06efa1d69213ff7c158a94a34'],
            },
          ],
        },
      };
    case 'mainnet':
      return {
        startingBlock: 927880,
        streamUrl: 'https://mainnet.starknet.a5a.ch',
        filter: {
          header: { weak: true },
          events: [
            {
              fromAddress: '0x016a8a20fafbe9afa5ddeaa03640656192c9e39bf96a34e0135de866beba619b',
              keys: ['0x1502ad39d6a2545a2ed37ddba44b02ecc2a62b06efa1d69213ff7c158a94a34'],
            },
          ],
        },
      };
  }
};

const getConfigs = () => {
  const { streamUrl, startingBlock, filter } = newtorkConfiguration(NETWORK);
  return {
    streamUrl,
    startingBlock,
    network: 'starknet',
    finality: Finality,
    filter,
    sinkType: SinkType,
    sinkOptions: {
      connectionString: DATABASE_URL,
      tableName: TableName,
      entityMode: true,
    },
  };
};

export const config = getConfigs();

const parseLiquityBatch = (event) => {
  const nonce = uint256.uint256ToBN({
    low: event.data[0],
    high: event.data[1],
  });

  const eth = uint256.uint256ToBN({
    low: event.data[2],
    high: event.data[3],
  });

  const lusd = uint256.uint256ToBN({
    low: event.data[4],
    high: event.data[5],
  });

  return {
    nonce,
    eth,
    lusd,
  };
};

export default function transform(block) {
  const { events, header } = block;
  console.log();
  return events.map(({ event, receipt }) => {
    const { transactionHash } = receipt;
    const { fromAddress } = event;
    const { blockNumber } = header;

    const { nonce, eth, lusd } = parseLiquityBatch(event);

    console.log(blockNumber, {
      nonce: BigInt(nonce).toString(),
      hash: transactionHash,
      network: Network,
      address: fromAddress,
      block: Number(blockNumber),
      amountEth: BigInt(eth).toString(),
      amountLusd: BigInt(lusd).toString(),
      timestamp: header.timestamp,
    });

    return {
      insert: {
        nonce: BigInt(nonce).toString(),
        hash: transactionHash,
        network: Network,
        address: fromAddress,
        block: Number(blockNumber),
        amountEth: BigInt(eth).toString(),
        amountLusd: BigInt(lusd).toString(),
        timestamp: header.timestamp,
      },
    };
  });
}
