export const LiquityEvents = [
  {
    name: 'BatchRequest',
    fn: 'liquity_HandleBatchRequest',
  },
];

const liquityAddressesMainnet = [
  {
    name: 'trove_275',
    contract: '0x03580a65260563b5511ddf2eafb83d6b309dce7fc25271df8c040a437f09a399',
    start: 553937,
    events: LiquityEvents,
  },
  {
    name: 'trove_400',
    contract: '0x02a67288e48a8c4e2881aee422da7841fc11fef195e0a81f929871c77f07509d',
    start: 553937,
    events: LiquityEvents,
  },
];

const liquityAddressesSepolia = [
  {
    name: 'trove_400',
    contract: '',
    start: 0,
    events: LiquityEvents,
  },
  {
    name: 'trove_275',
    contract: '',
    start: 0,
    events: LiquityEvents,
  },
];

export const liquityAddresses = (network: string) => {
  switch (network) {
    case 'mainnet':
      return liquityAddressesMainnet;
    case 'sepolia':
      return liquityAddressesSepolia;
  }
};
