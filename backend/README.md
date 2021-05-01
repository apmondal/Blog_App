# Conduit (Blog website)

## Technologies used

1. NodeJS as platform
2. TypeScript as programming language
3. PostgreSQL as Database
4. TypeORM as ORM

## Database Setup

1. Enter `psql` as admin
2. Create Database, user, set Password and grant privileages

```psql
create database dbname;
create user username with encrypted password 'password';
grant all privileges on database dbname to username;
```
