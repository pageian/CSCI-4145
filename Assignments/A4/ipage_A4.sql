CREATE TABLE A4 (
  job_name varchar(255) NOT NULL,
  part_id int NOT NULL,
  quantity int DEFAULT NULL,
  PRIMARY KEY (job_name,part_id)
);

INSERT INTO [dbo].[A4] VALUES ('Job1023',1023,55),('Job2023',2023,100),('Job3023',3023,150),('Job4023',4023,300);

