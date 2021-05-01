import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";

@Entity()

export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "text"})
    tag: string

    @ManyToMany(() => Article)
    @JoinColumn()
    articles: Article[]
}
