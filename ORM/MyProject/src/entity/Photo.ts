// Entity is your model decorated by an @Entity decorator. A database table will be created for such models. You work with entities everywhere in TypeORM. You can load/insert/update/remove and perform other operations with them.
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { PhotoMetadata } from './PhotoMetadata'

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100
    })
    name: string

    @Column()
    description: string

    @Column()
    filename: string

    @Column()
    views: number

    @Column()
    isPublished: boolean

    @OneToOne(() => PhotoMetadata,(PhotoMetadata) => PhotoMetadata.photo)
    metadata : Relation<PhotoMetadata>
}
