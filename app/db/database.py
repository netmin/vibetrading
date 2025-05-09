import sqlite3
import os
from typing import List, Optional

DB_PATH = os.environ.get("DB_PATH", "emails.db")

def init_db():
    """Initialize the SQLite database with the required tables"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create emails table if it doesn't exist
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    
    conn.commit()
    conn.close()

def add_email(email: str) -> bool:
    """
    Add a new email to the database
    
    Args:
        email: The email address to store
        
    Returns:
        bool: True if successfully added, False if email already exists
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute("INSERT INTO emails (email) VALUES (?)", (email,))
        conn.commit()
        conn.close()
        return True
    except sqlite3.IntegrityError:
        # Email already exists
        return False
    except Exception as e:
        print(f"Error adding email: {e}")
        return False

def email_exists(email: str) -> bool:
    """
    Check if an email already exists in the database
    
    Args:
        email: The email to check
        
    Returns:
        bool: True if email exists, False otherwise
    """
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute("SELECT 1 FROM emails WHERE email = ?", (email,))
    result = cursor.fetchone() is not None
    
    conn.close()
    return result

def get_all_emails() -> List[dict]:
    """
    Retrieve all stored email addresses
    
    Returns:
        List[dict]: A list of dictionaries with email information
    """
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, email, created_at FROM emails ORDER BY created_at DESC")
    
    # Convert rows to dictionaries
    emails = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    return emails