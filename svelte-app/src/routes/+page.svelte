<script lang='ts'>
import Footer from './footer.svelte'

let mainMenus = [
  {
    id: 1,
    name: 'Main Dish',
    foods: [
      { id: 1, name: 'Double Cheese Burger', quantity: 0 },
      { id: 2, name: 'French Fried', quantity: 0 },
      { id: 3, name: 'Fish Burger', quantity: 0 },
    ],
  },
  {
    id: 2,
    name: 'Drink',
    foods: [
      { id: 4, name: 'Coco Cola', quantity: 0 },
      { id: 5, name: 'Zero', quantity: 0 },
      { id: 6, name: 'Pepsi', quantity: 0 },
      { id: 7, name: 'Water', quantity: 0 },
    ],
  },
]

	let mainMenuName: string = 'Drink'

	$: foods = mainMenus.find(menu => menu.name == mainMenuName)?.foods || []

	$: console.log(mainMenuName, foods.length)

</script>

<div>
	<h1>Category Menu</h1>
	<div class="cat-menu">
		{#each mainMenus as menu}
		<div class="cat-menu-item" on:click={() =>  mainMenuName = menu.name }>
			{menu.name}
		</div>
		{/each}
	</div>

	<h1>{mainMenuName} Menu</h1>
	<div class="food-list">
		{#each foods as food}
		<div class="food-item">
			<div class="food-title">{food.name}</div>
			<div class="cart-container">
				<button on:click={()=>food.quantity = Math.max(0, food.quantity - 1)}>-</button>
				<span class="cart-count">{food.quantity}</span>
				<button on:click={()=>food.quantity++}>+</button>
			</div>
		</div>
		{/each}
	</div>
</div>

<style>
.cat-menu-item {
  border: 1px solid black;
  padding: 1rem;
}

.food-item {
  border: 1px solid black;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}

.cart-count {
  padding: 0.5rem;
}
</style>