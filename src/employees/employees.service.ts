import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from "uuid";
import { NotFoundError } from 'rxjs';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeRepository: Repository<Employee>
  ){} 

 async create(CreateEmployeeDto: CreateEmployeeDto){
  const employee = await this.employeRepository.save(CreateEmployeeDto)
   return employee;
  }

  findAll() {
    //retorne todos los empleados
    return this.employeRepository.find();
  }

  findOne(id: string) {
    const employee = this.employeRepository.findOneBy({
      employeeId:id
    })
    if(!employee) throw new NotFoundException();
    return employee;
  }

 async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeRepository.preload({
      employeeId:id,
      ...updateEmployeeDto
    })
    if(!employeeToUpdate)throw new NotFoundException()
    this.employeRepository.save(employeeToUpdate)
    return employeeToUpdate;
  }

  remove(id:string) {
    this.employeRepository.delete({
      employeeId:id
    })
    return{
      message: `Employee deleted`
    }
  }
  }

