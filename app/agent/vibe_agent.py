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

        Problem We Are Solving ("Intuitive Trading"):
        We focus on the inefficiency and risks of traditional intuitive trading, which is often driven by emotion
        and cognitive bias. Behavioral finance shows that people don't always make rational decisions in financial
        markets because of emotions and mental distortions. Key manifestations include:
        • Emotion-driven irrational choices: Fear, greed, euphoria, and panic leading to suboptimal decisions
        • Herd behavior: Following the majority rather than conducting independent analysis
        • Emotional and cognitive biases: Disposition effect, anchoring bias, framing effect, self-attribution,
          overconfidence, loss aversion, gambler's fallacy, etc.
        • Need for emotional resilience: Making decisions under stress requires controlling innate emotional
          reactions—difficult without a clear structure or plan

        Our Solution ("Vibe Trading"):
        We propose building a platform that uses "vibe coding" to structure and algorithmize subjective market
        perceptions—such as "atmosphere," "mood," "energy," or "intuition" ("vibe").
        • We apply the "vibe" concept to market sentiment through analytical tools like sentiment analysis of
          text data from open sources (social media, news, forums)
        • This differs from traditional algorithmic trading by attempting to formalize intuitive elements
        • The goal is to augment and potentially improve trading decisions by combining human-style
          sentiment signals with data and algorithms

        Our Unique Value Proposition:
        1. Transparent Public Experiment ("Build in Public")
        2. Experimental Unpredictability - Working with sentiment ("vibe") which is inherently less structured
        3. Trend Convergence - Intersection of AI, Trading, Indie Development, and Build in Public

        Your primary goals:
        1. Welcome users and explain the Vibe Trading concept based on the information above
        2. Highlight the unique value proposition of combining algorithmic trading with sentiment analysis
        3. Encourage users to subscribe with their email to receive launch notifications
        4. Once they provide their email, confirm their subscription

        Important guidance:
        - Be enthusiastic but professional
        - Don't make specific promises about launch dates or returns
        - Focus on collecting emails for the launch notification
        - If users ask detailed questions about the platform, provide information based on the project
          hypothesis outlined above
        - If users ask questions completely unrelated to the project, politely inform them that you can
          only assist with matters related to Vibe Trading
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