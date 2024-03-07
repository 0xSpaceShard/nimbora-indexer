import { getOrCreateMetric } from '@willsoto/nestjs-prometheus';
import { Options, Metrics, Metric } from './prometheus.interface';
import { METRICS_PREFIX } from './prometheus.constants';

export class PrometheusService {
  protected prefix = METRICS_PREFIX;

  protected getOrCreateMetric<T extends Metrics, L extends string>(type: T, options: Options<L>): Metric<T, L> {
    const prefixedName = options.prefix ? this.prefix + options.name : options.name;

    return getOrCreateMetric(type, {
      ...options,
      name: prefixedName,
    }) as Metric<T, L>;
  }

  public buildInfo = this.getOrCreateMetric('Gauge', {
    prefix: false,
    name: 'build_info',
    help: 'Build information',
    labelNames: ['name', 'version', 'env'],
  });

  public serviceErrors = this.getOrCreateMetric('Counter', {
    prefix: true,
    name: 'service_errors',
    help: 'Global counter for service errors',
    labelNames: [],
  });

  public web3ProviderRequest = this.getOrCreateMetric('Counter', {
    prefix: true,
    name: 'web3_provider_request',
    help: 'Increase the count each time a successful call is made to the web3 provider.',
    labelNames: ['provider'],
  });

  public web3ProviderRequestError = this.getOrCreateMetric('Counter', {
    prefix: true,
    name: 'web3_provider_request_error',
    help: 'Increase the count each time a call to the web3 provider fails.',
    labelNames: ['provider'],
  });


  public lastIndexedBlockNumber = this.getOrCreateMetric('Gauge', {
    prefix: true,
    name: 'last_indexed_block_number',
    help: 'The last indexed block number',
    labelNames: [],
  });

  public currentStarknetBlock = this.getOrCreateMetric('Gauge', {
    prefix: true,
    name: 'current_starknet_block',
    help: 'The current starknet block',
    labelNames: [],
  });

  public lastAcceptedBlockOnL1 = this.getOrCreateMetric('Gauge', {
    prefix: true,
    name: 'last_accepted_block_on_l1',
    help: 'The last accepted block on l1',
    labelNames: [],
  });
}
