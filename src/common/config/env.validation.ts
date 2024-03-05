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
  INDEXER_PORT = 3000;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  METRICS_PORT = 9090;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  GLOBAL_THROTTLE_TTL = 5;

  @IsString()
  NETWORK: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  GLOBAL_THROTTLE_LIMIT = 100;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value == 'true')
  DATABASE_RESET = true;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value == 'true')
  DATABASE_RESET_METADATA = true;

  @IsString()
  L2_ALCHEMY_RPC_URL: string;

  @IsOptional()
  @IsString()
  DATABASE_URL = 'postgres://postgres:postgres@postgres:5432';

  @IsOptional()
  @IsString()
  DATABASE_NAME = 'nimbora';
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
