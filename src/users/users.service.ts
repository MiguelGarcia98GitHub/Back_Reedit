import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(createUserDto.password, salt);
    const savedUser = await this.usersRepository.save(user);

    return savedUser;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, id: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new Error('Email or password incorrect');
    }
  }
}
