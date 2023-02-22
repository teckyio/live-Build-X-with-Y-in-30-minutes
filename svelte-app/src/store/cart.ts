import { writable } from 'svelte/store';

let mainMenus = [
	{
		id: 1,
		name: 'Main Dish',
		foods: [
			{ id: 1, name: 'Double Cheese Burger', quantity: 0 },
			{ id: 2, name: 'French Fried', quantity: 0 },
			{ id: 3, name: 'Fish Burger', quantity: 0 }
		]
	},
	{
		id: 2,
		name: 'Drink',
		foods: [
			{ id: 4, name: 'Coco Cola', quantity: 0 },
			{ id: 5, name: 'Zero', quantity: 0 },
			{ id: 6, name: 'Pepsi', quantity: 0 },
			{ id: 7, name: 'Water', quantity: 0 }
		]
	}
];

// export type CartState = typeof mainMenus

export default writable(mainMenus);
