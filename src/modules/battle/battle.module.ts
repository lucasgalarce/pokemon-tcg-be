import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BattleService } from './service/battle.service';
import { BattleController } from './controller/battle.controller';
import { BattleRepository } from './repository/battle.repository';
import { PokemonCardModule } from '../pokemonCard/pokemonCard.module';
import { Battle } from './entity/battle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Battle]), PokemonCardModule],
  providers: [BattleService, BattleRepository],
  controllers: [BattleController],
})
export class BattleModule {}
