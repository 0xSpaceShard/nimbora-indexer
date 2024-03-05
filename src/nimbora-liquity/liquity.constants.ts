export const LiquityEvents = [
  {
    name: 'BatchRequest',
    fn: 'liquity_HandleBatchRequest',
  },
];

export const lusdEvents = [
  {
    name: 'Transfer',
    fn: 'liquity_Transfer',
  }
]

const liquityAddressesMainnet = [
  {
    name: 'trove_275',
    contract: '0x3580a65260563b5511ddf2eafb83d6b309dce7fc25271df8c040a437f09a399',
    start: 219200,
    events: LiquityEvents,
  },
  {
    name: 'trove_400',
    contract: '0x2a67288e48a8c4e2881aee422da7841fc11fef195e0a81f929871c77f07509d',
    start: 219200,
    events: LiquityEvents,
  },
  {
    name: 'lusd',
    contract: '0x070a76fd48ca0ef910631754d77dd822147fe98a569b826ec85e3c33fde586ac',
    start: 594160,
    events: lusdEvents,
  }
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
