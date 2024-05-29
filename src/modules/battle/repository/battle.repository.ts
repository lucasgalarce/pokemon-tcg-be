import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Battle } from '../entity/battle.entity';

@Injectable()
export class BattleRepository extends Repository<Battle> {
  constructor(@InjectRepository(Battle) private readonly _: Repository<Battle>) {
    super(_.target, _.manager, _.queryRunner);
  }
}
