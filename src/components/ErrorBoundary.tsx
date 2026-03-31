import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
            <h2 className="text-2xl font-serif mb-4 text-zinc-900">Something went wrong</h2>
            <p className="text-zinc-600 mb-6 font-sans">
              We're sorry, but an unexpected error occurred. Please try refreshing the page.
            </p>
            <div className="bg-zinc-100 p-4 rounded-lg overflow-auto text-xs font-mono text-zinc-800 max-h-48 mb-6">
              {this.state.error?.message}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-zinc-900 text-white py-3 rounded-lg font-sans text-sm tracking-widest uppercase hover:bg-zinc-800 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
