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
    name: 'DepositLimitUpdated',
    fn: 'yd_HandleDepositLimitUpdated',
  },
  {
    name: 'WithdrawLimitUpdated',
    fn: 'yd_HandleWithdrawLimitUpdated',
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

const YDAddressesGoerli = [
  {
    name: 'l2-pooling-manager',
    contract: '0x0504d072f8d10a19be9248dbbc034a0bb6a087426a73718307510e3eb81cbd00',
    start: 934841,
    events: YDEvents,
  },
];

export const ydAddresses = (network: string) => {
  switch (network) {
    case 'mainnet':
      return YDAddressesMainnet;
    case 'goerli':
      return YDAddressesGoerli;
    default:
      return YDAddressesGoerli;
  }
};
