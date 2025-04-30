
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader } from 'lucide-react';

interface WebViewProps {
  url: string;
  height?: string;
  className?: string;
}

const WebView: React.FC<WebViewProps> = ({ url, height = '70vh', className = '' }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const handleIframeLoad = () => {
      setIsLoading(false);
    };
    
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      
      return () => {
        iframe.removeEventListener('load', handleIframeLoad);
      };
    }
  }, []);

  return (
    <Card className={`w-full overflow-hidden ${className}`}>
      <CardContent className="p-0 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10">
            <div className="flex flex-col items-center">
              <Loader className="h-8 w-8 animate-spin text-app-blue" />
              <p className="mt-2 text-gray-600">Loading website...</p>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full border-none"
          style={{ height }}
          title="AirNaija Website"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </CardContent>
    </Card>
  );
};

export default WebView;
