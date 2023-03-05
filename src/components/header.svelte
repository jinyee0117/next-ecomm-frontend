<script>
	import {loggedIn, logOut} from '../utils/auth'
	import {goto} from '$app/navigation'
	
	const signOut = () => {
		logOut()
		goto('/')
	}

</script>

<header class=" flex p-2 bg-black text-neutral-content justify-between">
	<div>
		<a href="/" class="btn btn-ghost normal-case text-gray-300 text-xl">NEXT Academy Bootcamp Project - P2P EComm Full-Stack</a>
	</div>
	<div>
		{#if !$loggedIn}
		<a href='/users/new' class="btn btn-ghost text-gray-300">SIGN UP</a>
		<a href='/sign-in' class="btn btn-ghost text-gray-300">SIGN IN</a>
		{:else}
		<button on:click={signOut} class="btn btn-ghost text-gray-300">SIGN OUT</button>
		{/if}
	</div>
</header>