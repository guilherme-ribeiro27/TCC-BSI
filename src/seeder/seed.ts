import { NestFactory } from "@nestjs/core";
import { SeederModule } from "./seeder.module";
// import { Logger } from "@nestjs/common";
import { Seeder } from "./seeder";

async function boostrap(){
    NestFactory.createApplicationContext(SeederModule)
    .then(appContext => {
        // const logger = appContext.get(Logger)
        const seeder = appContext.get(Seeder)

        seeder
        .seed()
        .then(() => {
            // logger.log("Seed complete")
            console.log("Seed complete")
        })
        .catch(error => {
            // logger.error(error)
            console.log(error)
            throw error
        })
        .finally(()=>{
            appContext.close()
        })
    })
    .catch(error => {
        throw error
    })
}

boostrap()