import os
import json
from typing import Dict, Any
import base64

from robyn import Robyn, Request, Response, Headers, jsonify
from pydantic import ValidationError
from dotenv import load_dotenv

import logging
import sys
import traceback
from app.utils.logging_config import setup_robyn_logger, get_logger
from app.db import init_db, add_email, email_exists, get_all_emails
from app.agent import process_chat_message
from app.utils import validate_email

# Configure detailed logging for Robyn and the application
setup_robyn_logger(logging.DEBUG)
logger = get_logger(__name__)

# Load environment variables
load_dotenv()

# Admin credentials
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin")

# Initialize and create Robyn app
app = Robyn(__file__)

# Initialize database
init_db()

# Helper functions
def parse_json_body(request: Request) -> Dict[str, Any]:
    """Parse JSON body from request"""
    try:
        if isinstance(request.body, str):
            return json.loads(request.body)
        else:
            try:
                return json.loads(request.body.decode('utf-8'))
            except (AttributeError, UnicodeDecodeError):
                return {}
    except json.JSONDecodeError:
        return {}

def check_admin_auth(request: Request) -> bool:
    """Check if request has valid admin authentication"""
    # In Robyn, headers are accessed directly as a dict-like object
    auth_header = request.headers.get("Authorization") or ""
    logger.info(f"Checking admin auth with header: {auth_header[:15]}...")

    if not auth_header.startswith("Basic "):
        logger.warning("Authorization header missing or not Basic auth")
        return False

    try:
        encoded = auth_header[6:]  # Remove 'Basic ' prefix
        decoded = base64.b64decode(encoded).decode("utf-8")
        username, password = decoded.split(":")

        is_valid = username == ADMIN_USERNAME and password == ADMIN_PASSWORD
        if is_valid:
            logger.info(f"Admin auth successful for user: {username}")
        else:
            logger.warning(f"Admin auth failed for user: {username}")

        return is_valid
    except Exception as e:
        logger.error(f"Auth error: {e}")
        print(f"Auth error: {e}")
        return False

# Define CORS headers for reuse
def get_cors_headers():
    """Return standard CORS headers"""
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE, PATCH",
        "Access-Control-Allow-Headers": "Content-Type, Cache-Control, Pragma, Authorization, X-Requested-With",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400"
    }

# Explicit OPTIONS handlers for all routes
@app.options("/api/subscribe")
async def options_subscribe(request: Request) -> Response:
    """Handle OPTIONS requests for the subscribe endpoint"""
    logger.info("OPTIONS handler for /api/subscribe")
    return Response(
        status_code=200,
        description="",
        headers=Headers(get_cors_headers())
    )

@app.options("/api/chat")
async def options_chat(request: Request) -> Response:
    """Handle OPTIONS requests for the chat endpoint"""
    logger.info("OPTIONS handler for /api/chat")
    return Response(
        status_code=200,
        description="",
        headers=Headers(get_cors_headers())
    )

@app.options("/api/admin/subscribers")
async def options_admin_subscribers(request: Request) -> Response:
    """Handle OPTIONS requests for the admin subscribers endpoint"""
    logger.info("OPTIONS handler for /api/admin/subscribers")
    return Response(
        status_code=200,
        description="",
        headers=Headers(get_cors_headers())
    )

@app.options("/health")
async def options_health(request: Request) -> Response:
    """Handle OPTIONS requests for the health endpoint"""
    logger.info("OPTIONS handler for /health")
    return Response(
        status_code=200,
        description="",
        headers=Headers(get_cors_headers())
    )

# Handle OPTIONS for any undefined route
@app.options("*")
async def options_wildcard(request: Request) -> Response:
    """Handle OPTIONS requests for any other endpoint"""
    logger.info("OPTIONS wildcard handler")
    return Response(
        status_code=200,
        description="",
        headers=Headers(get_cors_headers())
    )

# Main route handlers
@app.post("/api/chat")
async def chat(request: Request) -> Response:
    """Process a chat message through the Vibe Trading agent"""
    try:
        body = parse_json_body(request)
        message = body.get("message", "")
        
        if not message:
            return Response(
                status_code=400,
                description=json.dumps({"success": False, "message": "Message is required"}),
                headers=Headers({**{"Content-Type": "application/json"}, **get_cors_headers()})
            )
        
        response = process_chat_message(message)
        
        return Response(
            status_code=200,
            description=json.dumps(response),
            headers=Headers({**{"Content-Type": "application/json"}, **get_cors_headers()})
        )
    except Exception as e:
        return Response(
            status_code=500,
            description=json.dumps({"success": False, "message": f"Error processing message: {str(e)}"}),
            headers=Headers({**{"Content-Type": "application/json"}, **get_cors_headers()})
        )

@app.post("/api/subscribe")
async def subscribe(request: Request) -> Response:
    """Subscribe an email to the Vibe Trading launch list"""
    try:
        # Add detailed logging
        logger.info(f"Received subscription request")

        body = parse_json_body(request)
        email = body.get("email", "")
        logger.info(f"Parsed email from request body: '{email}'")
        print(f"Parsed email from request body: '{email}'")

        # Validate email
        is_valid, error_msg = validate_email(email)
        if not is_valid:
            logger.warning(f"Email validation failed: {error_msg}")
            return Response(
                status_code=400,
                description=json.dumps({"success": False, "message": error_msg}),
                headers=Headers({**{"Content-Type": "application/json"}, **get_cors_headers()})
            )

        # Always attempt to add the email, even if it exists
        logger.info(f"Attempting to add email to database: {email}")
        if add_email(email):
            logger.info(f"Successfully added or found email: {email}")
            return Response(
                status_code=200,
                description=json.dumps({
                    "success": True,
                    "message": "Thank you for subscribing! We'll notify you when Vibe Trading launches."
                }),
                headers=Headers({**{"Content-Type": "application/json"}, **get_cors_headers()})
            )
        else:
            logger.error(f"Failed to add email: {email}")
            return Response(
                status_code=500,
                description=json.dumps({
                    "success": False,
                    "message": "Failed to subscribe. Please try again later."
                }),
                headers=Headers({**{"Content-Type": "application/json"}, **get_cors_headers()})
            )
    except Exception as e:
        error_details = traceback.format_exc()
        logger.error(f"Error in subscribe endpoint: {e}")
        logger.error(error_details)
        return Response(
            status_code=500,
            description=json.dumps({
                "success": False,
                "message": f"Error subscribing: {str(e)}",
                "details": error_details
            }),
            headers=Headers({**{"Content-Type": "application/json"}, **get_cors_headers()})
        )

@app.get("/api/admin/subscribers")
async def get_subscribers(request: Request) -> Response:
    """Get all subscribed email addresses (admin only)"""
    # Log the incoming request for debugging
    logger.info(f"GET /api/admin/subscribers request received")
    logger.info(f"Headers: {request.headers}")

    # Add CORS headers for preflight requests
    cors_headers = get_cors_headers()

    if not check_admin_auth(request):
        logger.warning("Authentication failed for /api/admin/subscribers")
        return Response(
            status_code=401,
            description=json.dumps({"success": False, "message": "Unauthorized"}),
            headers=Headers({
                **{"Content-Type": "application/json", "WWW-Authenticate": "Basic realm=\"Admin Area\""},
                **cors_headers
            })
        )

    try:
        logger.info("Authentication succeeded, retrieving emails")
        emails = get_all_emails()
        logger.info(f"Retrieved {len(emails)} emails from database")

        # Convert any non-serializable objects to strings
        serializable_emails = []
        for email in emails:
            serializable_email = {}
            for key, value in email.items():
                if isinstance(value, (str, int, float, bool, type(None))):
                    serializable_email[key] = value
                else:
                    serializable_email[key] = str(value)
            serializable_emails.append(serializable_email)

        # Create the JSON response
        response_data = {
            "total": len(serializable_emails),
            "subscribers": serializable_emails
        }

        # Log what we're returning
        logger.info(f"Returning {len(serializable_emails)} subscribers")

        # Ensure proper Content-Type and CORS headers
        headers = {
            "Content-Type": "application/json",
            **cors_headers
        }

        return Response(
            status_code=200,
            description=json.dumps(response_data),
            headers=Headers(headers)
        )
    except Exception as e:
        error_details = traceback.format_exc()
        logger.error(f"Error in get_subscribers: {e}")
        logger.error(error_details)
        return Response(
            status_code=500,
            description=json.dumps({
                "success": False,
                "message": f"Error retrieving subscribers: {str(e)}",
                "details": error_details
            }),
            headers=Headers({**{"Content-Type": "application/json"}, **cors_headers})
        )

@app.get("/health")
async def health(request: Request) -> Response:
    """Health check endpoint"""
    return Response(
        status_code=200,
        description=json.dumps({"status": "ok"}),
        headers=Headers({**{"Content-Type": "application/json"}, **get_cors_headers()})
    )

# 404 handler
# Add a simple plain-text subscriber list endpoint as fallback
@app.get("/api/admin/subscribers.txt")
async def get_subscribers_plain(request: Request) -> Response:
    """Get all subscribed email addresses as plain text (admin only)"""
    if not check_admin_auth(request):
        return Response(
            status_code=401,
            description="Unauthorized",
            headers=Headers({
                **{"Content-Type": "text/plain", "WWW-Authenticate": "Basic realm=\"Admin Area\""},
                **get_cors_headers()
            })
        )

    try:
        emails = get_all_emails()
        # Extract just the email addresses and join with newlines
        email_list = "\n".join([email.get("email", "") for email in emails])
        return Response(
            status_code=200,
            description=email_list,
            headers=Headers({**{"Content-Type": "text/plain"}, **get_cors_headers()})
        )
    except Exception as e:
        error_message = f"Error retrieving subscribers: {str(e)}"
        logger.error(error_message)
        return Response(
            status_code=500,
            description=error_message,
            headers=Headers({**{"Content-Type": "text/plain"}, **get_cors_headers()})
        )

@app.get("*")
@app.post("*")
async def not_found(request: Request) -> Response:
    """Handle 404 for any undefined route"""
    logger.warning(f"404 Not Found: Path not supported")
    return Response(
        status_code=404,
        description=json.dumps({"success": False, "message": "Not Found"}),
        headers=Headers({**{"Content-Type": "application/json"}, **get_cors_headers()})
    )

# Add global CORS middleware to ensure all responses have CORS headers
@app.after_request
async def add_cors_headers(response: Response) -> Response:
    """Add CORS headers to all responses"""
    # Get a copy of the current headers
    headers = {**response.headers.to_dict()}

    # Add CORS headers if they don't exist
    cors_headers = get_cors_headers()
    for header, value in cors_headers.items():
        if header not in headers:
            headers[header] = value

    # Create a new response with the updated headers
    return Response(
        status_code=response.status_code,
        description=response.description,
        headers=Headers(headers)
    )

if __name__ == "__main__":
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "8000"))

    logger.info(f"Starting server on {host}:{port} with CORS enabled")
    # Start the Robyn server
    app.start(host=host, port=port)