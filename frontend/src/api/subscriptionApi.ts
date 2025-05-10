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
    console.log('===== CLIENT-SIDE EMAIL SUBMISSION =====');
    console.log('Submitting email to API:', email);
    
    // Get the correct API URL based on environment
    const API_ROOT = import.meta.env.VITE_API ?? '';
    const apiUrl = `${API_ROOT}/api/subscribe`;
    
    console.log('API URL:', apiUrl);
    
    // Add a timestamp to prevent caching
    const timestamp = new Date().getTime();
    const url = `${apiUrl}?t=${timestamp}`;
    console.log('Final URL with cache busting:', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store',
        'Pragma': 'no-cache'
      },
      body: JSON.stringify({ email }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()].map(([k, v]) => `${k}: ${v}`).join(', '));
    
    const data = await response.json();
    console.log('API response data:', data);
    
    if (!response.ok) {
      console.error('API error response:', data);
      throw new Error(data.message || 'Failed to subscribe');
    }
    
    // Add an alert for debugging
    console.log(`Email ${email} has been submitted to the database.`);
    return data;
  } catch (error) {
    console.error('Error subscribing email:', error);
    console.log(`Failed to save email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};