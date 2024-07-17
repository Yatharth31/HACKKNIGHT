import '../../App.css';

const cardsData = [
  {
    imageSrc: 'default_profile.svg',
    name: 'Profile #1',
    borrower: false,
    amount_to_borrow: '',
    amount_to_lend: 'AUD 200.00',
    payment_due: '05-10-2023',
    description:
      "Sign up as a lender or borrower. Fill in your details, set your preferences, and you're good to go!",
  },
  {
    imageSrc: 'default_profile.svg',
    name: 'Profile #2',
    borrower: true,
    amount_to_borrow: 'AUD 69.69',
    amount_to_lend: '',
    payment_due: '01-11-2023',
    description:
      "Swipe through profiles that fit your criteria. When both parties swipe right, it's a match!",
  },
];

export default function ActiveLoan() {
  return (
    <div>
      <div className="">
        <h1 className="text-3xl font-medium">Active Loans</h1>
      </div>
      <div
        className="flex justify-center"
        style={{
          marginBottom: '20px',
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
              <p className="text-center text-gray-500">
                {card.borrower ? 'Lend' : 'Received'}
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {card.borrower ? card.amount_to_borrow : card.amount_to_lend}
              </h3>
              <p className="mb-2 text-center text-gray-500">
                {card.borrower ? 'to' : 'from'}
              </p>
              <h4 className="text-xl tracking-tight mb-3 text-gray-900 dark:text-white">
                {card.name}
              </h4>
              <div className="text-center">
                <h5>Payment due:</h5>
                <p className="mb-3 text-center dark:text-gray-400">
                  {card.payment_due}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
