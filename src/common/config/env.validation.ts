import { plainToClass, Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, validateSync, Min, IsString, IsBoolean } from 'class-validator';
import { Environment, LogLevel, LogFormat } from './config.interface';

export class EnvironmentVariables {
  @IsOptional()
  @IsEnum(Environment)
  @Transform(({ value }) => (value == Environment.development ? Environment.development : Environment.production))
  NODE_ENV: Environment = Environment.development;

  @IsOptional()
  @IsEnum(LogLevel)
  @Transform(({ value }) => value || LogLevel.info)
  LOG_LEVEL: LogLevel = LogLevel.info;

  @IsOptional()
  @IsEnum(LogFormat)
  @Transform(({ value }) => value || LogFormat.simple)
  LOG_FORMAT: LogFormat = LogFormat.simple;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  PORT = 3000;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  METRICS_PORT = 9090;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  GLOBAL_THROTTLE_TTL = 5;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  GLOBAL_THROTTLE_LIMIT = 100;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  START_BLOCK: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value == 'true')
  RESET_DATABASE = false;

  // @IsString()
  // L2_ALCHEMY_RPC_URL: string;

  // @IsString()
  // L2_INFURA_RPC_URL: string;

  // @IsOptional()
  // @IsString()
  // L2_NIMBORA_RPC_URL: string;

  @IsOptional()
  @IsString()
  MONGO_URL = 'mongodb://mongo:27017';

  @IsOptional()
  @IsString()
  APIBARA_STREAM_URL = 'goerli.starknet.a5a.ch';

  @IsString()
  APIBARA_TOKEN_API: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config);

  const validatorOptions = { skipMissingProperties: false };
  const errors = validateSync(validatedConfig, validatorOptions);

  if (errors.length > 0) {
    console.error(errors.toString());
    process.exit(1);
  }

  return validatedConfig;
}
