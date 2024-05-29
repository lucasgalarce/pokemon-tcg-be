import { Injectable, OnModuleInit } from '@nestjs/common';

import { UserService } from '../../modules/user/service/user.service';
import { UserDto } from '../../modules/user/dto/user.dto';
import { Role } from '../enum/role.enum';
import { pokemonCards } from 'src/common/initialPokemonCardsData';
import { PokemonCardService } from '../../modules/pokemonCard/service/pokemonCard.service';

@Injectable()
export class Initializer implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly pokemonCardService: PokemonCardService,
  ) {}

  async onModuleInit() {
    await this.initialConfig();
  }

  async initialConfig() {
    const users = await this.userService.findAll();

    if (users.length === 0) {
      const firstAdmin: UserDto = {
        username: 'admin',
        name: 'super admin',
        email: 'admin@test.com',
        password: 'Admin2121!',
        role: Role.ADMIN,
        enabled: true,
      };

      const createdAdmin = await this.userService.create(firstAdmin);

      const pokemonCardPromises = pokemonCards.map((card) => {
        return this.pokemonCardService.create({ ...card, user: createdAdmin });
      });

      await Promise.all(pokemonCardPromises);
    }
  }
}
