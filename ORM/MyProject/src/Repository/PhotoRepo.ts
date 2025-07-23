import { Photo } from "../entity/Photo";
import { AppDataSource } from "../data-source";

const photo = new Photo();

photo.name = "Me and some Bears";
photo.description = "I am near some polar Bears";
photo.filename = "photo-with-bigbears.jpg";
photo.views = 2;
photo.isPublished = false;

async function todo() {

    const photoRepo = AppDataSource.getRepository(Photo);
    await photoRepo.save(photo);
    const saveData = photoRepo.find();
    console.log(saveData)
}
