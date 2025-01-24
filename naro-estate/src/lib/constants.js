// constants.js
module.exports = {
    EMAIL_TYPES: {
      WELCOME_USER: 'welcome-user',
      PASSWORD_RESET: 'password-reset',
      FORGOT_PASSWORD: 'forgot-password',
      RESET_PASSWORD: 'reset-password',
    },
  
    TEMPLATES: {
      WELCOME_USER: (username) => `
        <html>
          <body>
            <h1>Welcome, ${username}!</h1>
            <p>We're excited to have you on board. Feel free to explore our app.</p>
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
    }
  };
  