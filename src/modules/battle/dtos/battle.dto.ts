import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BattleDto {
  @IsNotEmpty()
  @IsUUID()
  attackerId: string;

  @IsNotEmpty()
  @IsUUID()
  defenderId: string;
}

export class BattleResponseDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
