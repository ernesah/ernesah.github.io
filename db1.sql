use `UfefPd1mk5`;

CREATE TABLE categories (
   categoryId int NOT NULL AUTO_INCREMENT,
   category varchar(15)  ,
   PRIMARY KEY (categoryId));
   
   insert into categories (categoryId, category)
   values
   (1, 'Jewelry'),
   (2, 'Watches'),
   (3, 'Glasses'),
   (4, 'Helmets');
 
CREATE TABLE subcategories (
   subcategoryId int(11) NOT NULL AUTO_INCREMENT,
   subcategory varchar(150),
   categoryId int(11),
   PRIMARY KEY (subcategoryId),
   FOREIGN KEY (categoryId) REFERENCES categories (categoryId) ON DELETE CASCADE ON UPDATE CASCADE);
   
   insert into subcategories (subcategoryId, subcategory, categoryId)
   values
   (1, 'Necklaces', 1),
   (2, 'Bracelets', 1),
   (3, 'Earrings', 1),
   (4, 'Rings', 1),
   (5, 'Watches', 2),
   (6, 'Sunglasses', 3),
   (7, 'Opticalglasses', 3),
   (8, 'Helmets', 4);
 
 CREATE TABLE orders (
   orderId int(11) NOT NULL AUTO_INCREMENT,
   productId int(11) ,
   ordersCount int(100) ,
   PRIMARY KEY (orderId));
 
 CREATE TABLE admins (
   adminId int NOT NULL AUTO_INCREMENT,
   email varchar(50),
   PRIMARY KEY (adminId));
 
 CREATE TABLE products (
   productId int(11) NOT NULL AUTO_INCREMENT,
   name varchar(100),
   categoryId int,
   subcategoryId int,
   price double,
   weight double,
   description varchar(5000),
   photoblob blob ,
   photourl varchar(250),
   photoname varchar(100),
   sector varchar(20),
   color varchar(50),
   materials varchar(150),
   maxquantity int,
   PRIMARY KEY (productId),
	FOREIGN KEY (categoryId) REFERENCES categories (categoryId) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (subcategoryId) REFERENCES subcategories (subcategoryId) ON DELETE CASCADE ON UPDATE CASCADE);
 
insert into products (productId, name, categoryId, subcategoryId, price, weight, description, photoblob, photourl, photoname, sector, color, materials, maxquantity)
values
('114', 'Illyrian Helmet Ring', '1', '4', '250', '20', 'This ring is based on the Illyrian helmet. The Illyrians were know as fierce warriors on land and excellent sailors at seas. The symbol of the ram (Dhija) demonstrates their strength and cultural beliefs.', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-6.PNG','C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-6.PNG', 'product-6.png', 'New Arrivals', NULL, 'Silver Premium|14k Rose Gold|14k Gold|14k White Gold', '21'),
('108', 'Akrivia Watch', '2', '5', '150', '20', 'Men Watch', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-2.PNG','C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-2.PNG', 'product-2.png', 'New Arrivals', 'Black|Blue|Brown', '', '22'),
('118', 'Tourbillon régulateur', '2', '5', '120', '20', 'Men Watch', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-19.PNG','C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-19.PNG', 'product-19.png', 'Summer Sale', 'Black|Blue|Brown', '', '20'),
('112', 'Eyewear', '3', '6', '150', '20', 'Women SunGlasses', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-3.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-3.PNG', 'product-3.png', 'New Arrivals', 'Black|Red|Purple', '', '24'),
('116', 'Gheg & Tosk Brand Bracelet', '1', '2', '120', '20', 'We spend plenty of time and made countless drawings to create our Gheg & Tosk Logo & Trademark. We hope you love it as much as we do. This bracelet is made of black beads with a few extra decorative elements and a 14K Gold Plated Gheg & Tosk Brand Eagle.', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-7.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-7.PNG', 'product-7.png', NULL, 'Black|White', 'Gold|Silver Premium', '16'),
('102', 'Tourbillon régulateur Watch', '2', '5', '120', '20', 'Men Watch', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-10.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-10.PNG', 'product-10.png', 'Must also like', 'Deep Blue|Black|Brown', '', '13'),
('106', 'ANYLA LR21', '3', '7', '140', '20', 'ANYLA is a modern interpretation of a classic cats eye. Inspired by styles worn by Audrey Hepburn the frame sums up the gracefulness of the cats eye but still carries the bold look of Laura Imami styling.', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-13.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-13.PNG', 'product-13.png', NULL, 'Deep Red', '', '15'),
('113', 'Dardanian Goddess Necklace', '1', '1', '85', NULL, 'The Dardanian Praying Goddess is one of those elements that predates history, yet the strong body language of the Goddess resembles the strong character on highland Albania and Kosova women in their determination, beauty and pride.', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-5.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-5.PNG', 'product-5.png', 'New Arrivals', 'Deep Red|Green|Turqoise', 'Silver Premium', '22'),
('105', 'Albanian Pride', '1', '8', '120', '20', 'Our Skanderbeg helmet is an artistic replica representation of the original Skanderbegs helmet. Can be wearable by adults at any celebrations, festive events, family gatherings, cheering for our national teams, or merely an art adornment.', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-12.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-12.PNG', 'product-12.png','Must also like', 'Gold', '14k Rose Gold|14k Gold|14k White Gold', '15'),
('109', 'Skanderbeg Helmet', '4', '8', '270', NULL, 'Available for everyone, our Skanderbeg helmet is an artistic replica representation of the original Skanderbegs helmet preserved in Vienna, Kunsthistorisches Museum.This helmet has been reconstructed and adapted to be wearable by adults during any celebra', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-1.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-1.PNG','product-1.png', 'Limited Amount', 'Gold', 'Gold', '10'),
('111', 'Tourbillon Hour Minutes', '2', '5', '360', NULL, 'Men Watch', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-16.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-16.PNG', 'product-16.png', NULL, 'Gold|Blue|Black', '', '23'),
('117', 'Royal Double-Headed Eagle Ring', '1', '4', '275', '20', 'The double-headed eagle is a very well-known symbol among European nations but Albanians have a unique and special connection to it. In the Albanian native language, they call themselves the sons of eagle, “Shqipetar.”', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-20.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-20.PNG', 'product-20.png',  '', 'Gold|White', NULL, '17'),
('101', 'Sunglasses JASMINA', '3', '6', '120', '20', 'JASMINA is characterized by its generous structured square frame with rounded edges, giving an urban feel with a contemporary edge.', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-9.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-9.PNG', 'product-9.png', 'Must also like', 'Red|Blue', '', '15'),
('103', 'Tri-Color Bracelet', '1', '2', '190', NULL, 'Rotating logo clip. Silver with 3 types of real gold plating', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-4.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-4.PNG', 'product-4.png', 'New Arrivals', 'Rose Gold', NULL, '19'),
('115', 'Logo necklace with stones', '1', '1', '225', '20', 'Logo choker with 5 pave element 40 stones to layer your existing jewels or wear it as a standalone.', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-17.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-17.PNG', 'product-17.png', 'Summer Sale', 'Silver|Rose Gold', 'Silver Premium|Gold', '17'),
('104', 'Logo Earrings', '1', '3', '3100', NULL, '260 diamonds are delicately set into fine 18K white gold using expert precision. The design exhibits Sara’s core value of premium craftsmanship with this signature piece in her collection. Wear to lunch for a dramatic and glamorous entrance or simply stan', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-11.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-11.PNG', 'product-11.png', NULL, 'White', '14k White Gold', '19'),
('110', 'Straight logo Earrings', '1', '3', '210', NULL, '260 cubic zirconia stones total are set into silver and plated with white gold for more shine. The design exhibits Saras core value of premium craftsmanship with this signature piece in her collection.', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-15.PNG','C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-15.PNG', 'product-15.png', NULL, 'White|Rose Gold', 'Gold|Silver Premium', '24'),
('107', 'Bolo shield', '1', '1', '5000', NULL, '18k yellow gold snake chain with a citrine stone wrapped around with 18k yellow gold shield. The shield is adjustable so you can wear it multiple ways.', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-14.PNG', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-14.PNG','product-14.png', 'Must also like', 'Yellow Gold', '14k White Gold', '17'),
('100', 'Illyrian Queen Pendant', '1', '1', '125', '20', 'The Illyrian Queen -Teuta, is among the most celebrated women in Albanian culture -heritage due to the fact that she was a brave woman with a strong personality - able to keep the Illyrian Kingdom under her control after the death of King Agron.', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-8.PNG','C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-8.PNG', 'product-8.png', 'Summer Sale', NULL, 'Silver Premium|14k Gold Plated|18k Gold Plated', '20');

create table products_photos (
ppId int auto_increment,
productId int,
photourl varchar (200),
photoname varchar (50),
primary key (ppId),
foreign key (productId) references products (productId));
insert into products_photos (ppId, productId, photourl, photoname)
values
('1001', '100', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-8.PNG', 'product-8'),
('1002', '100', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-8.1.PNG', 'product-8'),
('1003', '100', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-8.2.PNG', 'product-8'),
('1004', '101', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-9.PNG', 'product-9'),
('1005', '101', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-9.1.PNG', 'product-9'),
('1006', '101', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-9.2.PNG', 'product-9'),
('1007', '102', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-10.PNG', 'product-10'),
('1008', '102', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-10.1.PNG', 'product-10'),
('1009', '102', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-10.2.PNG', 'product-10'),
('1010', '103', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-4.PNG', 'product-4'),
('1011', '103', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-4.1.PNG', 'product-4'),
('1012', '103', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-4.2.PNG', 'product-4'),
('1013', '104', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-11.PNG', 'product-11'),
('1014', '104', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-11.PNG', 'product-11'),
('1015', '104', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-11.PNG', 'product-11'),
('1016', '105', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-12.PNG', 'product-12'),
('1017', '105', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-12.1.PNG', 'product-12'),
('1018', '105', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-12.2.PNG', 'product-12'),
('1019', '106', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-13.PNG', 'product-13'),
('1020', '106', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-13.1.PNG', 'product-13'),
('1021', '106', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-13.2.PNG', 'product-13'),
('1022', '107', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-14.PNG', 'product-14'),
('1023', '107', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-14.1.PNG', 'product-14'),
('1024', '107', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-14.2.PNG', 'product-14'),
('1025', '108', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-2.PNG', 'product-2'),
('1026', '108', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-2.1.PNG', 'product-2'),
('1027', '108', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-2.2.PNG', 'product-2'),
('1028', '109', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-1.PNG', 'product-1'),
('1029', '109', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-1.1.PNG', 'product-1'),
('1030', '109', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-1.2.PNG', 'product-1'),
('1031', '110', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-15.PNG', 'product-15'),
('1032', '110', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-15.1.PNG', 'product-15'),
('1033', '110', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-15.2.PNG', 'product-15'),
('1034', '111', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-16.PNG', 'product-16'),
('1035', '111', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-16.1.PNG', 'product-16'),
('1036', '111', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-16.2.PNG', 'product-16'),
('1037', '112', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-3.PNG', 'product-3'),
('1038', '112', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-3.1.PNG', 'product-3'),
('1039', '112', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-3.2.PNG', 'product-3'),
('1040', '113', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-5.PNG', 'product-5'),
('1041', '113', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-5.1.PNG', 'product-5'),
('1042', '113', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-5.2.PNG', 'product-5'),
('1043', '114', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-6.PNG', 'product-6'),
('1044', '114', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-6.1.PNG', 'product-6'),
('1045', '114', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-6.2.PNG', 'product-6'),
('1046', '115', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-17.PNG', 'product-17'),
('1047', '115', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-17.1.PNG', 'product-17'),
('1048', '115', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-17.2.PNG', 'product-17'),
('1049', '116', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-7.PNG', 'product-7'),
('1050', '116', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-7.1.PNG', 'product-7'),
('1051', '116', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-7.2.PNG', 'product-7.2'),
('1052', '117', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-20.PNG', 'product-20'),
('1053', '117', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-20.1.PNG', 'product-20'),
('1054', '117', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-20.2.PNG', 'product-20'),
('1055', '118', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-19.PNG', 'product-19'),
('1056', '118', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-19.1.PNG', 'product-19'),
('1057', '118', 'C:\\Users\\Afrim\\Desktop\\albcr\\public\\images\\product-19.2.PNG', 'product-19');