import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/hello')
  @Render('hello')
  hello() {
    const message = 'Hello NestJS + Handlebars';
    return { message };
  }
}
