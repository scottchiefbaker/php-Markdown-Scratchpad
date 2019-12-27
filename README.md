# PHP Markdown Scratchpad

Simple scratchpad for keeping notes in Markdown format

## Installation instructions

1. Clone this repository to your web directory
2. Change to the `ajax` directory
3. Create the sqlite database:
  1. `sqlite3 /path/to/database/markdown-scratchpad.sqlite < db.sql`
4. Copy `config.ini.sample` to `config.ini`
5. Update `db_path` in `config.ini` to match the database you created in step 3.1
6. Make sure the directory used for the database is writable by your web server
7. Navigate to the directory in your web browser of choice
