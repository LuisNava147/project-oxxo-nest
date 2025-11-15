import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { JwtService } from  '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { Manager } from 'src/managers/entities/manager.entity';
  

@Injectable()
export class AuthService{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @InjectRepository(Manager) private managerRepository: Repository<Manager>,
  private jwtService: JwtService,
  ){}

  async registerEmployee(id:string, createUserDto: CreateUserDto){
    const roles = createUserDto.userRoles
    if(createUserDto.userRoles.includes("Admin") || 
    createUserDto.userRoles.includes("Manager")) {
      throw new BadRequestException("Invalid")
    }

    createUserDto.userPassword=bcrypt.hashSync(createUserDto.userPassword, 5)
    const user = await this.userRepository.save(createUserDto)
    const employee = await this.employeeRepository.preload({
      employeeId: id,
    })
    if(!employee) throw new NotFoundException("User Employee not found")
    employee.user = user;
    return this.employeeRepository.save(employee)
  }

  async registerManager(id:string, createUserDto: CreateUserDto){
    const roles = createUserDto.userRoles
    if(createUserDto.userRoles.includes("Admin") || 
    createUserDto.userRoles.includes("Employee")) {
      throw new BadRequestException("Invalid")
    }

    createUserDto.userPassword=bcrypt.hashSync(createUserDto.userPassword, 5)
    const user = await this.userRepository.save(createUserDto)
    const manager = await this.managerRepository.preload({
      managerId: id,
    })
    if(!manager) throw new NotFoundException("User Manager not found")
    manager.user = user;
    return this.managerRepository.save(manager)
  }

  async loginUser( loginUserDto:LoginUserDto){  
    const user = await this.userRepository.findOne({
      where: {
        userEmail: loginUserDto.userEmail,
      },
    });
    
    if(!user)throw new UnauthorizedException("No estas autorizado")
   const match = await bcrypt.compare(loginUserDto.userPassword,user.userPassword);
   if(!match)throw new UnauthorizedException("No estas autorizado");
   const payload={
    userEmail: user.userEmail,
    userPassword: user.userPassword,
    userRoles: user.userRoles
   };
   const token = this.jwtService.sign(payload);
   return token;
  }
  async updateUser(id: string, updateUserDto:UpdateUserDto){
    if (updateUserDto.userPassword) {
      updateUserDto.userPassword = bcrypt.hashSync(updateUserDto.userPassword, 5);
    }
    const newUserData= await this.userRepository.preload({
   userId: id,
      ...updateUserDto
    })
    if(!newUserData) throw new NotFoundException("user no encontrado")
    this.userRepository.save(newUserData)
    return newUserData
  }
}

