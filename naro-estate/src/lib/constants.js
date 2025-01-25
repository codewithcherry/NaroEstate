export const EMAIL_TYPES = {
  WELCOME_USER: 'welcome-user',
  PASSWORD_RESET: 'password-reset',
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password',
};

export const TEMPLATES = {
  WELCOME_USER: (username, verificationLink) => `
    <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to NaroEstate</title>
          <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-50 flex items-center justify-center min-h-screen">
          <div class="max-w-lg w-full bg-white shadow-lg rounded-2xl p-6 md:p-8">
              <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
                  Welcome, <span id="username" class="text-blue-600">${username}</span>!
              </h1>
              <p class="text-gray-600 text-center mb-6">
                  Thank you for creating an account on <span class="font-semibold text-blue-600">NaroEstate</span>! <br>
                  Explore the best places for rent, sale, and lease for holidays, vacations, and fun activities.
              </p>
              <a href="${verificationLink}" class="block bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-3 px-6 rounded-lg transition duration-300">
                  Verify Your Email
              </a>
              <p class="text-sm text-gray-500 mt-6 text-center">
                  If you didn’t create this account, please ignore this email.
              </p>
          </div>
      </body>
      </html>
  `,
  PASSWORD_RESET: (resetLink) => `
    <html>
      <body>
        <h1>Password Reset Request</h1>
        <p>If you requested a password reset, click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
      </body>
    </html>
  `,
  FORGOT_PASSWORD: (username) => `
    <html>
      <body>
        <h1>Hello ${username},</h1>
        <p>We received a request to reset your password. If you did not request this, please ignore this email.</p>
      </body>
    </html>
  `,
  RESET_PASSWORD: (username) => `
    <html>
      <body>
        <h1>Password Reset Successful</h1>
        <p>Your password has been successfully reset. You can now log in with your new password.</p>
      </body>
    </html>
  `,
};
