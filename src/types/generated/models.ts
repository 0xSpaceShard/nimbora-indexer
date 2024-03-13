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
    this.initialSet('l1Strategy', '');
    this.initialSet('l2Strategy', '');
    this.initialSet('token', '');
    this.initialSet('underlying', '');
    this.initialSet('performanceFees', '');
    this.initialSet('tvlLimit', '');
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

  get l1Strategy(): string {
    return this.get('l1Strategy');
  }

  set l1Strategy(value: string) {
    this.set('l1Strategy', value);
  }

  get l2Strategy(): string {
    return this.get('l2Strategy');
  }

  set l2Strategy(value: string) {
    this.set('l2Strategy', value);
  }

  get token(): string {
    return this.get('token');
  }

  set token(value: string) {
    this.set('token', value);
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

  get tvlLimit(): string {
    return this.get('tvlLimit');
  }

  set tvlLimit(value: string) {
    this.set('tvlLimit', value);
  }
}

export class YieldDex_PerformanceFeeUpdated extends Model {
  static tableName = 'yielddex_performancefeeupdateds';

  constructor(id: string) {
    super(YieldDex_PerformanceFeeUpdated.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', '');
    this.initialSet('l2Strategy', '');
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

  get l2Strategy(): string {
    return this.get('l2Strategy');
  }

  set l2Strategy(value: string) {
    this.set('l2Strategy', value);
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
    this.initialSet('l2Strategy', '');
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

  get l2Strategy(): string {
    return this.get('l2Strategy');
  }

  set l2Strategy(value: string) {
    this.set('l2Strategy', value);
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
    this.initialSet('l2Strategy', '');
    this.initialSet('caller', '');
    this.initialSet('receiver', '');
    this.initialSet('assets', '');
    this.initialSet('shares', '');
    this.initialSet('referal', '');
    this.initialSet('timestamp', 0);
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

  get l2Strategy(): string {
    return this.get('l2Strategy');
  }

  set l2Strategy(value: string) {
    this.set('l2Strategy', value);
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

  get timestamp(): number {
    return this.get('timestamp');
  }

  set timestamp(value: number) {
    this.set('timestamp', value);
  }
}

export class YieldDex_RequestWithdrawal extends Model {
  static tableName = 'yielddex_requestwithdrawals';

  constructor(id: string) {
    super(YieldDex_RequestWithdrawal.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', '');
    this.initialSet('l2Strategy', '');
    this.initialSet('caller', '');
    this.initialSet('assets', '');
    this.initialSet('shares', '');
    this.initialSet('withdrawalId', '');
    this.initialSet('epoch', 0);
    this.initialSet('timestamp', 0);
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

  get l2Strategy(): string {
    return this.get('l2Strategy');
  }

  set l2Strategy(value: string) {
    this.set('l2Strategy', value);
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

  get epoch(): number {
    return this.get('epoch');
  }

  set epoch(value: number) {
    this.set('epoch', value);
  }

  get timestamp(): number {
    return this.get('timestamp');
  }

  set timestamp(value: number) {
    this.set('timestamp', value);
  }
}

export class YieldDex_ClaimWithdrawal extends Model {
  static tableName = 'yielddex_claimwithdrawals';

  constructor(id: string) {
    super(YieldDex_ClaimWithdrawal.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', '');
    this.initialSet('l2Strategy', '');
    this.initialSet('caller', '');
    this.initialSet('claimId', '');
    this.initialSet('underlyingAmount', '');
    this.initialSet('timestamp', 0);
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

  get l2Strategy(): string {
    return this.get('l2Strategy');
  }

  set l2Strategy(value: string) {
    this.set('l2Strategy', value);
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

  get timestamp(): number {
    return this.get('timestamp');
  }

  set timestamp(value: number) {
    this.set('timestamp', value);
  }
}

export class YieldDex_BridgeInteractionInfo extends Model {
  static tableName = 'yielddex_bridgeinteractioninfos';

  constructor(id: string) {
    super(YieldDex_BridgeInteractionInfo.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Bridge', '');
    this.initialSet('amount', '');
    this.initialSet('timestamp', 0);
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

  get timestamp(): number {
    return this.get('timestamp');
  }

  set timestamp(value: number) {
    this.set('timestamp', value);
  }
}

export class YieldDex_TvlLimitUpdated extends Model {
  static tableName = 'yielddex_tvllimitupdateds';

  constructor(id: string) {
    super(YieldDex_TvlLimitUpdated.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', '');
    this.initialSet('l2Strategy', '');
    this.initialSet('newTvlLimit', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_TvlLimitUpdated | null> {
    const entity = await super._loadEntity(YieldDex_TvlLimitUpdated.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_TvlLimitUpdated(id);
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

  get l2Strategy(): string {
    return this.get('l2Strategy');
  }

  set l2Strategy(value: string) {
    this.set('l2Strategy', value);
  }

  get newTvlLimit(): string {
    return this.get('newTvlLimit');
  }

  set newTvlLimit(value: string) {
    this.set('newTvlLimit', value);
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
    this.initialSet('processed', false);
    this.initialSet('newSharePrice', '');
    this.initialSet('timestamp', 0);
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

  get processed(): boolean {
    return this.get('processed');
  }

  set processed(value: boolean) {
    this.set('processed', value);
  }

  get newSharePrice(): string {
    return this.get('newSharePrice');
  }

  set newSharePrice(value: string) {
    this.set('newSharePrice', value);
  }

  get timestamp(): number {
    return this.get('timestamp');
  }

  set timestamp(value: number) {
    this.set('timestamp', value);
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
    this.initialSet('eth', '');
    this.initialSet('lusd', '');
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

  get eth(): string {
    return this.get('eth');
  }

  set eth(value: string) {
    this.set('eth', value);
  }

  get lusd(): string {
    return this.get('lusd');
  }

  set lusd(value: string) {
    this.set('lusd', value);
  }

  get timestamp(): number {
    return this.get('timestamp');
  }

  set timestamp(value: number) {
    this.set('timestamp', value);
  }
}

export class Liquity_UserAction extends Model {
  static tableName = 'liquity_useractions';

  constructor(id: string) {
    super(Liquity_UserAction.tableName);

    this.initialSet('id', id);
    this.initialSet('hash', '');
    this.initialSet('block', 0);
    this.initialSet('address', '');
    this.initialSet('nonce', 0);
    this.initialSet('action', 0);
    this.initialSet('user', '');
    this.initialSet('amount', '');
    this.initialSet('timestamp', 0);
  }

  static async loadEntity(id: string): Promise<Liquity_UserAction | null> {
    const entity = await super._loadEntity(Liquity_UserAction.tableName, id);
    if (!entity) return null;

    const model = new Liquity_UserAction(id);
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

  get block(): number {
    return this.get('block');
  }

  set block(value: number) {
    this.set('block', value);
  }

  get address(): string {
    return this.get('address');
  }

  set address(value: string) {
    this.set('address', value);
  }

  get nonce(): number {
    return this.get('nonce');
  }

  set nonce(value: number) {
    this.set('nonce', value);
  }

  get action(): number {
    return this.get('action');
  }

  set action(value: number) {
    this.set('action', value);
  }

  get user(): string {
    return this.get('user');
  }

  set user(value: string) {
    this.set('user', value);
  }

  get amount(): string {
    return this.get('amount');
  }

  set amount(value: string) {
    this.set('amount', value);
  }

  get timestamp(): number {
    return this.get('timestamp');
  }

  set timestamp(value: number) {
    this.set('timestamp', value);
  }
}

export class YieldDex_TM_Transfer extends Model {
  static tableName = 'yielddex_tm_transfers';

  constructor(id: string) {
    super(YieldDex_TM_Transfer.tableName);

    this.initialSet('id', id);
    this.initialSet('contractAddress', '');
    this.initialSet('from', '');
    this.initialSet('to', '');
    this.initialSet('value', '');
    this.initialSet('timestamp', 0);
  }

  static async loadEntity(id: string): Promise<YieldDex_TM_Transfer | null> {
    const entity = await super._loadEntity(YieldDex_TM_Transfer.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_TM_Transfer(id);
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

  get contractAddress(): string {
    return this.get('contractAddress');
  }

  set contractAddress(value: string) {
    this.set('contractAddress', value);
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

  get timestamp(): number {
    return this.get('timestamp');
  }

  set timestamp(value: number) {
    this.set('timestamp', value);
  }
}

export class YieldDex_TM_balanceOf extends Model {
  static tableName = 'yielddex_tm_balanceoves';

  constructor(id: string) {
    super(YieldDex_TM_balanceOf.tableName);

    this.initialSet('id', id);
    this.initialSet('balance', '');
  }

  static async loadEntity(id: string): Promise<YieldDex_TM_balanceOf | null> {
    const entity = await super._loadEntity(YieldDex_TM_balanceOf.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_TM_balanceOf(id);
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

  get balance(): string {
    return this.get('balance');
  }

  set balance(value: string) {
    this.set('balance', value);
  }
}

export class YieldDex_TM_holders extends Model {
  static tableName = 'yielddex_tm_holders';

  constructor(id: string) {
    super(YieldDex_TM_holders.tableName);

    this.initialSet('id', id);
    this.initialSet('holders', 0);
  }

  static async loadEntity(id: string): Promise<YieldDex_TM_holders | null> {
    const entity = await super._loadEntity(YieldDex_TM_holders.tableName, id);
    if (!entity) return null;

    const model = new YieldDex_TM_holders(id);
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

  get holders(): number {
    return this.get('holders');
  }

  set holders(value: number) {
    this.set('holders', value);
  }
}
