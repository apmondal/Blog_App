import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { Article } from "./Article";

@Entity()

export class User {
    @PrimaryColumn()
    email: string

    @Column({type: "text"})
    name: string

    @Column({unique: true, nullable: false})
    username: string

    @Column({default: "abc"})
    password?: string

    @Column({type: "text", nullable: true})
    bio?: string

    @Column({nullable: true})
    image?: string

    @OneToMany(() => Article, (article: Article) => article.author)
    articles: Article[]

    @ManyToMany(() => Article, (article: Article) => article.favouriteUsers)
    favouriteArticles: Article[]

    @ManyToMany(() => User)
    @JoinTable()
    follower: User[]

    @ManyToMany(() => User)
    @JoinTable()
    following: User[]

    token?: string
}
