import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { BaseRepository } from '@/database/repositories/base.repository';
import { User } from '@/database/models/user.model';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User) model: ModelCtor<User>) {
    super(model);
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.findOne({ username });
  }
}
