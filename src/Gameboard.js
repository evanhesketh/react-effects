import React, {useEffect, useState} from 'react';
import axios from 'axios';

const BASE_URL = "https://deckofcardsapi.com/api/deck";

function Gameboard() {
  const [deck, setDeck] = useState({
    id: null,
    remaining: null,
    isLoading: true
  });

  const [cards, setCards] = useState([]);

  useEffect(function fetchDeckWhenMounted() {
    async function fetchDeck() {
      const deckResult = await axios.get(`${BASE_URL}/new/shuffle/`);
      const {id, remaining} = deckResult.data;
      setDeck({id, remaining, isLoading: false});
    }
    fetchDeck();
  }, []);

  async function drawCard() {
    const response = await axios.get(`${BASE_URL}/${deck.id}}/draw/?count=1`);
    const card = response.data.cards[0];
    const remaining = response.data.remaining;

    setCards(curr => [...curr, card]);
    setDeck({...deck, remaining});
  }

  if (deck.isLoading) return <div>Fetching new deck...</div>;

  return (
    <div className='Gameboard'>
      <Button onClick={drawCard}/>
      {cards.length !== 0 && cards.map( card => <Card card={card} />)}
    </div>
  );
}

export default Gameboard;