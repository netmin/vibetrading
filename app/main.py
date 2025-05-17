"""FastAPI application for Vibe Trading."""

from __future__ import annotations

import base64
import json
import logging
import os
import traceback
from typing import Any, Dict

from dotenv import load_dotenv
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, PlainTextResponse

from app.agent import process_chat_message
from app.db import add_email, get_all_emails, init_db
from app.utils import validate_email
from app.utils.logging_config import setup_fastapi_logger, get_logger


# Configure detailed logging for FastAPI and the application
setup_fastapi_logger(logging.DEBUG)
logger = get_logger(__name__)

# Load environment variables
load_dotenv()

# Admin credentials
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin")

# Initialize FastAPI app
app = FastAPI()

# Initialize database
init_db()

# Configure CORS for all routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def parse_json_body(request: Request) -> Dict[str, Any]:
    """Parse JSON body from request."""

    try:
        return await request.json()
    except Exception:
        return {}


def check_admin_auth(request: Request) -> bool:
    """Check if request has valid admin authentication."""

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
    except Exception as exc:  # pragma: no cover - best effort
        logger.error(f"Auth error: {exc}")
        return False


@app.options("/{full_path:path}")
async def options_handler(full_path: str) -> Response:  # pragma: no cover - simple
    """Handle OPTIONS requests for any endpoint."""

    return Response(status_code=200)


@app.post("/api/chat")
async def chat(request: Request) -> JSONResponse:
    """Process a chat message through the Vibe Trading agent."""

    body = await parse_json_body(request)
    message = body.get("message", "")

    if not message:
        return JSONResponse(
            status_code=400,
            content={"success": False, "message": "Message is required"},
        )

    response = process_chat_message(message)
    return JSONResponse(status_code=200, content=response)


@app.post("/api/subscribe")
async def subscribe(request: Request) -> JSONResponse:
    """Subscribe an email to the Vibe Trading launch list."""

    body = await parse_json_body(request)
    email = body.get("email", "")

    is_valid, error_msg = validate_email(email)
    if not is_valid:
        return JSONResponse(
            status_code=400,
            content={"success": False, "message": error_msg},
        )

    if add_email(email):
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "message": "Thank you for subscribing! We'll notify you when Vibe Trading launches.",
            },
        )

    logger.error("Failed to add email: %s", email)
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "Failed to subscribe. Please try again later."},
    )


@app.get("/api/admin/subscribers")
async def get_subscribers(request: Request) -> JSONResponse:
    """Get all subscribed email addresses (admin only)."""

    if not check_admin_auth(request):
        return JSONResponse(
            status_code=401,
            content={"success": False, "message": "Unauthorized"},
            headers={"WWW-Authenticate": 'Basic realm="Admin Area"'},
        )

    try:
        emails = get_all_emails()
        response_data = {"total": len(emails), "subscribers": emails}
        return JSONResponse(status_code=200, content=response_data)
    except Exception as exc:  # pragma: no cover - best effort
        error_details = traceback.format_exc()
        logger.error("Error in get_subscribers: %s", exc)
        logger.error(error_details)
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": f"Error retrieving subscribers: {exc}",
                "details": error_details,
            },
        )


@app.get("/api/admin/subscribers.txt")
async def get_subscribers_plain(request: Request) -> PlainTextResponse:
    """Get all subscribed email addresses as plain text (admin only)."""

    if not check_admin_auth(request):
        return PlainTextResponse(
            status_code=401,
            content="Unauthorized",
            headers={"WWW-Authenticate": 'Basic realm="Admin Area"'},
        )

    try:
        emails = get_all_emails()
        email_list = "\n".join([email.get("email", "") for email in emails])
        return PlainTextResponse(status_code=200, content=email_list)
    except Exception as exc:  # pragma: no cover - best effort
        logger.error("Error retrieving subscribers: %s", exc)
        return PlainTextResponse(
            status_code=500,
            content=f"Error retrieving subscribers: {exc}",
        )


@app.get("/health")
async def health() -> JSONResponse:
    """Health check endpoint."""

    return JSONResponse(status_code=200, content={"status": "ok"})


@app.api_route("/{full_path:path}", methods=["GET", "POST"])
async def not_found(full_path: str) -> JSONResponse:
    """Handle 404 for any undefined route."""

    logger.warning("404 Not Found: %s", full_path)
    return JSONResponse(status_code=404, content={"success": False, "message": "Not Found"})


if __name__ == "__main__":  # pragma: no cover - manual run
    import uvicorn

    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "8000"))

    logger.info(f"Starting server on {host}:{port} with FastAPI")
    uvicorn.run("app.main:app", host=host, port=port, log_level="info")

