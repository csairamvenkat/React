import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  findAll() {
    return this.userModel.findAll();
  }

  create(data: any) {
    return this.userModel.create(data);
  }

  async update(id: number, data: any) {
    await this.userModel.update(
      data,
      { where: { id } }
    );

    return this.userModel.findByPk(id);
  }

  delete(id: number) {
    return this.userModel.destroy({
      where: { id }
    });
  }

  async toggle(id: number) {

  const user =
    await this.userModel.findByPk(id);

  if (!user) {
    return {
      message: 'User not found'
    };
  }

  await user.update({
    isActive: !user.getDataValue('isActive')
  });

  return user;
}
}