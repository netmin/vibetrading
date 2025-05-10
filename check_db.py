import sqlite3
conn = sqlite3.connect("/Users/vi/projects/vibe/trading/vibetrading/app/emails.db")
cursor = conn.cursor()
cursor.execute("SELECT * FROM emails")
rows = cursor.fetchall()
print("Emails in database:")
for row in rows:
    print(row)
conn.close()
