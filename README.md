# PHP Markdown Scratchpad

Simple scratchpad for keeping notes in Markdown format

## Installation instructions

1. Clone this repository to your web directory
2. Change to the `ajax` directory
3. Create the sqlite database:
    1. `sqlite3 /path/to/database/markdown-scratchpad.sqlite < db.sql`
4. Copy `config.ini.sample` to `config.ini`
5. Update `db_path` in `config.ini` to match the database you created in step 3.i
6. Make sure the database file and directory is writable by your web server
    1. `chgrp apache /path/to/database/`
	2. `chgrp apache /path/to/database/markdown-scratpad.sqlite`
	3. `chown g+w /path/to/database/`
	4. `chown g+w /path/to/database/markdown-scratpad.sqlite`
7. Navigate to the directory created in step #1 using the web browser of choice
