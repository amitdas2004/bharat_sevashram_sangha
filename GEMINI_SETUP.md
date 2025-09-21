# Google Gemini API Setup Guide

## Overview
The chat support feature in this application uses Google's Gemini AI to provide intelligent responses to user queries. To enable this functionality, you need to configure a Google Gemini API key.

## Steps to Set Up Google Gemini API

### 1. Get Your API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables
1. Open the `.env.local` file in your project root
2. Replace `your_google_gemini_api_key_here` with your actual API key:
   ```
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

### 3. Restart Your Development Server
After updating the environment variables:
```bash
npm run dev
# or
pnpm dev
```

## Testing the Setup
1. Navigate to `http://localhost:3000/dashboard/help-support`
2. Try sending a message in the chat interface
3. You should receive a response from the Gemini AI assistant

## Troubleshooting

### Error: "API key not valid"
- Ensure your API key is correctly copied from Google AI Studio
- Check that there are no extra spaces or characters in the `.env.local` file
- Verify the API key is active in your Google Cloud Console

### Error: "GOOGLE_API_KEY not set"
- Make sure the `.env.local` file exists in your project root
- Ensure the environment variable name is exactly `GOOGLE_API_KEY`
- Restart your development server after making changes

### Error: "Chat assistant is not configured yet"
- This means the API key is not properly configured
- Follow the setup steps above to resolve this issue

## API Usage Limits
Google Gemini API has usage limits based on your plan:
- Free tier: Limited requests per day
- Paid plans: Higher limits with billing

Check your usage in the [Google AI Studio](https://makersuite.google.com/app/apikey) dashboard.

## Security Notes
- Never commit your `.env.local` file to version control
- Keep your API key secure and don't share it publicly
- Consider using environment-specific keys for different deployments
