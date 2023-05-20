import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';
import { MongoIdPipe } from 'src/pipes/mongo-id.pipe';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateInvestmentDto } from '../dto/create-investment.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Create user' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post(':id/investments')
  addInvestment(@Body() createInvestmenDto: CreateInvestmentDto) {

    return this.usersService.addInvestment(createInvestmenDto);
  }

  @Get(':id/investments')
  getInvestments(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.getInvestments(id)
  }

  @Get(':id/investments/:investmentId')
  getOneInvestment(@Param('id', MongoIdPipe) id: string, @Param('investmentId', MongoIdPipe) investmentId: string ) {
    return this.usersService.getOneInvestment(id, investmentId)
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
