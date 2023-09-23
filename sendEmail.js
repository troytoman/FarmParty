const mailgun = require("mailgun-js");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email } = JSON.parse(event.body);
  const mg = mailgun({ apiKey: "your-mailgun-api-key", domain: "your-mailgun-domain" });
  const data = {
    from: "Your Website <info@yourwebsite.com>",
    to: "you@yourwebsite.com",
    subject: `RSVP from ${name}`,
    text: `New RSVP received from ${name} with the email: ${email}`
  };

  try {
    await mg.messages().send(data);
    return {
      statusCode: 200,
      body: "Email successfully sent."
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal Server Error"
    };
  }
};
