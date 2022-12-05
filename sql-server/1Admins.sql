create table Admins (
    id int primary key,
    nome varchar(50),
    cognome varchar(50),
    username varchar(20),
    pwd varchar(200) 
);

insert into Admins values (1, 'Andrea', 'Trentini', 'andrea', 'cisco');