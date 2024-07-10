import { Entity,Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
@Entity("products")
export class Product {

    @PrimaryGeneratedColumn('uuid')
    
    id: number;

    @Column('nvarchar')
    name: string;

    @Column('number')
    price: number;

    @Column('number')
    categoryId: number;
}
