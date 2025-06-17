
import React from 'react';

interface OTPEmailTemplateProps {
  userEmail: string;
  otpCode: string;
  companyName?: string;
  expirationMinutes?: number;
}

const OTPEmailTemplate = ({ 
  userEmail, 
  otpCode, 
  companyName = "Kilimax", 
  expirationMinutes = 10 
}: OTPEmailTemplateProps) => {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#2563eb',
        padding: '20px',
        textAlign: 'center' as const
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '8px',
            display: 'inline-block'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#2563eb',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#ffffff'
            }}>
              K
            </div>
          </div>
          <div>
            <h1 style={{
              color: '#ffffff',
              fontSize: '24px',
              fontWeight: 'bold',
              margin: '0'
            }}>
              {companyName}
            </h1>
            <p style={{
              color: '#e0e7ff',
              fontSize: '12px',
              margin: '0'
            }}>
              Enterprise Resource Planning
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '32px 24px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '16px',
          textAlign: 'center' as const
        }}>
          Verification Code
        </h2>

        <p style={{
          fontSize: '16px',
          color: '#4b5563',
          lineHeight: '1.5',
          marginBottom: '24px'
        }}>
          Hello,
        </p>

        <p style={{
          fontSize: '16px',
          color: '#4b5563',
          lineHeight: '1.5',
          marginBottom: '24px'
        }}>
          You have requested to reset your password for your {companyName} account ({userEmail}). 
          Please use the verification code below to proceed with your password reset:
        </p>

        {/* OTP Code Box */}
        <div style={{
          backgroundColor: '#f3f4f6',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          padding: '24px',
          textAlign: 'center' as const,
          marginBottom: '24px'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#2563eb',
            letterSpacing: '8px',
            fontFamily: 'monospace'
          }}>
            {otpCode}
          </div>
        </div>

        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.5',
          marginBottom: '16px'
        }}>
          This verification code will expire in <strong>{expirationMinutes} minutes</strong>. 
          If you did not request this password reset, please ignore this email.
        </p>

        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.5',
          marginBottom: '24px'
        }}>
          For security reasons, do not share this code with anyone.
        </p>

        {/* Security Tips */}
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '6px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#92400e',
            marginBottom: '8px'
          }}>
            Security Reminder:
          </h3>
          <ul style={{
            fontSize: '12px',
            color: '#92400e',
            margin: '0',
            paddingLeft: '16px'
          }}>
            <li>Never share your verification code with others</li>
            <li>This code is only valid for {expirationMinutes} minutes</li>
            <li>If you didn't request this, please contact support immediately</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: '#f9fafb',
        padding: '20px 24px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <p style={{
          fontSize: '12px',
          color: '#6b7280',
          textAlign: 'center' as const,
          margin: '0'
        }}>
          This is an automated message from {companyName} ERP System. Please do not reply to this email.
        </p>
        <p style={{
          fontSize: '12px',
          color: '#6b7280',
          textAlign: 'center' as const,
          margin: '8px 0 0 0'
        }}>
          If you need assistance, please contact your system administrator.
        </p>
      </div>
    </div>
  );
};

export default OTPEmailTemplate;

// HTML string version for email sending
export const generateOTPEmailHTML = (props: OTPEmailTemplateProps) => {
  const { userEmail, otpCode, companyName = "Kilimax", expirationMinutes = 10 } = props;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code - ${companyName}</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f3f4f6; font-family: Arial, sans-serif;">
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background-color: #2563eb; padding: 20px; text-align: center;">
            <div style="display: inline-flex; align-items: center; gap: 8px;">
                <div style="background-color: #ffffff; border-radius: 8px; padding: 8px; display: inline-block;">
                    <div style="width: 24px; height: 24px; background-color: #2563eb; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; color: #ffffff;">
                        K
                    </div>
                </div>
                <div>
                    <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0;">
                        ${companyName}
                    </h1>
                    <p style="color: #e0e7ff; font-size: 12px; margin: 0;">
                        Enterprise Resource Planning
                    </p>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 32px 24px;">
            <h2 style="font-size: 24px; font-weight: 600; color: #111827; margin-bottom: 16px; text-align: center;">
                Verification Code
            </h2>

            <p style="font-size: 16px; color: #4b5563; line-height: 1.5; margin-bottom: 24px;">
                Hello,
            </p>

            <p style="font-size: 16px; color: #4b5563; line-height: 1.5; margin-bottom: 24px;">
                You have requested to reset your password for your ${companyName} account (${userEmail}). 
                Please use the verification code below to proceed with your password reset:
            </p>

            <!-- OTP Code Box -->
            <div style="background-color: #f3f4f6; border: 2px solid #e5e7eb; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 24px;">
                <div style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 8px; font-family: monospace;">
                    ${otpCode}
                </div>
            </div>

            <p style="font-size: 14px; color: #6b7280; line-height: 1.5; margin-bottom: 16px;">
                This verification code will expire in <strong>${expirationMinutes} minutes</strong>. 
                If you did not request this password reset, please ignore this email.
            </p>

            <p style="font-size: 14px; color: #6b7280; line-height: 1.5; margin-bottom: 24px;">
                For security reasons, do not share this code with anyone.
            </p>

            <!-- Security Tips -->
            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
                <h3 style="font-size: 14px; font-weight: 600; color: #92400e; margin-bottom: 8px;">
                    Security Reminder:
                </h3>
                <ul style="font-size: 12px; color: #92400e; margin: 0; padding-left: 16px;">
                    <li>Never share your verification code with others</li>
                    <li>This code is only valid for ${expirationMinutes} minutes</li>
                    <li>If you didn't request this, please contact support immediately</li>
                </ul>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 20px 24px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280; text-align: center; margin: 0;">
                This is an automated message from ${companyName} ERP System. Please do not reply to this email.
            </p>
            <p style="font-size: 12px; color: #6b7280; text-align: center; margin: 8px 0 0 0;">
                If you need assistance, please contact your system administrator.
            </p>
        </div>
    </div>
</body>
</html>
`;
};

// Plain text version for email sending
export const generateOTPEmailText = (props: OTPEmailTemplateProps) => {
  const { userEmail, otpCode, companyName = "Kilimax", expirationMinutes = 10 } = props;
  
  return `
${companyName} - Verification Code

Hello,

You have requested to reset your password for your ${companyName} account (${userEmail}). 
Please use the verification code below to proceed with your password reset:

Verification Code: ${otpCode}

This verification code will expire in ${expirationMinutes} minutes. 
If you did not request this password reset, please ignore this email.

For security reasons, do not share this code with anyone.

Security Reminder:
- Never share your verification code with others
- This code is only valid for ${expirationMinutes} minutes
- If you didn't request this, please contact support immediately

This is an automated message from ${companyName} ERP System. Please do not reply to this email.
If you need assistance, please contact your system administrator.
`;
};
