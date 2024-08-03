import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  token: string;
}
@Injectable()
export class AppService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'first@user.com',
      username: 'FirstUser',
      password: 'first',
      token: 'first-user-token',
    },
    {
      id: 2,
      email: 'second@user.com',
      username: 'SecondUser',
      password: 'second',
      token: 'second-user-token',
    },
    {
      id: 3,
      email: 'third@user.com',
      username: 'ThirdUser',
      password: 'third',
      token: 'third-user-token',
    },
  ];
  getProfile(token): User {
    const user = this.users.find((user) => user.token === token);
    return user;
  }

  login(email, password): string {
    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!user) {
      throw new HttpException(
        'User with this credentials are not registered',
        HttpStatus.FORBIDDEN,
      );
    }
    return user.token;
  }
}
