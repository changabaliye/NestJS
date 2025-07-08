import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  // injection of configService provide by next js config
  ig
  constructor(private configService: ConfigService) { }


  getHello(): string {
    // const appName = this.configService.get<string>('APP_NAME', 'default value')
    const appName = this.configService.get<string>('appName')
    console.log(appName, 'appName')
    return `Hello ${appName}`;
  }
}
