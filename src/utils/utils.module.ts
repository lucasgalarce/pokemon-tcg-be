import { Module } from '@nestjs/common';
import { Initializer } from './services/initializer.service';
import { UserModule } from '../modules/user/user.module';
import { PokemonCardModule } from 'src/modules/pokemonCard/pokemonCard.module';

@Module({
  imports: [UserModule, PokemonCardModule],
  providers: [Initializer],
  exports: [Initializer],
})
export class UtilsModule {}
