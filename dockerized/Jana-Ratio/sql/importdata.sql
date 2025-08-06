COPY data(source, library, ms_id, origPlace, centuries, height_mm, width_mm, genres, script)
FROM '/var/lib/postgresql/ratio_data.csv'
DELIMITER ','
CSV HEADER;