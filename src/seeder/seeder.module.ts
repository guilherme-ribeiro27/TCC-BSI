import { Logger, Module } from "@nestjs/common";
import { ProductService } from "src/product/product.service";
import { Seeder } from "./seeder";
import { ProductModule } from "src/product/product.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/product/entities/product.entity";

@Module({
    imports:[ProductModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'tcc',
          password: 'tcc',
          database: 'tcc',
          entities:[Product]
        }),],
    providers:[Seeder]
})
export class SeederModule{}