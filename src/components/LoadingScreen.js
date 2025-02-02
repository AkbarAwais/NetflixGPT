import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ isLoading = true, children }) => {
    const [showContent, setShowContent] = useState(false);
    const [loadingText, setLoadingText] = useState('Loading');

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                setShowContent(true);
            }, 800);
            return () => clearTimeout(timer);
        }
        setShowContent(false);
    }, [isLoading]);

    // Animate loading text dots
    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingText(current => {
                    if (current === 'Loading...') return 'Loading';
                    return current + '.';
                });
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    if (!isLoading && showContent) {
        return <>{children}</>;
    }

    return (
        <div className="fixed inset-0 bg-gray-900 z-50">
            <div className="flex flex-col items-center justify-center h-full">
                {/* Animated hexagon pattern */}
                <div className="relative w-32 h-32">
                    {/* Hexagon layers */}
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="absolute inset-0 border-4 border-cyan-500 rounded-xl"
                            style={{
                                animation: `spin ${2 + index}s linear infinite`,
                                opacity: 1 - index * 0.2,
                                transform: `scale(${1 - index * 0.15})`,
                            }}
                        />
                    ))}

                    {/* Center ripple effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className="absolute w-8 h-8 bg-cyan-500 rounded-full"
                                style={{
                                    animation: `ripple 2s infinite ${index * 0.5}s`,
                                    opacity: 0,
                                }}
                            />
                        ))}
                        <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Loading text and dots */}
                <div className="mt-8 space-y-4">
                    {/* Animated text */}
                    <div className="text-cyan-500 text-xl font-medium tracking-wider">
                        {loadingText}
                    </div>

                    {/* Bouncing dots */}
                    <div className="flex space-x-2 justify-center">
                        {[...Array(3)].map((_, index) => (
                            <div
                                key={index}
                                className="w-3 h-3 bg-cyan-500 rounded-full"
                                style={{
                                    animation: `bounce 0.6s infinite ${index * 0.2}s`
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ripple {
          0% { transform: scale(0.1); opacity: 0.4; }
          50% { opacity: 0.2; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;