export const LiquityEvents = [
  {
    name: 'BatchRequest',
    fn: 'liquity_HandleBatchRequest',
  },
];

const LiquityAddressesMainnet = [
  {
    name: 'trove_275',
    contract: '0x03580a65260563b5511ddf2eafb83d6b309dce7fc25271df8c040a437f09a399',
    start: 219200,
    events: LiquityEvents,
  },
  {
    name: 'trove_400',
    contract: '0x02a67288e48a8c4e2881aee422da7841fc11fef195e0a81f929871c77f07509d',
    start: 219200,
    events: LiquityEvents,
  },
];

const LiquityAddressesGoerli = [
  {
    name: 'trove_400',
    contract: '0x043acb79a8436b35d98a9231be51ee69e7aaea6e0feb3eaf186ef0d3ba4d8c7f',
    start: 888100,
    events: LiquityEvents,
  },
  {
    name: 'trove_275',
    contract: '0x03b3e6f26fa0b0e932a356d5394d3bc43b098962bf7982f4204350c561aada2f',
    start: 882377,
    events: LiquityEvents,
  },
];

export const liquityAddresses = (network: string) => {
  switch (network) {
    case 'mainnet':
      return LiquityAddressesMainnet;
    case 'goerli':
      return LiquityAddressesGoerli;
    default:
      return LiquityAddressesGoerli;
  }
};
