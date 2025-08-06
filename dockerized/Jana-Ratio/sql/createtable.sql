CREATE TABLE data (
id BIGSERIAL NOT NULL PRIMARY KEY,
source VARCHAR(100) NOT NULL,
library VARCHAR,
ms_id VARCHAR,
title VARCHAR,
origPlace VARCHAR,
centuries INTEGER[],
height_mm INTEGER NOT NULL,
width_mm INTEGER NOT NULL,
genres TEXT[],
script VARCHAR);
