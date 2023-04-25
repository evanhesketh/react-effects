/**
 * Presentational component that renders button.
 *
 * Props:
 * - onClick - function
 *
 * App -> Gameboard -> Button
 */
function Button({ onClick }) {
	return (
		<div className='Button'>
			<button onClick={onClick}>Gimmie a card!</button>
		</div>
	);
}

export default Button;
