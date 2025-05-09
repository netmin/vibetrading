import re
from typing import Tuple

def validate_email(email: str) -> Tuple[bool, str]:
    """
    Validate an email address format
    
    Args:
        email: The email address to validate
        
    Returns:
        Tuple[bool, str]: A tuple containing:
            - bool: True if valid, False otherwise
            - str: Error message if invalid, empty string if valid
    """
    if not email:
        return False, "Email cannot be empty"
    
    # Basic email regex pattern
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    
    if re.match(pattern, email):
        return True, ""
    else:
        return False, "Invalid email format"