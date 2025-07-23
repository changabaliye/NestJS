import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class PhotoMetadata {
    @PrimaryGeneratedColumn()
    id: number

    @Column('int')
    height: number

    @Column('int')
    width: number

    @Column()
    orientation: string

    @Column()
    compressed: boolean

    @Column()
    comment: string
    //  should use the @JoinColumn decorator only on one side of a relation.
    @OneToOne(() => Photo, (photo) => photo.metadata,{
        cascade: true // This will allow saving the metadata when saving the photo
    })
    @JoinColumn() // Whichever side you put this decorator on will be the owning side of the relationship. The owning side of a relationship contains a column with a foreign key in the database.

    // to avoid circular dependenc issues we can use 'relation' wrapper
    photo: Relation<Photo> 
}