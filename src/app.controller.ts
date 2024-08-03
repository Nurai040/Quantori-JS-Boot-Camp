import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() req) {
    try {
      const token = req.token;
      return this.appService.getProfile(token);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.log('Error with fetching the profile: ', error);
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('/login')
  login(@Body() body) {
    try {
      const { email, password } = body;
      return this.appService.login(email, password);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.log('Error with fetching the profile: ', error);
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
