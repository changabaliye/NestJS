import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({length : 50})
    title : string;
    
    @Column({type : 'text'})
    content : string;
    
    @Column()
    authorName : string;
    
    @UpdateDateColumn()
    createdDate : Date;

    @UpdateDateColumn()
    updatedDate : Date;
}
