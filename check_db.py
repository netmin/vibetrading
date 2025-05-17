"""Utility script for inspecting the subscriber database."""

import sqlite3
from app.db.database import DB_PATH


def main() -> None:
    """Print all stored email addresses."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("SELECT id, email, created_at FROM emails")
    rows = cursor.fetchall()

    print(f"Emails in database ({DB_PATH}):")
    for row in rows:
        print(row)

    conn.close()


if __name__ == "__main__":
    main()
