import { Model } from '@snapshot-labs/checkpoint';

export class FeeRecipient extends Model {
  static tableName = 'feerecipients';

  constructor(id: string) {
    super(FeeRecipient.tableName);

    this.initialSet('id', id);
    this.initialSet('recipient', "");
  }

  static async loadEntity(id: string): Promise<FeeRecipient | null> {
    const entity = await super._loadEntity(FeeRecipient.tableName, id);
    if (!entity) return null;

    const model = new FeeRecipient(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class L1ReportHash extends Model {
  static tableName = 'l1reporthashes';

  constructor(id: string) {
    super(L1ReportHash.tableName);

    this.initialSet('id', id);
    this.initialSet('hash', "");
  }

  static async loadEntity(id: string): Promise<L1ReportHash | null> {
    const entity = await super._loadEntity(L1ReportHash.tableName, id);
    if (!entity) return null;

    const model = new L1ReportHash(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class StrategyRegistered extends Model {
  static tableName = 'strategyregistereds';

  constructor(id: string) {
    super(StrategyRegistered.tableName);

    this.initialSet('id', id);
    this.initialSet('tokenManager', "");
    this.initialSet('token', "");
    this.initialSet('l1Strategy', "");
    this.initialSet('underlying', "");
    this.initialSet('performanceFees', "");
    this.initialSet('minDeposit', "");
    this.initialSet('maxDeposit', "");
    this.initialSet('minWithdrawal', "");
    this.initialSet('maxWithdrawal', "");
  }

  static async loadEntity(id: string): Promise<StrategyRegistered | null> {
    const entity = await super._loadEntity(StrategyRegistered.tableName, id);
    if (!entity) return null;

    const model = new StrategyRegistered(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class DepositLimitUpdated extends Model {
  static tableName = 'depositlimitupdateds';

  constructor(id: string) {
    super(DepositLimitUpdated.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', "");
    this.initialSet('newMinDepositLimit', "");
    this.initialSet('newMaxDepositLimit', "");
  }

  static async loadEntity(id: string): Promise<DepositLimitUpdated | null> {
    const entity = await super._loadEntity(DepositLimitUpdated.tableName, id);
    if (!entity) return null;

    const model = new DepositLimitUpdated(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class WithdrawLimitUpdated extends Model {
  static tableName = 'withdrawlimitupdateds';

  constructor(id: string) {
    super(WithdrawLimitUpdated.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', "");
    this.initialSet('newMinWithdrawLimit', "");
    this.initialSet('newMaxWithdrawLimit', "");
  }

  static async loadEntity(id: string): Promise<WithdrawLimitUpdated | null> {
    const entity = await super._loadEntity(WithdrawLimitUpdated.tableName, id);
    if (!entity) return null;

    const model = new WithdrawLimitUpdated(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class PerformanceFeeUpdated extends Model {
  static tableName = 'performancefeeupdateds';

  constructor(id: string) {
    super(PerformanceFeeUpdated.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', "");
    this.initialSet('newPerfomanceFees', "");
  }

  static async loadEntity(id: string): Promise<PerformanceFeeUpdated | null> {
    const entity = await super._loadEntity(PerformanceFeeUpdated.tableName, id);
    if (!entity) return null;

    const model = new PerformanceFeeUpdated(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class WithdrawalEpochUpdated extends Model {
  static tableName = 'withdrawalepochupdateds';

  constructor(id: string) {
    super(WithdrawalEpochUpdated.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', "");
    this.initialSet('newWithdrawalEpochDelay', "");
  }

  static async loadEntity(id: string): Promise<WithdrawalEpochUpdated | null> {
    const entity = await super._loadEntity(WithdrawalEpochUpdated.tableName, id);
    if (!entity) return null;

    const model = new WithdrawalEpochUpdated(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class DustLimitUpdated extends Model {
  static tableName = 'dustlimitupdateds';

  constructor(id: string) {
    super(DustLimitUpdated.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', "");
    this.initialSet('newDustLimit', "");
  }

  static async loadEntity(id: string): Promise<DustLimitUpdated | null> {
    const entity = await super._loadEntity(DustLimitUpdated.tableName, id);
    if (!entity) return null;

    const model = new DustLimitUpdated(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class Deposit extends Model {
  static tableName = 'deposits';

  constructor(id: string) {
    super(Deposit.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', "");
    this.initialSet('caller', "");
    this.initialSet('receiver', "");
    this.initialSet('assets', "");
    this.initialSet('shares', "");
    this.initialSet('referal', "");
  }

  static async loadEntity(id: string): Promise<Deposit | null> {
    const entity = await super._loadEntity(Deposit.tableName, id);
    if (!entity) return null;

    const model = new Deposit(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class RequestWithdrawal extends Model {
  static tableName = 'requestwithdrawals';

  constructor(id: string) {
    super(RequestWithdrawal.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', "");
    this.initialSet('caller', "");
    this.initialSet('assets', "");
    this.initialSet('shares', "");
    this.initialSet('withdrawalId', "");
    this.initialSet('epoch', "");
  }

  static async loadEntity(id: string): Promise<RequestWithdrawal | null> {
    const entity = await super._loadEntity(RequestWithdrawal.tableName, id);
    if (!entity) return null;

    const model = new RequestWithdrawal(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class ClaimWithdrawal extends Model {
  static tableName = 'claimwithdrawals';

  constructor(id: string) {
    super(ClaimWithdrawal.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', "");
    this.initialSet('caller', "");
    this.initialSet('claimId', "");
    this.initialSet('underlyingAmount', "");
  }

  static async loadEntity(id: string): Promise<ClaimWithdrawal | null> {
    const entity = await super._loadEntity(ClaimWithdrawal.tableName, id);
    if (!entity) return null;

    const model = new ClaimWithdrawal(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class BridgeInteractionInfo extends Model {
  static tableName = 'bridgeinteractioninfos';

  constructor(id: string) {
    super(BridgeInteractionInfo.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Bridge', "");
    this.initialSet('amount', "");
  }

  static async loadEntity(id: string): Promise<BridgeInteractionInfo | null> {
    const entity = await super._loadEntity(BridgeInteractionInfo.tableName, id);
    if (!entity) return null;

    const model = new BridgeInteractionInfo(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class StrategyL2Report extends Model {
  static tableName = 'strategyl2reports';

  constructor(id: string) {
    super(StrategyL2Report.tableName);

    this.initialSet('id', id);
    this.initialSet('l1Strategy', "");
    this.initialSet('actionId', "");
    this.initialSet('amount', "");
    this.initialSet('newSharePrice', "");
  }

  static async loadEntity(id: string): Promise<StrategyL2Report | null> {
    const entity = await super._loadEntity(StrategyL2Report.tableName, id);
    if (!entity) return null;

    const model = new StrategyL2Report(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class NewL2Report extends Model {
  static tableName = 'newl2reports';

  constructor(id: string) {
    super(NewL2Report.tableName);

    this.initialSet('id', id);
    this.initialSet('timestamp', 0);
    this.initialSet('blockNumber', 0);
    this.initialSet('newEpoch', "");
    this.initialSet('newBridgeDeposit', null);
    this.initialSet('newL2Report', null);
    this.initialSet('newBridgeWithdraw', null);
  }

  static async loadEntity(id: string): Promise<NewL2Report | null> {
    const entity = await super._loadEntity(NewL2Report.tableName, id);
    if (!entity) return null;

    const model = new NewL2Report(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class Transfer extends Model {
  static tableName = 'transfers';

  constructor(id: string) {
    super(Transfer.tableName);

    this.initialSet('id', id);
    this.initialSet('constractAddress', "");
    this.initialSet('from', "");
    this.initialSet('to', "");
    this.initialSet('value', "");
  }

  static async loadEntity(id: string): Promise<Transfer | null> {
    const entity = await super._loadEntity(Transfer.tableName, id);
    if (!entity) return null;

    const model = new Transfer(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

export class Approval extends Model {
  static tableName = 'approvals';

  constructor(id: string) {
    super(Approval.tableName);

    this.initialSet('id', id);
    this.initialSet('constractAddress', "");
    this.initialSet('owner', "");
    this.initialSet('spender', "");
    this.initialSet('value', "");
  }

  static async loadEntity(id: string): Promise<Approval | null> {
    const entity = await super._loadEntity(Approval.tableName, id);
    if (!entity) return null;

    const model = new Approval(id);
    model.setExists();

    for (const key in entity) {
      const value = entity[key] !== null && typeof entity[key] === 'object'
        ? JSON.stringify(entity[key])
        : entity[key];
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

  get owner(): string {
    return this.get('owner');
  }

  set owner(value: string) {
    this.set('owner', value);
  }

  get spender(): string {
    return this.get('spender');
  }

  set spender(value: string) {
    this.set('spender', value);
  }

  get value(): string {
    return this.get('value');
  }

  set value(value: string) {
    this.set('value', value);
  }
}
