CREATE TABLE billingconfig_db.`revenue_config_stream` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setid` int(11) DEFAULT NULL,
  `streamid` int(11) DEFAULT NULL,
  `revsharepct` int(11) DEFAULT NULL,
  `chargetemplateid` varchar(45) DEFAULT NULL,
  `taxcode` varchar(45) DEFAULT NULL,
  `creation_date` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `modified_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `id_UNIQUE` (`id`),
   KEY `setid_idx` (`setid`),
   KEY `streamid_idx` (`streamid`),
   CONSTRAINT `rev_cstream_setid_fk` FOREIGN KEY (`setid`) REFERENCES `revenue_config` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
   CONSTRAINT `rev_streamid_fk` FOREIGN KEY (`streamid`) REFERENCES `revenue_stream` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE billingconfig_db.`revenue_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `audience` varchar(120) DEFAULT NULL,
  `edition` varchar(120) DEFAULT NULL,
  `creation_date` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `modified_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product_stream` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `streamid` int(11) DEFAULT NULL,
  `productid` varchar(120) DEFAULT NULL,
  `product_name` varchar(120) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `creation_date` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `modified_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `streamid_idx` (`streamid`),
  --CONSTRAINT `prd_id_fk` FOREIGN KEY (`productid`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  --Productid fk is not required since it is getting the productid from api.
  CONSTRAINT `prd_streamid_fk` FOREIGN KEY (`streamid`) REFERENCES `revenue_stream` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  --Revalidate streamid foreign key.Streamid map to revenue_config_stream->stream_id or revenue_stream table id
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `productname` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
*/
CREATE TABLE `revenue_stream` (
     `id` int(11) NOT NULL AUTO_INCREMENT,
     `name` varchar(120) DEFAULT NULL,
     `description` varchar(500) DEFAULT NULL,
     `creation_date` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
     `modified_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
     PRIMARY KEY (`id`),
     UNIQUE KEY `id_UNIQUE` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Id in the tables int vs string
-- the delete scenario
