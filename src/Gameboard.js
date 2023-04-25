import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button';
import Card from './Card';

const BASE_URL = 'https://deckofcardsapi.com/api/deck';

/**
 * Card-drawing game app.
 *
 * Effects:
 * - On mount: Gets new shuffled deck
 *
 * State:
 * - deck - Object - { id:"aklsjed", remaining: 12, isLoading: false }
 * - cards - Array - [{"image": "https://...", ... }, ... ]
 *
 * App -> Gameboard -> {Button, Card}
 */

function Gameboard() {
	const [deck, setDeck] = useState({
		id: null,
		remaining: null,
		isLoading: true,
	});

	const [cards, setCards] = useState([]);

	useEffect(function fetchDeckWhenMounted() {
		async function fetchDeck() {
			const deckResult = await axios.get(`${BASE_URL}/new/shuffle/`);
			const { deck_id, remaining } = deckResult.data;
			setDeck({ id: deck_id, remaining, isLoading: false });
		}
		fetchDeck();
	}, []);

	/**
	 * Draws a new card from the deck. Updates state for cards and deck.
	 */
	async function drawCard() {
		const response = await axios.get(`${BASE_URL}/${deck.id}/draw/?count=1`);
		const card = response.data.cards[0];
		const remaining = Number(response.data.remaining);

		setCards(curr => [...curr, card]);
		setDeck({ ...deck, remaining });
	}

	if (deck.isLoading) return <div>Fetching new deck...</div>;

	return (
		<div className='Gameboard'>
			{deck.remaining > 0
        ? <Button onClick={drawCard} />
			  : <p>Error: No cards remaining!</p>}
			{cards.length !== 0 &&
				cards.map((card, idx) => (
					<Card
						key={card.code}
						card={card}
						idx={idx}
					/>
				))}
		</div>
	);
}

export default Gameboard;
