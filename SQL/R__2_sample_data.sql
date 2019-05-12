SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM `magazyn`;
DELETE FROM `pojazd`;
DELETE FROM `transport`;
DELETE FROM `zamowienie`;
DELETE FROM `punktTrasy`;
DELETE FROM `uzytkownik`;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `magazyn` (`magId`, `magMiasto`, `magLokalizacja`, `geoDlugosc`, `geoSzerokosc`) VALUES
(1, 'WrocĹaw', 'Plac Grunwaldzki', 17.0601, 51.1114),
(2, 'KrakĂłw', 'Rondo Mogilskie', 19.9602, 50.0664),
(3, 'Warszawa', 'Plac Zbawiciela', 21.018, 52.2201),
(4, 'PoznaĹ', 'Plac Jana PawĹa II', 16.5547, 52.2424);

INSERT INTO `pojazd` (`pojId`, `pojLadownosc`) VALUES
(1, 1000),
(2, 2000),
(3, 3000);

INSERT INTO `transport` (`traId`, `traTermin`, `traAkceptacja`, `pojId`) VALUES
(1, '2019-04-18', 0, 1),
(2, '2019-03-26', 0, 3),
(4, '2019-03-27', 1, 2);

INSERT INTO `zamowienie` (`zamId`, `zamIloscTowaru`, `zamTermin`, `traId`, `magIdStart`, `magIdKoniec`) VALUES
(1, 350, '2019-03-28', 4, 1, 2),
(2, 1240, '2019-04-08', 4, 2, 3),
(3, 720, '2019-03-22', NULL, 1, 3);

INSERT INTO `punktTrasy` (`punId`, `punKolejnosc`, `traId`, `magId`) VALUES
(1, 1, 4, 1),
(2, 2, 4, 2),
(3, 3, 4, 3),
(4, 1, 1, 2),
(5, 2, 1, 3);

INSERT INTO `uzytkownik` (`uzyId`, `uzyLogin`, `uzyHaslo`, `uzyUprawnieniaLogistyka`, `uzyUprawnieniaAdmin`) VALUES
(1, 'bolo', '8c6b3b45682a803bcd5bda88267a46c4', 1, 0),
(2, 'lolo', '6130677a78be7100d3a7fd2b98e5daec', 1, 0),
(3, 'szef', 'accf945556014a4bfd57719062f0f02e', 0, 1);
