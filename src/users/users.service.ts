import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginErrors, RegisterErrors } from './errors/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const checkEmail = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (checkEmail) {
      throw new RegisterErrors().emailAlreadyExists();
    }

    const checkUsername = await this.usersRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });

    if (checkUsername) {
      throw new RegisterErrors().usernameAlreadyExists();
    }

    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const savedUser = await this.usersRepository.save(createUserDto);

    delete savedUser.password;
    return savedUser;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new LoginErrors().emailNotFound();
    }

    if (user && !(await bcrypt.compare(password, user.password))) {
      throw new LoginErrors().passwordNotCorrect();
    }

    const payload = { email: user.email, id: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
