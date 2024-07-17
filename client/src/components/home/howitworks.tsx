import '../../App.css';

const cardsData = [
  {
    imageSrc: 'profile.svg',
    title: 'Create your profile',
    description:
      "Sign up as a lender or borrower. Fill in your details, set your preferences, and you're good to go!",
  },
  {
    imageSrc: 'browse_and_match.svg',
    title: 'Browse & Match',
    description:
      "Swipe through profiles that fit your criteria. When both parties swipe right, it's a match!",
  },
  {
    imageSrc: 'chat_and_discuss.svg',
    title: 'Chat & Discuss',
    description:
      'Engage in encrypted conversations to discuss loan terms, amounts, and repayment plans.',
  },
  {
    imageSrc: 'agreements.svg',
    title: 'Agreements',
    description:
      'Once both parties come to an agreement, move forward with your financial transactions off-platform.',
  },
];

export default function How() {
  return (
    <div
      className="flex justify-center"
      style={{
        marginTop: '70px',
        marginBottom: '70px',
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
          }}
        >
          <a href="#">
            <img
              className="how-it-works-image rounded-t-lg mb-3"
              src={card.imageSrc}
              alt=""
            />
          </a>
          <div className="text-center">
            <a href="#">
              <h5 className="text-2xl font-bold tracking-tight mb-3 text-gray-900 dark:text-white">
                {card.title}
              </h5>
            </a>
            <p className="px-3 mb-3 text-left dark:text-gray-400">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
