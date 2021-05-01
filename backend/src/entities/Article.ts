import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./Comment";
import { Tag } from "./Tag";
import { User } from "./User";


@Entity()

export class Article {
    @PrimaryColumn({length: 30})
    slug: string

    @Column({length: 60})
    title: string

    @Column({type: "text", nullable: true})
    description?: string

    @Column({type: "text"})
    body: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    lastUpdatedAt: Date

    @ManyToOne(() => User, (user: User) => user.articles, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    author?: User

    @ManyToMany(() => User, (user: User) => user.favouriteArticles)
    @JoinTable()
    favouriteUsers: User[]

    @ManyToMany(() => Article)
    @JoinTable()
    tags: string[]

    constructor(slug: string, title: string, description: string, body:string, author?: User) {
        this.slug = slug;
        this.title = title;
        this.description = description;
        this.body = body;
        this.author = author
    }
}
