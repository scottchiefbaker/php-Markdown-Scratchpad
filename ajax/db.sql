DROP TABLE IF EXISTS MarkdownHistory;
CREATE TABLE MarkdownHistory (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    MarkdownStr TEXT,
    MarkdownTime INTEGER
);

CREATE UNIQUE INDEX datetime ON MarkdownHistory (MarkdownTime);

INSERT INTO MarkdownHistory VALUES (1, replace('# Congratulations\n\nYou have successfully installed Markdown Scratchpad', '\n', char(10)), -1);
