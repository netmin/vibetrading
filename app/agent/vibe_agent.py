from typing import Dict, Any
import json
from agents import Agent, Tool
from openai import OpenAI
import os

from app.db import add_email, email_exists
from app.utils import validate_email

def create_vibe_trading_agent() -> Agent:
    """
    Create the Vibe Trading agent with the necessary tools and configuration
    
    Returns:
        Agent: Configured OpenAI Agent
    """
    # Define the subscribe email tool
    subscribe_tool = Tool(
        name="subscribe_email",
        description="Subscribe a user with their email to receive updates about Vibe Trading launch",
        function=subscribe_email,
        input_schema={
            "type": "object",
            "properties": {
                "email": {
                    "type": "string",
                    "description": "The user's email address for subscription"
                }
            },
            "required": ["email"]
        }
    )
    
    # Create the agent with tools
    agent = Agent(
        name="vibe_trading_agent",
        system_prompt="""
        You are the Vibe Trading assistant, designed to inform users about the exciting 
        Vibe Trading project which is currently in development.
        
        About the Vibe Trading project:
        - It's an innovative algorithmic trading platform
        - Currently under development and not yet launched
        - Will offer unique trading strategies based on market sentiment analysis
        - Expected to launch in the coming months
        
        Your primary goals:
        1. Welcome users and explain that Vibe Trading is still in development
        2. Highlight a few key features of the upcoming platform
        3. Encourage users to subscribe with their email to receive launch notifications
        4. Once they provide their email, confirm their subscription
        
        Important guidance:
        - Be enthusiastic but professional
        - Don't make specific promises about launch dates or returns
        - Focus on collecting emails for the launch notification
        - If users ask detailed questions about the platform, acknowledge their interest but explain
          that more details will be available closer to launch
        - Always encourage subscription to stay updated
        """,
        tools=[subscribe_tool]
    )
    
    return agent

def subscribe_email(email: str) -> Dict[str, Any]:
    """
    Process an email subscription for the Vibe Trading platform
    
    Args:
        email: The user's email address
    
    Returns:
        Dict[str, Any]: Result information with success status and message
    """
    # Validate email format
    is_valid, error_msg = validate_email(email)
    
    if not is_valid:
        return {
            "success": False,
            "message": f"Cannot subscribe: {error_msg}"
        }
    
    # Check if email already exists
    if email_exists(email):
        return {
            "success": True,
            "message": "You're already subscribed! We'll notify you when Vibe Trading launches."
        }
    
    # Add email to the database
    if add_email(email):
        return {
            "success": True,
            "message": "Thank you for subscribing! We'll notify you when Vibe Trading launches."
        }
    else:
        return {
            "success": False,
            "message": "Failed to subscribe. Please try again later."
        }
        
def process_chat_message(message: str) -> Dict[str, Any]:
    """
    Process a user message through the Vibe Trading agent
    
    Args:
        message: The user's message
    
    Returns:
        Dict[str, Any]: The agent's response
    """
    try:
        # Check if OpenAI API key is set
        if not os.environ.get("OPENAI_API_KEY"):
            return {
                "message": "Error: OPENAI_API_KEY is not set in environment variables.",
                "tools_used": []
            }
            
        # Create the agent
        agent = create_vibe_trading_agent()
        
        # Get a response from the agent
        result = agent.run(message)
        
        # Format the response for the API
        return {
            "message": result.content if hasattr(result, "content") else str(result),
            "tools_used": [tool.name for tool in result.tool_uses] if hasattr(result, "tool_uses") and result.tool_uses else []
        }
    except Exception as e:
        # Return error message as a valid response
        return {
            "message": f"I'm sorry, I encountered an error: {str(e)}",
            "tools_used": []
        }