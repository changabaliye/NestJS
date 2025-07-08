import { Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {

    // injecting services from otehr module
    // helloModule must export hello service 
    // userModule must import HelloModule
    constructor(private readonly helloService: HelloService) { }

    getAllUsers() {
        return [
            {
                id: 1, name: 'Sangam'
            },
            {
                id: 2, name: 'Sangam2'
            },
            {
                id: 3, name: 'Sangam3'
            }
        ]
    }

    getUserById(id: number) {
        const user = this.getAllUsers().find(user => user.id === id);
        return user;
    }

    getWelcomeMessage(userid : number) {
        const user = this.getUserById(userid)

        if(!user) {
            return 'User not found';
        }

        return this.helloService.getHelloWithName(user.name);
    }
}
