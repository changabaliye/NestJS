import "reflect-metadata"
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { Photo } from "./entity/Photo"
import { PhotoMetadata } from "./entity/PhotoMetadata"


const photo = new Photo();
const metadata = new PhotoMetadata();


// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))


// AppDataSource.initialize().then(async () => {
//         // here i can start working on my database
//         const photo = new Photo();

//         photo.name = "Me and Bears";
//         photo.description = "I am near polar Bears";
//         photo.filename = "photo-with-bears.jpg"
//         photo.views = 1
//         photo.isPublished = true

//         await AppDataSource.manager.save(photo)

//         console.log('Data inserted successfully')

//         const saveData = await AppDataSource.manager.find(Photo);
//         console.log(saveData)
//     })
//     .catch((error) => console.log(error))

//?--------------------
//  using repository to get everything
// AppDataSource.initialize().then(async () => {
//     // here i can start working on my database
//     const photo = new Photo();

//     photo.name = "Me and Bears";
//     photo.description = "I am near polar Bears";
//     photo.filename = "photo-with-bears.jpg"
//     photo.views = 1
//     photo.isPublished = true

//     const photoRepo = AppDataSource.getRepository(Photo);
//     await photoRepo.save(photo);
//     const [saveData,count] = await photoRepo.findAndCount();
//     console.log(saveData,count)
// })
//     .catch((error) => console.log(error))


//?--------------------------
        const metadata = new PhotoMetadata();

AppDataSource.initialize().then(async () => {
    photo.name = "WAda"
    photo.description = "I am near polar bears"
    photo.filename = "photo-with-bears.jpg"
    photo.views = 1
    photo.isPublished = true

    // const  metadata = new PhotoMetadata();
    metadata.height = 640
    metadata.width = 600
    metadata.compressed = true
    metadata.comment = 'cybershoot'
    metadata.orientation = 'portrait'
    metadata.photo = photo

    let result = 45;

    const savedPhoto = await AppDataSource.manager.save(photo);
    const savedMetaData = await AppDataSource.manager.save(metadata);

    console.log(savedPhoto)
    console.log(savedMetaData)

}).catch(error => console.log(error))


