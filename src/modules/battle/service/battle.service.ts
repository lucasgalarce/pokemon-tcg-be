import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonCardService } from 'src/modules/pokemonCard/service/pokemonCard.service';
import { BattleDto } from '../dtos/battle.dto';
import { BattleRepository } from '../repository/battle.repository';
import { Battle } from '../entity/battle.entity';
import { UtilsService } from 'src/utils/services/utils.service';

@Injectable()
export class BattleService extends UtilsService<Battle> {
  constructor(
    @InjectRepository(BattleRepository)
    private readonly battleRepository: BattleRepository,
    private readonly pokemonCardService: PokemonCardService,
  ) {
    super();
  }

  protected getRepository() {
    return this.battleRepository;
  }

  async battle(battleDto: BattleDto): Promise<string> {
    const attacker = await this.pokemonCardService.findOneByFilter({
      where: [{ id: battleDto.attackerId }],
    });
    const defender = await this.pokemonCardService.findOneByFilter({
      where: [{ id: battleDto.defenderId }],
    });

    if (!attacker || !defender) {
      throw new NotFoundException('One of the PokemonCards not found');
    }

    const damageMultiplier = defender.weakness === attacker.type ? 2 : 1;
    const damageResistance = defender.resistance === attacker.type ? 20 : 0;
    const attackModified = attacker.originalAttackDmg * damageMultiplier - damageResistance;
    const succeed = attackModified >= defender.hp;

    const newBattleRecord = {
      card: attacker,
      attackTo: defender,
      originalAttack: attacker.originalAttackDmg,
      attackModified,
      succeed,
    };
    super.create(newBattleRecord);

    const message = succeed ? `${attacker.name} wins!` : `${defender.name} wins!`;

    return message;
  }
}
