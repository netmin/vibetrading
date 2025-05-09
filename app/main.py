import os
import json
from typing import Dict, Any
import base64

from robyn import Robyn, Request, Response, Headers, jsonify
from pydantic import ValidationError
from dotenv import load_dotenv

from app.db import init_db, add_email, email_exists, get_all_emails
from app.agent import process_chat_message
from app.utils import validate_email

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

    if not auth_header.startswith("Basic "):
        return False

    try:
        encoded = auth_header[6:]  # Remove 'Basic ' prefix
        decoded = base64.b64decode(encoded).decode("utf-8")
        username, password = decoded.split(":")

        return username == ADMIN_USERNAME and password == ADMIN_PASSWORD
    except Exception as e:
        print(f"Auth error: {e}")
        return False

# Routes
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
                headers=Headers({"Content-Type": "application/json"})
            )
        
        response = process_chat_message(message)
        
        return Response(
            status_code=200,
            description=json.dumps(response),
            headers=Headers({"Content-Type": "application/json"})
        )
    except Exception as e:
        return Response(
            status_code=500,
            description=json.dumps({"success": False, "message": f"Error processing message: {str(e)}"}),
            headers=Headers({"Content-Type": "application/json"})
        )

@app.post("/api/subscribe")
async def subscribe(request: Request) -> Response:
    """Subscribe an email to the Vibe Trading launch list"""
    try:
        body = parse_json_body(request)
        email = body.get("email", "")
        
        # Validate email
        is_valid, error_msg = validate_email(email)
        if not is_valid:
            return Response(
                status_code=400,
                description=json.dumps({"success": False, "message": error_msg}),
                headers=Headers({"Content-Type": "application/json"})
            )
        
        # Check if already subscribed
        if email_exists(email):
            return Response(
                status_code=200,
                description=json.dumps({
                    "success": True,
                    "message": "You're already subscribed! We'll notify you when Vibe Trading launches."
                }),
                headers=Headers({"Content-Type": "application/json"})
            )
        
        # Add email to database
        if add_email(email):
            return Response(
                status_code=200,
                description=json.dumps({
                    "success": True,
                    "message": "Thank you for subscribing! We'll notify you when Vibe Trading launches."
                }),
                headers=Headers({"Content-Type": "application/json"})
            )
        else:
            return Response(
                status_code=500,
                description=json.dumps({
                    "success": False,
                    "message": "Failed to subscribe. Please try again later."
                }),
                headers=Headers({"Content-Type": "application/json"})
            )
    except Exception as e:
        return Response(
            status_code=500,
            description=json.dumps({"success": False, "message": f"Error subscribing: {str(e)}"}),
            headers=Headers({"Content-Type": "application/json"})
        )

@app.get("/api/admin/subscribers")
async def get_subscribers(request: Request) -> Response:
    """Get all subscribed email addresses (admin only)"""
    if not check_admin_auth(request):
        return Response(
            status_code=401,
            description=json.dumps({"success": False, "message": "Unauthorized"}),
            headers=Headers({
                "Content-Type": "application/json",
                "WWW-Authenticate": "Basic realm=\"Admin Area\""
            })
        )

    try:
        emails = get_all_emails()

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

        return Response(
            status_code=200,
            description=json.dumps({
                "total": len(serializable_emails),
                "subscribers": serializable_emails
            }),
            headers=Headers({"Content-Type": "application/json"})
        )
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in get_subscribers: {e}")
        print(error_details)
        return Response(
            status_code=500,
            description=json.dumps({
                "success": False,
                "message": f"Error retrieving subscribers: {str(e)}",
                "details": error_details
            }),
            headers=Headers({"Content-Type": "application/json"})
        )

@app.get("/health")
async def health(request: Request) -> Response:
    """Health check endpoint"""
    return Response(
        status_code=200,
        description=json.dumps({"status": "ok"}),
        headers=Headers({"Content-Type": "application/json"})
    )

if __name__ == "__main__":
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "8000"))
    
    # Start the Robyn server
    app.start(host=host, port=port)