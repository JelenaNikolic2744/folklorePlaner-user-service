import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { User } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * @description Returns a list of all users
   * @return Promise<User[]>
   * @memberof UsersController
   */
  @MessagePattern({ cmd: 'get-users' })
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  /**
   * @description Saves user
   * @return Promise<any>
   * @memberof UsersController
   */
  @MessagePattern({ cmd: 'save-user' })
  async saveUser(user: User): Promise<any> {
    return await this.usersService.saveUser(user);
  }

  /**
   * @description Checks login
   * @return Promise<any>
   * @memberof UsersController
   */
  @MessagePattern({ cmd: 'check-login' })
  async loginUser(userData: User): Promise<any> {
    return await this.usersService.loginUser(userData);
  }

  /**
   * @description Updates money
   * @return Promise<void>
   * @memberof UsersController
   */
  @EventPattern({ cmd: 'save-money' })
  async saveMoney(moneyWithId: any): Promise<void> {
    await this.usersService.saveMoney(moneyWithId);
  }

  /**
   * @description Updates rehearsal
   * @return Promise<string>
   * @memberof UsersController
   */
  @MessagePattern({ cmd: 'save-rehearsal' })
  async saveRehearsal(rehearsal: any): Promise<string> {
    return await this.usersService.saveRehearsal(rehearsal);
  }

  /**
   * @description Updates user
   * @return Promise<void>
   * @memberof UsersController
   */
  @MessagePattern({ cmd: 'update-user' })
  async updateUser(userData: any): Promise<void> {
    return await this.usersService.updateUser(userData);
  }
}
