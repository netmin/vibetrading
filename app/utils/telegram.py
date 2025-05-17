import os
import logging
import requests

logger = logging.getLogger(__name__)

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")


def send_telegram_message(text: str) -> None:
    """Send a message to a Telegram chat using a bot."""
    if not BOT_TOKEN or not CHAT_ID:
        logger.warning("Telegram credentials not configured; skipping notification")
        return

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    data = {"chat_id": CHAT_ID, "text": text}

    try:
        response = requests.post(url, data=data, timeout=10)
        response.raise_for_status()
        logger.debug("Sent Telegram message successfully")
    except Exception as e:
        logger.error(f"Failed to send Telegram message: {e}")
