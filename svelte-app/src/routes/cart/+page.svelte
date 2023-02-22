<script lang="ts">
	import mainMenus from '../../store/cart';
	import CheckoutPage from '../checkout/+page.svelte';
	import { getContext } from 'svelte';

	let mainMenuName: string = 'Drink';

	$: foods = $mainMenus.find((menu) => menu.name == mainMenuName)?.foods || [];

	$: console.log(mainMenuName, foods.length);
</script>

<div>
	<a href="/checkout">
		<button>Checkout</button>
	</a>
	<h1>Category Menu</h1>
	<div class="cat-menu">
		{#each $mainMenus as menu}
			<div class="cat-menu-item" on:click={() => (mainMenuName = menu.name)}>
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
					<button
						on:click={() =>
							mainMenus.update((state) => {
								food.quantity = Math.max(0, food.quantity - 1);
								return state;
							})}
					>
						-
					</button>
					<span class="cart-count">{food.quantity}</span>
					<button
						on:click={() =>
							mainMenus.update((state) => {
								food.quantity++;
								return state;
							})}
					>
						+
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<CheckoutPage />

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
