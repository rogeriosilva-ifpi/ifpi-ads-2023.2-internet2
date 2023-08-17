import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/hello')
  @Render('hello')
  hello() {
    const message = 'Hello NestJS + Handlebars';
    return { message };
  }

  @Get('/hello2')
  @Render('hello2')
  hello2() {
    const message = 'Hello2 NestJS + Handlebars';
    return { message };
  }
}
