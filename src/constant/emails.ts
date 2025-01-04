function getUserEmails(name: string, type: string, confirmationUrl?: string) {
    if (type === 'confirmation') {
        return `<div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f6f9; padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4caf50; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="margin: 0;">Congratulations, ${name}!</h2>
        </div>
        <div style="padding: 20px; background-color: white; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px;">Your account has been successfully confirmed. We're thrilled to have you onboard!</p>
            
            <p style="font-size: 16px;">If you have any questions or need help, feel free to reach out to our support team at any time.</p>
            <p style="font-size: 16px;">Best regards,<br><strong>The Team</strong></p>
        </div>
    </div>`
    } else if (type === 'verification') {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Confirmation</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f6f9;
            color: #333;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 50px auto;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .body {
            padding: 20px;
            text-align: center;
        }
        .body p {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 14px 25px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            display: inline-block;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #888;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Account Confirmation</h1>
        </div>
        <div class="body">
            <p>Hi ${name},</p>
            <p>Thank you for signing up! Please confirm your account by clicking the button below.</p>
            <p  class="button">${confirmationUrl}</p>
            <p>If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>Best regards,<br> The IGTY Team</p>
            <p>Need help? <a href="mailto:support@igty.com">Contact Support</a></p>
        </div>
    </div>
</body>
</html>

        `
    } else {
        return ``
    }
}

export default getUserEmails
