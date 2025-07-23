import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Photo } from "./entity/Photo"
import { PhotoMetadata } from "./entity/PhotoMetadata"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    username: "sa",
    password: "Admin12345",
    database: "tempdb",
    synchronize: true,
    logging: false,
    entities: [User,Photo,PhotoMetadata],
    migrations: [],
    subscribers: [],
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
})
