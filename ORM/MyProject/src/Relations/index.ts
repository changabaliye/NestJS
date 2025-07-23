import { Console } from "console";
import { AppDataSource } from "../data-source";
import { Photo } from "../entity/Photo";
import { PhotoMetadata } from "../entity/PhotoMetadata";


AppDataSource.initialize()
    .then(async() => {
        const photo = new Photo();
        const metadata = new PhotoMetadata();

        const photoRepo = AppDataSource.getRepository(Photo);
        // using find* methods
        
        // const data = await photoRepo.find({
        //     relations : {
        //         metadata : true
        //     }
        // }) 

        // Using QueryBuilder

        const data = await photoRepo.createQueryBuilder("k").innerJoinAndSelect("k.metadata","metadata").getMany();

        // console.log(data)

        photo.name = "Me and Bears";
        photo.description = "I am near polar Bears";    
        photo.filename = "photo-with-bears.jpg";
        photo.views = 1;
        photo.isPublished = true;
        metadata.height = 640;
        metadata.width = 600;           
        metadata.compressed = true;
        metadata.comment = 'cybershoot';
        metadata.orientation = 'portrait';
        metadata.photo = photo;

        AppDataSource.manager.save(metadata);
        // const data = await AppDataSource.manager.find(Photo);

        console.log(data)
        


        
        
    })
    .catch((error) => {
        console.log(error)
    })  