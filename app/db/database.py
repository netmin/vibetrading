import sqlite3
import os
from typing import List, Optional
import logging
import traceback

from app.utils import send_telegram_message
from app.utils.logging_config import get_logger

# Use shared logging configuration from the main application
logger = get_logger(__name__)

# Use absolute path to ensure database is created in the right location
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Try multiple potential database locations to ensure we can find a writable one
POTENTIAL_PATHS = [
    os.path.join(BASE_DIR, "data", "emails.db"),  # Original location
    os.path.join(BASE_DIR, "app", "emails.db"),   # App directory (should be writable)
    "emails.db",                                  # Current working directory
    os.path.expanduser("~/emails.db")             # User's home directory
]

# Set the default database path to the first location, but will try others if needed
DEFAULT_DB_PATH = POTENTIAL_PATHS[0]
DB_PATH = os.environ.get("DB_PATH", DEFAULT_DB_PATH)

# Log all potential paths for debugging
for path in POTENTIAL_PATHS:
    print(f"Potential database path: {os.path.abspath(path)}")

logger.info(f"Using database at: {DB_PATH}")

def init_db():
    """Initialize the SQLite database with the required tables"""
    logger.debug(f"Initializing database at: {DB_PATH}")
    print(f"Initializing database at: {DB_PATH}")
    
    try:
        # Ensure the database directory exists
        os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
        
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
        logger.debug("Database initialization complete")
    except Exception as e:
        logger.error(f"Error initializing database: {e}", exc_info=True)
        print(f"ERROR initializing database: {e}")

def add_email(email: str) -> bool:
    """
    Add a new email to the database

    Args:
        email: The email address to store

    Returns:
        bool: True if successfully added, False if email already exists
    """
    # Try each potential database path until we find one that works
    for potential_db_path in POTENTIAL_PATHS:
        try:
            print(f"Attempting to use database at: {potential_db_path}")
            result = _add_email_to_path(email, potential_db_path)
            if result:
                print(f"Successfully added email to database at: {potential_db_path}")
                return True
        except Exception as e:
            print(f"Failed to add email to {potential_db_path}: {e}")
            continue

    # If we get here, none of the paths worked
    print("CRITICAL ERROR: Could not write to any database location")
    return False

def _add_email_to_path(email: str, db_path: str) -> bool:
    """
    Helper function to add an email to a specific database path
    """
    try:
        # Make sure the email is stripped of whitespace
        email = email.strip()
        logger.debug(f"====== EMAIL SUBMISSION ATTEMPT ======")
        logger.debug(f"Attempting to add email: {email}")

        # Print to ensure logs appear even if logger is misconfigured
        print(f"DATABASE OPERATION: Attempting to add email: {email}")

        # Log the actual database file path being used
        logger.debug(f"Using database at absolute path: {os.path.abspath(db_path)}")
        print(f"DATABASE PATH: {os.path.abspath(db_path)}")

        # Check if DB file exists
        if os.path.exists(db_path):
            db_size = os.path.getsize(db_path)
            logger.debug(f"Database file exists, size: {db_size} bytes")
            print(f"Database file exists, size: {db_size} bytes")
        else:
            logger.warning(f"Database file does not exist at: {db_path}")
            print(f"WARNING: Database file does not exist at: {db_path}")

        # Ensure the database directory exists
        db_dir = os.path.dirname(db_path)
        if db_dir:  # Only create directory if there's a directory part (not just a filename)
            os.makedirs(db_dir, exist_ok=True)
            logger.debug(f"Ensured database directory exists: {db_dir}")

            # Check if directory is writable
            if os.access(db_dir, os.W_OK):
                logger.debug(f"Directory {db_dir} is writable")
            else:
                logger.error(f"Directory {db_dir} is NOT writable!")
                print(f"ERROR: Directory {db_dir} is NOT writable!")
                raise IOError(f"Directory {db_dir} is not writable")

        # Connect to the database with timeout and detailed logging
        conn = None
        inserted = False
        try:
            logger.debug(f"Connecting to database at {db_path}...")
            conn = sqlite3.connect(db_path, timeout=10.0)
            logger.debug("Database connection established")
            cursor = conn.cursor()

            # Test if the table exists
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='emails'")
            if not cursor.fetchone():
                logger.debug("Table 'emails' does not exist, creating it...")
                print(f"Creating emails table in {db_path}")

                # Create the table
                cursor.execute('''
                CREATE TABLE IF NOT EXISTS emails (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                ''')
                conn.commit()
                logger.debug("Table creation completed")

            # Log database state
            cursor.execute("SELECT COUNT(*) FROM emails")
            count = cursor.fetchone()[0]
            logger.debug(f"Current email count before insert: {count}")
            print(f"Current email count in {db_path}: {count}")

            # Check if email already exists
            cursor.execute("SELECT 1 FROM emails WHERE email = ?", (email,))
            if cursor.fetchone():
                logger.debug(f"Email {email} already exists in database")
                print(f"Email {email} already exists in database")
                conn.close()
                return True  # Return True even if it already exists

            # Insert the email
            logger.debug(f"Executing INSERT for email: {email}")
            cursor.execute("INSERT INTO emails (email) VALUES (?)", (email,))
            conn.commit()
            inserted = True
            logger.info(f"Email {email} saved to database at {db_path}")
            logger.debug("INSERT committed successfully")
            print(f"NEW EMAIL ADDED TO {db_path}: {email}")

            # Verify the insert
            cursor.execute("SELECT COUNT(*) FROM emails")
            new_count = cursor.fetchone()[0]
            logger.debug(f"Email count after insert: {new_count}")
            print(f"New email count: {new_count}")

            # Check that our specific email was actually inserted
            cursor.execute("SELECT * FROM emails WHERE email = ?", (email,))
            result = cursor.fetchone()
            if result:
                logger.debug(f"Verified email is in database: {result}")
                print(f"Verified email is now in database: {email}")
            else:
                logger.error(f"Email not found in database after insert!")
                print(f"ERROR: Email not found after insert!")
                raise Exception("Email not found after insert, likely database write issue")

            conn.close()
            logger.debug(f"Successfully added email: {email}")
            logger.debug(f"====== EMAIL SUBMISSION COMPLETE ======")
            if inserted:
                try:
                    send_telegram_message(f"New vibe subscriber: {email}")
                except Exception as e:
                    logger.error(f"Telegram notification failed: {e}")
            return True

        except sqlite3.Error as sql_error:
            logger.error(f"SQLite error with {db_path}: {sql_error}", exc_info=True)
            print(f"SQLite ERROR with {db_path}: {sql_error}")
            if conn:
                conn.close()
            raise sql_error
            
    except sqlite3.IntegrityError as e:
        logger.warning(f"IntegrityError adding email {email}: {e}")
        print(f"INTEGRITY ERROR: {e}")
        # Email already exists - return True since we consider this a "success"
        return True
    except Exception as e:
        logger.error(f"Error adding email {email}: {e}", exc_info=True)
        print(f"EXCEPTION: {e}")
        print(traceback.format_exc())
        return False

def email_exists(email: str) -> bool:
    """
    Check if an email already exists in the database

    Args:
        email: The email to check

    Returns:
        bool: True if email exists, False otherwise
    """
    # Check all potential database paths
    for db_path in POTENTIAL_PATHS:
        try:
            if os.path.exists(db_path):
                conn = sqlite3.connect(db_path)
                cursor = conn.cursor()

                # Check if the table exists first
                cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='emails'")
                if not cursor.fetchone():
                    conn.close()
                    continue  # Table doesn't exist, try next database

                cursor.execute("SELECT 1 FROM emails WHERE email = ?", (email,))
                result = cursor.fetchone() is not None

                conn.close()
                if result:
                    return True
            else:
                logger.debug(f"Database file {db_path} does not exist, skipping email existence check")
        except Exception as e:
            logger.error(f"Error checking if email exists in {db_path}: {e}", exc_info=True)
            print(f"Error checking if email exists in {db_path}: {e}")

    # If we get here, email was not found in any database
    return False

def get_all_emails() -> List[dict]:
    """
    Retrieve all stored email addresses from all possible database locations

    Returns:
        List[dict]: A list of dictionaries with email information
    """
    all_emails = []

    # Try to get emails from all database paths
    for db_path in POTENTIAL_PATHS:
        try:
            if os.path.exists(db_path):
                conn = sqlite3.connect(db_path)
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()

                # Check if the table exists first
                cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='emails'")
                if not cursor.fetchone():
                    conn.close()
                    continue  # Table doesn't exist, try next database

                cursor.execute("SELECT id, email, created_at, ? as source FROM emails ORDER BY created_at DESC",
                              (os.path.basename(db_path),))

                # Convert rows to dictionaries
                db_emails = [dict(row) for row in cursor.fetchall()]
                all_emails.extend(db_emails)

                conn.close()
                print(f"Found {len(db_emails)} emails in database: {db_path}")
        except Exception as e:
            logger.error(f"Error retrieving emails from {db_path}: {e}", exc_info=True)
            print(f"Error retrieving emails from {db_path}: {e}")

    return all_emails