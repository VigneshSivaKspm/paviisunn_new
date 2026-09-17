import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const phoneNumber = '919894693682';
  const message = encodeURIComponent('Hello Pavii Sunn Solar, I would like to get a free quote and details about solar power installation.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="whatsapp-pulse"></div>
      <svg
        className="whatsapp-icon"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="currentColor"
      >
        <path d="M16 2a13 13 0 0 0-11.2 19.6L3 29l7.6-1.7A13 13 0 1 0 16 2zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-4 1 1-3.9-.3-.4a10.6 10.6 0 1 1 9.1 5zm5.8-7.9c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.2-.6.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.4.3-.5.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.2 1.4 3.4c.2.2 2.4 3.7 5.8 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7s.3-1.5.2-1.7c-.1-.1-.4-.2-.7-.3z" />
      </svg>
      <span className="whatsapp-tooltip">Chat with us</span>
    </a>
  );
}
