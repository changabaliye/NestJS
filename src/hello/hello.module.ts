import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

//

@Module({
  controllers: [HelloController],
  providers: [HelloService],
  // import other modules iff needed
  // imports: [],
  // Export services if neeeded i otehr modueles
  exports: [HelloService],
})
export class HelloModule {}
