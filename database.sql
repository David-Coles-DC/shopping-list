create table user
(
    user_id  int auto_increment
        primary key,
    name     varchar(255)    not null,
    email    varchar(255)    not null,
    password varchar(255)    not null,
    budget   float default 0 null,
    constraint user_email_uindex
        unique (email)
);

create table shopping_item
(
    shopping_item_id   int auto_increment
        primary key,
    user_id            int              not null,
    shopping_item_name varchar(255)     not null,
    price              decimal          null,
    completed          bit default b'0' null,
    deleted            bit default b'0' not null,
    sequence           int              not null,
    quantity           int default 1    null,
    constraint shopping_item_user_user_id_fk
        foreign key (user_id) references user (user_id)
);