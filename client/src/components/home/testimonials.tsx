import '../../App.css';

const cardsData = [
  {
    name: 'Charles D.',
    description:
      "Never thought lending money could be this easy. The swiping mechanism is intuitive, and I've already matched with several trustworthy borrowers! Time to gamble it all away!",
  },
  {
    name: 'Bobby H.',
    description:
      'I needed a small loan to get KFC, and loander was a lifesaver. Quick, simple, and transparent. Highly recommended!',
  },
  {
    name: 'James X.',
    description:
      'The chat feature made discussing terms super straightforward. Found a lender within hours of signing up. Kudos to the loander team!',
  },
];

export default function Testimonials() {
  return (
    <div
      className="flex justify-center"
      style={{
        marginTop: '20px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center', // Center the cards horizontally
      }}
    >
      <div
        className="cards-container"
        style={{
          padding: '0 40px', // Add padding to the left and right
          maxWidth: '1280px', // Set a maximum width for the background
        }}
      >
        <div
          className="flex justify-center"
          style={{
            display: 'flex',
            justifyContent: 'center', // Center the cards horizontally
            gap: '20px', // Add gaps between the cards
            padding: '20px', // Add padding around the cards
          }}
        >
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="card bg-white border border-gray-200 rounded-lg shadow"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
                flexGrow: 1, // Allow cards to grow and fill available space
                minWidth: '250px', // Set a minimum width for the cards
                maxWidth: '400px', // Set a maximum width for the cards
              }}
            >
              <div className="px-3 text-left">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%', // Make the inner container take full width
                  }}
                >
                  <h5 className="text-xl tracking-tight mb-3 text-gray-900">
                    {card.name}
                  </h5>
                  <img src="Text_bubble.svg" alt="empty" />
                </div>
                <p className="mb-3 text-left text-gray-900">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
