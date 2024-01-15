import { FieldElement, v1alpha2 } from '@apibara/starknet';
import { uint256 } from 'starknet';

export class BatchRequest {
  nonce: number;
  amountEth: bigint;
  amountLusd: bigint;

  constructor(nonce: number, eth: bigint, lusd: bigint) {
    this.nonce = nonce;
    this.amountEth = eth;
    this.amountLusd = lusd;
  }

  static from(data: Array<v1alpha2.IFieldElement>): BatchRequest {
    const nonce = uint256.uint256ToBN({
      low: FieldElement.toHex(data[0]),
      high: FieldElement.toHex(data[1]),
    });

    const eth = uint256.uint256ToBN({
      low: FieldElement.toHex(data[2]),
      high: FieldElement.toHex(data[3]),
    });

    const lusd = uint256.uint256ToBN({
      low: FieldElement.toHex(data[4]),
      high: FieldElement.toHex(data[5]),
    });

    return new BatchRequest(Number(nonce), eth, lusd);
  }
}
