--liquibase formatted sql

--changeset liquibase:1
create table todo (
    id bigint GENERATED ALWAYS AS IDENTITY,
    title varchar(100) not null,
    description varchar(2000) null,
    due_date timestamp with time zone not null
);
--rollback drop table todo;