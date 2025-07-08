import { Controller, Get, Param, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

// incoming requestes and returning responses
// get, post, put, patch, delete

//localhost:3000/hello

@Controller('hello')
export class HelloController {
  //  dependency injection
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(): string {
    return this.helloService.getHello();
  }
  @Get('first-route')
  getHelloFirstRoute(): string {
    return this.helloService.getHello();
  }

  @Get('user/:name')
  getHelloWithName(@Param('name') name: string): string {
    return this.helloService.getHelloWithName(name);
  }

  // /hello/query?name=john
  @Get('query')
  getHelloWithQuery(@Query('name') name: string): string {
    return this.helloService.getHelloWithName(name || 'World');
  }
}
