import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()

export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "text", nullable: true})
    slug: string

    @Column({type: "text"})
    body: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    lastUpdateAt: Date

    @ManyToOne(() => User)
    author: User
}