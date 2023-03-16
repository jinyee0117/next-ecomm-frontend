<script>
    import "../app.css";
	import Header from "../components/header.svelte";
  import Footer from "../components/footer.svelte";
  import "flowbite/dist/flowbite.css";
  </script>

  <Header/>
  <main>
    <slot />
  </main>
  <Footer/>