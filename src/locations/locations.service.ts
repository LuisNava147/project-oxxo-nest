import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ){}
  create(createLocationDto: CreateLocationDto) {
    const location= this.locationRepository.save(createLocationDto)
    return location
  }

  findAll() {
    return this.locationRepository.find()
  }

  async findOne(id: number) {
   const location = await this.locationRepository.findOneBy({
    locationId: id,
   })
   if(!location)throw new NotFoundException('Location not found')
   return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    //set manager to null
    this.managerRepository
    .createQueryBuilder()
    .update()
    .set({location:null})
    .where("location= :id",
    {id}).execute();
   
    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    })
    if(!location)throw new NotFoundException('Location not found')
    const saveLocation= await this.locationRepository.save(location);

    const updatedManager = await this.managerRepository.preload({
      managerId: updateLocationDto.manager,
      location: location,
    })
    if(!updatedManager) throw new NotFoundException('location updated not found')
    await this.managerRepository.save(updatedManager);
    return location;
  }

  remove(id: number) {
    return this.locationRepository.delete({
      locationId: id,
    })
  }
}
