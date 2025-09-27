import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { User } from 'src/auth/entities/user.entity';
import { UserData} from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth-decorator';


@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Auth("Admin")
  @Get()
  findAll(@UserData() user: User) {
    if(user.userRoles.includes("Employee"))throw new UnauthorizedException("No estas autorizado, solo Admins y manager")
    return this.providersService.findAll();
  }

  @Get('/name/:name')
  findByName(@Param('name') name: string){
    return this.providersService.findByOneName(name);

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if(!provider)throw new NotFoundException()
    return provider
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
