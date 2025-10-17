import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>
  ){}
  create(createLocationDto: CreateLocationDto) {
    const location= this.locationRepository.save(createLocationDto)
    return location
  }

  findAll() {
    return this.locationRepository.find()
  }

  findOne(id: number) {
   const location = this.locationRepository.findOneBy({
    locationId: id,
   })
   if(!location)throw new NotFoundException('Location not found')
   return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const locationToUpdate = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    })
    return this.locationRepository.save(updateLocationDto);
  }

  remove(id: number) {
    this.locationRepository.delete({
      locationId: id,
    })
    return {
      message: "Employee deleted"
    }
  }
}
