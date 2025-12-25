import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorBannerProps {
  error: string | null;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-amber-900 mb-2">Google Sheets Setup Required</h3>
            <p className="text-sm text-amber-800 mb-3">{error}</p>
            <div className="text-sm text-amber-800 space-y-2">
              <p className="font-medium">To connect your Google Sheet:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Create a Google Sheet with columns: Name, MRP, Price, Category, Subcategory, Description, Image URL, Rating</li>
                <li>Make the sheet publicly viewable (Share → Anyone with link can view)</li>
                <li>Get your Sheet ID from the URL (between /d/ and /edit)</li>
                <li>Get a Google API key from Google Cloud Console with Sheets API enabled</li>
                <li>Replace API_KEY in src/lib/config.ts with your actual API key</li>
              </ol>
              <p className="mt-3 text-amber-700 italic">Currently showing demo data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorBanner;
