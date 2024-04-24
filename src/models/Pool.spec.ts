import Card from "./Card";
import Pool from "./Pool";

it('should fill pool based on card tier', () => {
    const allCards = [
        new Card({name: 'Annoy-o-Tron', battlegrounds: { tier: 1 }}),
        new Card({name: 'Svin', battlegrounds: { tier: 6 }}),
    ];

    const pool = new Pool(allCards);

    expect(pool.cardsPool.length).toEqual(23);
    expect(pool.cardsPool[0].name).toEqual('Annoy-o-Tron');
    expect(pool.cardsPool[1].name).toEqual('Annoy-o-Tron');
    expect(pool.cardsPool[22].name).toEqual('Svin');
});

it('get random cards should not return 2 cards with same index', () => {
    const allCards = [
        new Card({name: 'Annoy-o-Tron', battlegrounds: { tier: 1 }}),
        new Card({name: 'Svin', battlegrounds: { tier: 6 }}),
    ];

    const pool = new Pool(allCards);

    const cards = pool.getRandomCards(20, 6, ['mech', 'beast']);
    expect(cards.length).toEqual(20);

    const array = cards.map(card => card.index);
    const duplicates = array.filter((item, index) => array.indexOf(item) !== index);
    expect(duplicates.length).toEqual(0);
});

