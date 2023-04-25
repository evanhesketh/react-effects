/**
 * Presentational component that renders an individual card image
 *
 * Props:
 *  - card: {"image": "https://...", "value": "6", "suit": "HEARTS", ...}
 *
 * App -> Gameboard -> Card
 */
function Card({ card, idx }) {
	return (
		<div className='Card'>
			<img
				src={card.image}
				style={{ position: 'absolute', transform: `rotate(${idx}deg)` }}
				alt={`${card.value} of ${card.suit}`}
			/>
		</div>
	);
}
export default Card;
