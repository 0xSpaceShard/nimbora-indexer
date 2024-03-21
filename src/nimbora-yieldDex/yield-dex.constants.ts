export const ZeroAddress = '0x0000000000000000000000000000000000000000000000000000000000000000';
export const UpgradeEventsBlock_1 = 597506;
export const UpgradeEventsBlock_2 = 602094;

export const YDEvents = [
  {
    name: 'FeesRecipientUpdated',
    fn: 'yd_HandleSetFeeRecipient',
  },
  {
    name: 'NewL1ReportHash',
    fn: 'yd_HandleNewL1ReportHash',
  },
  {
    name: 'NewL2Report',
    fn: 'yd_HandleNewL2Report',
  },
  {
    name: 'StrategyRegistered',
    fn: 'yd_HandleRegisterStrategy',
  },
  {
    name: 'PerformanceFeeUpdated',
    fn: 'yd_HandlePerformanceFeeUpdated',
  },
  {
    name: 'WithdrawalEpochUpdated',
    fn: 'yd_HandleWithdrawalEpochUpdated',
  },
  {
    name: 'DustLimitUpdated',
    fn: 'yd_HandleDustLimitUpdated',
  },
  {
    name: 'Deposit',
    fn: 'yd_HandleDeposit',
  },
  {
    name: 'RequestWithdrawal',
    fn: 'yd_HandleRequestWithdrawal',
  },
  {
    name: 'ClaimWithdrawal',
    fn: 'yd_HandleClaimWithdrawal',
  },
];

const YDAddressesMainnet = [
  {
    name: 'l2-pooling-manager',
    contract: '0x065a953f89a314a427e960114c4b9bb83e0e4195f801f12c25e4a323a76da0a9',
    start: 553937,
    events: YDEvents,
  },
];

const YDAddressesSepolia = [
  {
    name: 'l2-pooling-manager',
    contract: '0x0384ec344325e87627749e26d1c7c4eeaa086e9b61af2cdffd8f8c7ad83656d0',
    start: 37625,
    events: YDEvents,
  },
];

export const ydAddresses = (network: string) => {
  switch (network) {
    case 'mainnet':
      return YDAddressesMainnet;
    case 'sepolia':
      return YDAddressesSepolia;
  }
};
