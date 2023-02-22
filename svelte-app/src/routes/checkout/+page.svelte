<script lang="ts">
	import mainMenus from '../../store/cart';
</script>

<a href="/cart"><button>Cart</button></a>
<h1>Checkout</h1>
<ol>
	{#each $mainMenus as menu}
		{#each menu.foods as food}
			{#if food.quantity > 0}
				<li>
					{food.name} x {food.quantity}
				</li>
			{/if}
		{/each}
	{/each}
</ol>
