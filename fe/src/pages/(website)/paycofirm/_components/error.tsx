import React, { Component, ReactNode } from 'react';

// Định nghĩa kiểu cho props, bao gồm 'children'
interface ErrorBoundaryProps {
  children: ReactNode; // ReactNode có thể là bất kỳ kiểu con nào (string, number, component, v.v.)
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; // Lấy children từ props và render
  }
}

export default ErrorBoundary;
