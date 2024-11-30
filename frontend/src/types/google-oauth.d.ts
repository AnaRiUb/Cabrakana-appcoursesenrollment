declare module '@react-oauth/google' {
    export const GoogleLogin: React.FC<{
      onSuccess: (response: any) => void;
      onError?: (error: any) => void;
      useOneTap?: boolean;
    }>;
    export const GoogleOAuthProvider: React.FC<{ clientId: string }>;
  }
  