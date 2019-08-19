DROP TABLE IF EXISTS MarkdownHistory;
CREATE TABLE MarkdownHistory (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    MarkdownStr TEXT,
    MarkdownTime INTEGER
);

CREATE UNIQUE INDEX datetime ON MarkdownHistory (MarkdownTime);
