import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * @description Get all users
   * @return Promise<User[]>
   * @memberof UsersService
   */
  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().select('-password');
    users.shift();
    return users;
  }

  /**
   * @description Save user to db
   * @return Promise<string>
   * @memberof UsersService
   */
  async saveUser(user: User): Promise<string> {
    let msg = 'not saved';
    const userCheck = await this.checkIfExists(user);

    if (!userCheck) {
      const hashedUser = await this.hashPass(user);
      const userToSave = new this.userModel(hashedUser);
      await userToSave.save();
      return (msg = 'saved');
    } else {
      return msg;
    }
  }

  /**
   * @description Hash password
   * @return Promise<any>
   * @memberof UsersService
   */
  private async hashPass(user: User): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return user;
  }

  /**
   * @description Checks if user exists in db
   * @param {User} userToCheck
   * @return Promise<boolean>
   * @memberof UsersService
   */
  private async checkIfExists(dateToCheck: any): Promise<boolean> {
    let dataCheck = false;
    const dataToFind = {
      username: dateToCheck.username,
    };

    const dataFound = await this.userModel.findOne(dataToFind);
    if (dataFound) {
      dataCheck = true;
    }

    return dataCheck;
  }

  /**
   * @description Get user by username
   * @return Promise<User>
   * @memberof UsersService
   */
  async loginUser(loginData: any): Promise<User> {
    const user = await this.userModel.findOne({ username: loginData.username });
    return user;
  }

  /**
   * @description Updates money
   * @return Promise<void>
   * @memberof UsersService
   */
  async saveMoney(moneyWithId: any): Promise<void> {
    const { username, ...money } = moneyWithId;
    await this.userModel.findOneAndUpdate(
      { username: username },
      { $push: { money: money } },
    );
  }

  /**
   * @description Updates rehearsal
   * @return Promise<string>
   * @memberof UsersService
   */
  async saveRehearsal(rehearsalWithUsersDate: any): Promise<string> {
    let msg = 'not saved';
    let i = 0;
    for (const user of rehearsalWithUsersDate) {
      const { username, ...rehearsal } = user;

      const dateCheck = await this.checkIfDateExists(rehearsal.date, username);

      if (!dateCheck) {
        await this.userModel
          .findOneAndUpdate(
            { username: username },
            { $push: { rehearsal: rehearsal } },
          )
          .then(() => i++);

        if (i === rehearsalWithUsersDate.length) {
          return (msg = 'saved');
        }
      } else {
        return msg;
      }
    }
  }

  /**
   * @description Checks if date exists
   * @return Promise<boolean>
   * @memberof UsersService
   */
  async checkIfDateExists(date: any, username: string): Promise<boolean> {
    let dataCheck = false;

    const data = await this.userModel.findOne({
      username: username,
      'rehearsal.date': date,
    });

    if (data) {
      dataCheck = true;
    }

    return dataCheck;
  }

  /**
   * @description Updates user
   * @return Promise<void>
   * @memberof UsersService
   */
  async updateUser(userData: any): Promise<void> {
    if (userData.lastname) {
      await this.userModel.updateOne(
        { username: userData.username },
        { $set: { lastname: userData.lastname } },
      );
    }
    if (userData.address) {
      await this.userModel.updateOne(
        { username: userData.username },
        { $set: { address: userData.address } },
      );
    }
    if (userData.cityOfLiving) {
      await this.userModel.updateOne(
        { username: userData.username },
        { $set: { cityOfLiving: userData.cityOfLiving } },
      );
    }
    if (userData.phone) {
      await this.userModel.updateOne(
        { username: userData.username },
        { $set: { phone: userData.phone } },
      );
    }
  }
}
