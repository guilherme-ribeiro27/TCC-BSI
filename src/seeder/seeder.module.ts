import { Logger, Module } from "@nestjs/common";
import { ProductService } from "src/product/product.service";
import { Seeder } from "./seeder.";

@Module({
    imports:[ProductService],
    providers:[Seeder]
})
export class SeederModule{}