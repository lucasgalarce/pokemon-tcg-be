import { IsNotEmpty, IsUUID } from 'class-validator';

export class BattleDto {
  @IsNotEmpty()
  @IsUUID()
  attackerId: string;

  @IsNotEmpty()
  @IsUUID()
  defenderId: string;
}
