# PHP Markdown Scratchpad

Simple scratchpad for keeping notes in Markdown format with live preview,
auto-save, and version history.

## ✨ Features

- Live markdown preview
- Server-side rendering via Parsedown (PHP)
- Auto-save on edit with version archiving (configurable threshold)
- Date slider to navigate past entries
- Table formatting tool (aligns markdown table columns)
- Dark mode — respects `prefers-color-scheme`

## 📋 Requirements

- PHP 8.x+
- SQLite3 (with PDO)
- A web server (Apache, Nginx, etc.)

## 🚀 Installation

1. Clone the repository into your web directory
2. Change to the `ajax/` directory
3. Create the SQLite database:
   ```
   sqlite3 /path/to/database/markdown-scratchpad.sqlite < db.sql
   ```
4. Copy `config.ini.sample` to `config.ini` and update `db_path`
5. Ensure the database file and its directory are writable by the web server:
   ```
   chgrp apache /path/to/database/
   chgrp apache /path/to/database/markdown-scratchpad.sqlite
   chmod g+w /path/to/database/
   chmod g+w /path/to/database/markdown-scratchpad.sqlite
   ```
6. Navigate to the directory in your browser

## 📝 Usage

- Type markdown in the textarea and click **Preview** to see rendered HTML
- Click **Input** to return to editing
- Changes are saved automatically; past versions are archived hourly by default
- Use the date slider to browse older entries
- Click the **M** in the header to auto-align table formatting in your markdown

## 📄 License

[MIT](LICENSE)
