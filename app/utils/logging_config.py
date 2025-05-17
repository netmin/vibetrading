import logging
import sys


def setup_fastapi_logger(level: int = logging.INFO) -> logging.Logger:
    """Configure and return a logger for the application and FastAPI."""
    logger = logging.getLogger()
    logger.setLevel(level)

    # Clear existing handlers to avoid duplicate logs when reloading
    logger.handlers.clear()

    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)

    # Ensure FastAPI/Uvicorn uses the same configuration
    uvicorn_logger = logging.getLogger("uvicorn")
    uvicorn_logger.setLevel(level)
    uvicorn_logger.propagate = True

    return logger


def get_logger(name: str) -> logging.Logger:
    """Return a module-level logger using the global configuration."""
    return logging.getLogger(name)
