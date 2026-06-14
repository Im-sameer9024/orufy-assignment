export const OTPEmail = (email, otp) => {
  return `
    <html>
      <body style="background:#f4f4f5;padding:40px">
        <div style="background:white;padding:30px;border-radius:10px">
          <h1>Email Verification</h1>
          <p>Hello ${email}</p>
          <p>Your OTP is:</p>
          <h2>${otp}</h2>
          <p>This OTP is valid for 20 seconds.</p>
        </div>
      </body>
    </html>
  `;
};
