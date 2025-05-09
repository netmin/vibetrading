/**
 * API utilities for user subscriptions
 */

/**
 * Subscribe a user with their email
 * @param email - The user's email address
 * @returns Promise with the subscription result
 */
export const subscribeEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to subscribe');
    }
    
    return data;
  } catch (error) {
    console.error('Error subscribing email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};