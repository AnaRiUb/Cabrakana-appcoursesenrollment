import React from 'react';

const GoogleSignInButton: React.FC = () => {
  const handleGoogleSignIn = () => {
    console.log('Iniciar sesión con Google');
    // Aquí puedes agregar la lógica para el inicio de sesión con Google
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-gray-500 text-sm">O continuar con:</p>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center space-x-2 w-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-5 h-5"
          fill="none"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.14 0 5.68 1.08 7.47 2.86l5.6-5.6C33.34 3.74 28.96 2 24 2 14.94 2 7.46 7.92 4.91 15.25l6.53 5.08C13.34 13.92 18.24 9.5 24 9.5z"
          />
          <path
            fill="#34A853"
            d="M46.1 24.3c0-1.33-.1-2.6-.28-3.83H24v7.25h12.5c-.54 2.87-2.17 5.31-4.61 6.96v5.73h7.45c4.37-4.02 6.85-9.95 6.85-16.11z"
          />
          <path
            fill="#FBBC05"
            d="M11.44 28.75a9.77 9.77 0 01-.52-3.14c0-1.1.19-2.18.52-3.14v-5.08H4.91C3.68 20.08 3 22 3 24c0 2.01.68 3.92 1.91 5.32l6.53-5.08z"
          />
          <path
            fill="#4285F4"
            d="M24 46c5.96 0 10.96-1.97 14.61-5.35l-7.45-5.73c-2.08 1.39-4.75 2.21-7.16 2.21-5.77 0-10.67-4.42-12.38-10.36l-6.53 5.08C7.46 40.08 14.94 46 24 46z"
          />
        </svg>
        <span>Google</span>
      </button>
    </div>
  );
};

export default GoogleSignInButton;
