<script>
    import { onMount } from 'svelte';
    let books = [];
    let searchTerm = '';
    let isLoading = false;
    let searchAttempted = false; // Variable to track if a search has been attempted

    const apiKey = "AIzaSyAZzkcW-PX3xmlFRjdzazUUDBcaJ0z_Yjs";
    console.log('API Key:', apiKey);
    console.log(import.meta.env);
    async function searchBooks() {
        if (searchTerm.trim() === '') return;

        isLoading = true;
        searchAttempted = true; // Set to true when search is attempted
        books = [];
        try {
            const requestURL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&key=${apiKey}`;
            console.log('Request URL:', requestURL); // For debugging
            const response = await fetch(requestURL);
            console.log('Response:', response); // For debugging
            if (!response.ok) throw new Error('Network response was not ok.');

            const data = await response.json();
            console.log('Data:', data); // For debugging
            books = data.items || [];
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            isLoading = false;
        }
    }

    onMount(() => {
        searchAttempted = false; // Reset on each page load or refresh
    });
</script>

<div>
    <input type="text" bind:value={searchTerm} placeholder="Search for books" />
    <button on:click={searchBooks} disabled={isLoading}>
        {#if isLoading}
            Searching...
        {:else}
            Search
        {/if}
    </button>

    {#if searchAttempted}
        {#if books.length > 0}
            <div class="books">
                {#each books as book}
                    <div class="book">
                        <h3>{book.volumeInfo.title}</h3>
                        {#if book.volumeInfo.authors}
                            <p>Authors: {book.volumeInfo.authors.join(', ')}</p>
                        {/if}
                        {#if book.volumeInfo.imageLinks?.thumbnail}
                            <img src={book.volumeInfo.imageLinks.thumbnail} alt={`Cover of ${book.volumeInfo.title}`} />
                        {/if}
                    </div>
                {/each}
            </div>
        {:else}
            <p>No books found.</p>
        {/if}
    {/if}
</div>

<style>
    /* Your existing styles */
    .books {
        display: flex;
        flex-wrap: wrap;
    }
    .book {
        margin: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
    }
    img {
        max-width: 100px;
        height: auto;
    }
</style>
