import { Module } from '@nestjs/common';
import { PokemonCardController } from './controller/pokemonCard.controller';
import { PokemonCardService } from './service/pokemonCard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonCard } from './entity/pokemonCard.entity';
import { PokemonCardRepository } from './repository/pokemonCard.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonCard]), UserModule],
  providers: [PokemonCardService, PokemonCardRepository],
  controllers: [PokemonCardController],
  exports: [PokemonCardService],
})
export class PokemonCardModule {}
