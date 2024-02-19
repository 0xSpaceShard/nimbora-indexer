import { Model } from '@snapshot-labs/checkpoint';

export class YieldDex_FeeRecipient extends Model {
  static tableName = 'yielddex_feerecipients';

  constructor(id: string) {
    super(YieldDex_FeeRecipient.tableName);

    this.initialSet('id', id);
    this.initialSet('recipient', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_FeeRecipient | null> {
    const entity = await super._loadEntity(YieldDex_FeeRecipient.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_FeeRecipient(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get recipient(): string {
    return this.get('recipient');
  }

  set recipient(value: string) {
    this.set('recipient', value);
  }
}

export class YieldDex_L1ReportHash extends Model {
  static tableName = 'yielddex_l1reporthashes';

  constructor(id: string) {
    super(YieldDex_L1ReportHash.tableName);

    this.initialSet('id', id);
    this.initialSet('hash', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_L1ReportHash | null> {
    const entity = await super._loadEntity(YieldDex_L1ReportHash.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_L1ReportHash(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get hash(): string {
    return this.get('hash');
  }

  set hash(value: string) {
    this.set('hash', value);
  }
}

export class YieldDex_StrategyRegistered extends Model {
  static tableName = 'yielddex_strategyregistereds';

  constructor(id: string) {
    super(YieldDex_StrategyRegistered.tableName);

    this.initialSet('id', id);
    this.initialSet('tokenManager', '');
    this.initialSet('token', '');
    this.initialSet('l1Strategy', '');
    this.initialSet('underlying', '');
    this.initialSet('performanceFees', '');
    this.initialSet('minDeposit', '');
    this.initialSet('maxDeposit', '');
    this.initialSet('minWithdrawal', '');
    this.initialSet('maxWithdrawal', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_StrategyRegistered | null> {
    const entity = await super._loadEntity(YieldDex_StrategyRegistered.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_StrategyRegistered(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get tokenManager(): string {
    return this.get('tokenManager');
  }

  set tokenManager(value: string) {
    this.set('tokenManager', value);
  }

  get token(): string {
    return this.get('token');
  }

  set token(value: string) {
    this.set('token', value);
  }

  get l1Strategy(): string {
    return this.get('l1Strategy');
  }

  set l1Strategy(value: string) {
    this.set('l1Strategy', value);
  }

  get underlying(): string {
    return this.get('underlying');
  }

  set underlying(value: string) {
    this.set('underlying', value);
  }

  get performanceFees(): string {
    return this.get('performanceFees');
  }

  set performanceFees(value: string) {
    this.set('performanceFees', value);
  }

  get minDeposit(): string {
    return this.get('minDeposit');
  }

  set minDeposit(value: string) {
    this.set('minDeposit', value);
  }

  get maxDeposit(): string {
    return this.get('maxDeposit');
  }

  set maxDeposit(value: string) {
    this.set('maxDeposit', value);
  }

  get minWithdrawal(): string {
    return this.get('minWithdrawal');
  }

  set minWithdrawal(value: string) {
    this.set('minWithdrawal', value);
  }

  get maxWithdrawal(): string {
    return this.get('maxWithdrawal');
  }

  set maxWithdrawal(value: string) {
    this.set('maxWithdrawal', value);
  }
}

export class YieldDex_DepositLimitUpdated extends Model {
  static tableName = 'yielddex_depositlimitupdateds';

  constructor(id: string) {
    super(YieldDex_DepositLimitUpdated.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', '');
    this.initialSet('newMinDepositLimit', '');
    this.initialSet('newMaxDepositLimit', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_DepositLimitUpdated | null> {
    const entity = await super._loadEntity(YieldDex_DepositLimitUpdated.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_DepositLimitUpdated(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get l1Strategy(): string {
    return this.get('l1Strategy');
  }

  set l1Strategy(value: string) {
    this.set('l1Strategy', value);
  }

  get newMinDepositLimit(): string {
    return this.get('newMinDepositLimit');
  }

  set newMinDepositLimit(value: string) {
    this.set('newMinDepositLimit', value);
  }

  get newMaxDepositLimit(): string {
    return this.get('newMaxDepositLimit');
  }

  set newMaxDepositLimit(value: string) {
    this.set('newMaxDepositLimit', value);
  }
}

export class YieldDex_WithdrawLimitUpdated extends Model {
  static tableName = 'yielddex_withdrawlimitupdateds';

  constructor(id: string) {
    super(YieldDex_WithdrawLimitUpdated.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', '');
    this.initialSet('newMinWithdrawLimit', '');
    this.initialSet('newMaxWithdrawLimit', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_WithdrawLimitUpdated | null> {
    const entity = await super._loadEntity(YieldDex_WithdrawLimitUpdated.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_WithdrawLimitUpdated(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get l1Strategy(): string {
    return this.get('l1Strategy');
  }

  set l1Strategy(value: string) {
    this.set('l1Strategy', value);
  }

  get newMinWithdrawLimit(): string {
    return this.get('newMinWithdrawLimit');
  }

  set newMinWithdrawLimit(value: string) {
    this.set('newMinWithdrawLimit', value);
  }

  get newMaxWithdrawLimit(): string {
    return this.get('newMaxWithdrawLimit');
  }

  set newMaxWithdrawLimit(value: string) {
    this.set('newMaxWithdrawLimit', value);
  }
}

export class YieldDex_PerformanceFeeUpdated extends Model {
  static tableName = 'yielddex_performancefeeupdateds';

  constructor(id: string) {
    super(YieldDex_PerformanceFeeUpdated.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', '');
    this.initialSet('newPerfomanceFees', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_PerformanceFeeUpdated | null> {
    const entity = await super._loadEntity(YieldDex_PerformanceFeeUpdated.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_PerformanceFeeUpdated(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get l1Strategy(): string {
    return this.get('l1Strategy');
  }

  set l1Strategy(value: string) {
    this.set('l1Strategy', value);
  }

  get newPerfomanceFees(): string {
    return this.get('newPerfomanceFees');
  }

  set newPerfomanceFees(value: string) {
    this.set('newPerfomanceFees', value);
  }
}

export class YieldDex_WithdrawalEpochUpdated extends Model {
  static tableName = 'yielddex_withdrawalepochupdateds';

  constructor(id: string) {
    super(YieldDex_WithdrawalEpochUpdated.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', '');
    this.initialSet('newWithdrawalEpochDelay', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_WithdrawalEpochUpdated | null> {
    const entity = await super._loadEntity(YieldDex_WithdrawalEpochUpdated.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_WithdrawalEpochUpdated(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get l1Strategy(): string {
    return this.get('l1Strategy');
  }

  set l1Strategy(value: string) {
    this.set('l1Strategy', value);
  }

  get newWithdrawalEpochDelay(): string {
    return this.get('newWithdrawalEpochDelay');
  }

  set newWithdrawalEpochDelay(value: string) {
    this.set('newWithdrawalEpochDelay', value);
  }
}

export class YieldDex_DustLimitUpdated extends Model {
  static tableName = 'yielddex_dustlimitupdateds';

  constructor(id: string) {
    super(YieldDex_DustLimitUpdated.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', '');
    this.initialSet('newDustLimit', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_DustLimitUpdated | null> {
    const entity = await super._loadEntity(YieldDex_DustLimitUpdated.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_DustLimitUpdated(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get l1Strategy(): string {
    return this.get('l1Strategy');
  }

  set l1Strategy(value: string) {
    this.set('l1Strategy', value);
  }

  get newDustLimit(): string {
    return this.get('newDustLimit');
  }

  set newDustLimit(value: string) {
    this.set('newDustLimit', value);
  }
}

export class YieldDex_Deposit extends Model {
  static tableName = 'yielddex_deposits';

  constructor(id: string) {
    super(YieldDex_Deposit.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', '');
    this.initialSet('caller', '');
    this.initialSet('receiver', '');
    this.initialSet('assets', '');
    this.initialSet('shares', '');
    this.initialSet('referal', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_Deposit | null> {
    const entity = await super._loadEntity(YieldDex_Deposit.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_Deposit(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get l1Strategy(): string {
    return this.get('l1Strategy');
  }

  set l1Strategy(value: string) {
    this.set('l1Strategy', value);
  }

  get caller(): string {
    return this.get('caller');
  }

  set caller(value: string) {
    this.set('caller', value);
  }

  get receiver(): string {
    return this.get('receiver');
  }

  set receiver(value: string) {
    this.set('receiver', value);
  }

  get assets(): string {
    return this.get('assets');
  }

  set assets(value: string) {
    this.set('assets', value);
  }

  get shares(): string {
    return this.get('shares');
  }

  set shares(value: string) {
    this.set('shares', value);
  }

  get referal(): string {
    return this.get('referal');
  }

  set referal(value: string) {
    this.set('referal', value);
  }
}

export class YieldDex_RequestWithdrawal extends Model {
  static tableName = 'yielddex_requestwithdrawals';

  constructor(id: string) {
    super(YieldDex_RequestWithdrawal.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', '');
    this.initialSet('caller', '');
    this.initialSet('assets', '');
    this.initialSet('shares', '');
    this.initialSet('withdrawalId', '');
    this.initialSet('epoch', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_RequestWithdrawal | null> {
    const entity = await super._loadEntity(YieldDex_RequestWithdrawal.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_RequestWithdrawal(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get l1Strategy(): string {
    return this.get('l1Strategy');
  }

  set l1Strategy(value: string) {
    this.set('l1Strategy', value);
  }

  get caller(): string {
    return this.get('caller');
  }

  set caller(value: string) {
    this.set('caller', value);
  }

  get assets(): string {
    return this.get('assets');
  }

  set assets(value: string) {
    this.set('assets', value);
  }

  get shares(): string {
    return this.get('shares');
  }

  set shares(value: string) {
    this.set('shares', value);
  }

  get withdrawalId(): string {
    return this.get('withdrawalId');
  }

  set withdrawalId(value: string) {
    this.set('withdrawalId', value);
  }

  get epoch(): string {
    return this.get('epoch');
  }

  set epoch(value: string) {
    this.set('epoch', value);
  }
}

export class YieldDex_ClaimWithdrawal extends Model {
  static tableName = 'yielddex_claimwithdrawals';

  constructor(id: string) {
    super(YieldDex_ClaimWithdrawal.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', '');
    this.initialSet('caller', '');
    this.initialSet('claimId', '');
    this.initialSet('underlyingAmount', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_ClaimWithdrawal | null> {
    const entity = await super._loadEntity(YieldDex_ClaimWithdrawal.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_ClaimWithdrawal(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get l1Strategy(): string {
    return this.get('l1Strategy');
  }

  set l1Strategy(value: string) {
    this.set('l1Strategy', value);
  }

  get caller(): string {
    return this.get('caller');
  }

  set caller(value: string) {
    this.set('caller', value);
  }

  get claimId(): string {
    return this.get('claimId');
  }

  set claimId(value: string) {
    this.set('claimId', value);
  }

  get underlyingAmount(): string {
    return this.get('underlyingAmount');
  }

  set underlyingAmount(value: string) {
    this.set('underlyingAmount', value);
  }
}

export class YieldDex_BridgeInteractionInfo extends Model {
  static tableName = 'yielddex_bridgeinteractioninfos';

  constructor(id: string) {
    super(YieldDex_BridgeInteractionInfo.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Bridge', '');
    this.initialSet('amount', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_BridgeInteractionInfo | null> {
    const entity = await super._loadEntity(YieldDex_BridgeInteractionInfo.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_BridgeInteractionInfo(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get l1Bridge(): string {
    return this.get('l1Bridge');
  }

  set l1Bridge(value: string) {
    this.set('l1Bridge', value);
  }

  get amount(): string {
    return this.get('amount');
  }

  set amount(value: string) {
    this.set('amount', value);
  }
}

export class YieldDex_StrategyL2Report extends Model {
  static tableName = 'yielddex_strategyl2reports';

  constructor(id: string) {
    super(YieldDex_StrategyL2Report.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', '');
    this.initialSet('actionId', '');
    this.initialSet('amount', '');
    this.initialSet('newSharePrice', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_StrategyL2Report | null> {
    const entity = await super._loadEntity(YieldDex_StrategyL2Report.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_StrategyL2Report(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get l1Strategy(): string {
    return this.get('l1Strategy');
  }

  set l1Strategy(value: string) {
    this.set('l1Strategy', value);
  }

  get actionId(): string {
    return this.get('actionId');
  }

  set actionId(value: string) {
    this.set('actionId', value);
  }

  get amount(): string {
    return this.get('amount');
  }

  set amount(value: string) {
    this.set('amount', value);
  }

  get newSharePrice(): string {
    return this.get('newSharePrice');
  }

  set newSharePrice(value: string) {
    this.set('newSharePrice', value);
  }
}

export class YieldDex_NewL2Report extends Model {
  static tableName = 'yielddex_newl2reports';

  constructor(id: string) {
    super(YieldDex_NewL2Report.tableName);

    this.initialSet('id', id);
    this.initialSet('hash', '');
    this.initialSet('timestamp', 0);
    this.initialSet('blockNumber', 0);
    this.initialSet('newEpoch', '');
    this.initialSet('newBridgeDeposit', null);
    this.initialSet('newL2Report', null);
    this.initialSet('newBridgeWithdraw', null);
  }

  static async loadEntity(id: string): Promise<YieldDex_NewL2Report | null> {
    const entity = await super._loadEntity(YieldDex_NewL2Report.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_NewL2Report(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get hash(): string {
    return this.get('hash');
  }

  set hash(value: string) {
    this.set('hash', value);
  }

  get timestamp(): number {
    return this.get('timestamp');
  }

  set timestamp(value: number) {
    this.set('timestamp', value);
  }

  get blockNumber(): number {
    return this.get('blockNumber');
  }

  set blockNumber(value: number) {
    this.set('blockNumber', value);
  }

  get newEpoch(): string {
    return this.get('newEpoch');
  }

  set newEpoch(value: string) {
    this.set('newEpoch', value);
  }

  get newBridgeDeposit(): string[] | null {
    return JSON.parse(this.get('newBridgeDeposit'));
  }

  set newBridgeDeposit(value: string[] | null) {
    this.set('newBridgeDeposit', JSON.stringify(value));
  }

  get newL2Report(): string[] | null {
    return JSON.parse(this.get('newL2Report'));
  }

  set newL2Report(value: string[] | null) {
    this.set('newL2Report', JSON.stringify(value));
  }

  get newBridgeWithdraw(): string[] | null {
    return JSON.parse(this.get('newBridgeWithdraw'));
  }

  set newBridgeWithdraw(value: string[] | null) {
    this.set('newBridgeWithdraw', JSON.stringify(value));
  }
}

export class Liquity_Batch extends Model {
  static tableName = 'liquity_batches';

  constructor(id: string) {
    super(Liquity_Batch.tableName);

    this.initialSet('id', id);
    this.initialSet('hash', '');
    this.initialSet('address', '');
    this.initialSet('block', 0);
    this.initialSet('nonce', 0);
    this.initialSet('amountA', '');
    this.initialSet('amountB', '');
    this.initialSet('timestamp', 0);
  }

  static async loadEntity(id: string): Promise<Liquity_Batch | null> {
    const entity = await super._loadEntity(Liquity_Batch.tableName, id);
    if (!entity) return null;

    const model = new Liquity_Batch(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get hash(): string {
    return this.get('hash');
  }

  set hash(value: string) {
    this.set('hash', value);
  }

  get address(): string {
    return this.get('address');
  }

  set address(value: string) {
    this.set('address', value);
  }

  get block(): number {
    return this.get('block');
  }

  set block(value: number) {
    this.set('block', value);
  }

  get nonce(): number {
    return this.get('nonce');
  }

  set nonce(value: number) {
    this.set('nonce', value);
  }

  get amountA(): string {
    return this.get('amountA');
  }

  set amountA(value: string) {
    this.set('amountA', value);
  }

  get amountB(): string {
    return this.get('amountB');
  }

  set amountB(value: string) {
    this.set('amountB', value);
  }

  get timestamp(): number {
    return this.get('timestamp');
  }

  set timestamp(value: number) {
    this.set('timestamp', value);
  }
}

export class Transfer extends Model {
  static tableName = 'transfers';

  constructor(id: string) {
    super(Transfer.tableName);

    this.initialSet('id', id);
    this.initialSet('constractAddress', '');
    this.initialSet('from', '');
    this.initialSet('to', '');
    this.initialSet('value', '');
  }

  static async loadEntity(id: string): Promise<Transfer | null> {
    const entity = await super._loadEntity(Transfer.tableName, id);
    if (!entity) return null;

    const model = new Transfer(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object' ? JSON.stringify(entity[key]) : entity[key];
      model.set(key, value);
    }

    return model;
  }

  get id(): string {
    return this.get('id');
  }

  set id(value: string) {
    this.set('id', value);
  }

  get constractAddress(): string {
    return this.get('constractAddress');
  }

  set constractAddress(value: string) {
    this.set('constractAddress', value);
  }

  get from(): string {
    return this.get('from');
  }

  set from(value: string) {
    this.set('from', value);
  }

  get to(): string {
    return this.get('to');
  }

  set to(value: string) {
    this.set('to', value);
  }

  get value(): string {
    return this.get('value');
  }

  set value(value: string) {
    this.set('value', value);
  }
}
