import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService{
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}
  registerUser(createUserDto: CreateUserDto){
    createUserDto.userPassword=bcrypt.hashSync(createUserDto.userPassword, 5)
    return this.userRepository.save(createUserDto)
  }


  async loginUser( createUserDto:CreateUserDto){  
    const user = await this.userRepository.findOne({
      where: {
        userEmail: createUserDto.userEmail
      }
    })
    
    if(!user)throw new NotFoundException('User not founded')
   const match = await bcrypt.compare(createUserDto.userPassword,user.userPassword)
   if(!match)throw new UnauthorizedException("No estas autorizado");
   const token = jwt.sign(JSON.stringify(user), "SECRET KEY");
   return token
  }
}

