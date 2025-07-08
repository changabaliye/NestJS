import { Injectable } from '@nestjs/common';

//buisness logic

@Injectable()
export class HelloService {
  getHello(): string {
    return 'Hello nest js';
  }

  getHelloWithName(name: string): string {
    return `Hello ${name}`;
  }
}
