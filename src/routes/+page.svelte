<script>
    import Add from '../assets/add.svelte'
    import { PUBLIC_BASE_URL } from '$env/static/public';
    export let data;
    import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte'
    let formModal = false;
    import { uploadMedia } from '../utils/s3-uploader.js';
    import { invalidate } from "$app/navigation";
	import { getTokenFromLocalStorage, logOut } from '../utils/auth';
    let formErrors = {}
    async function uploadImage(evt) {
      const [fileName, fileUrl] = await uploadMedia(evt.target['file'].files[0]);

      const data = {
        title: evt.target['title'].value,
        description: evt.target['description'].value,
        price: parseFloat(evt.target['price'].value),
        url: fileUrl
      }

      const resp = await fetch(PUBLIC_BASE_URL + '/images/upload', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenFromLocalStorage(),
        },
        body: JSON.stringify(data)
      })
      if (resp.status === 200){
        formModal = false
        invalidate('/')
      } else {
        const res = await resp.json()
        formErrors = res.res.errors
      }
      
      // code to make POST request to your backend
    }

</script>
<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>
<div class="container mt-3 lg:mt-10 mx-auto px-2 lg:px-0">
    <div class="flex justify-end">
            <button class="btn btn-ghost gap-2" on:click={() => formModal = true}> <Add/> Upload Image</button> 
    </div>

    <div class="grid lg:grid-cols-3 gap-4">
        {#each data.data as image}
        <div class="card bg-base-100 shadow-xl">
            <figure class="h-60">
               <img src={image.url} alt=""> 
            </figure>
            
            <div class="card-body">
                <div class="card-title">{image.title}</div>
                <p class="card-description">{image.description}</p>
                <div class="flex card-actions items-end justify-end">
                    <div class="card-price text-xl font-thin mr-4">USD {image.price}</div>
                    <button class="btn">Buy Now</button>
                </div>
            </div>
        </div>
        
            <!-- <div>
                <a class="font-bold text-2xl" href="/jobs/{image.id}">{image.title}</a>
                <div class="text-sm mt-1">

                </div>
                //image.url
            </div>

            <div class="mt-4 ">
                {image.description.slice(0, 240)}...
            </div>
        </div> -->
        {/each}
    </div>
</div>

<Modal bind:open={formModal} size="lg" autoclose={false} class="w-full">
    <form on:submit|preventDefault={uploadImage} class="w-full">
        <div class="form-control w-full mt-2">
        <input type="file" name="file"/>
        {#if 'file' in formErrors}
            <label class="label" for="file">
            <span class="label-text-alt text-red-500">{formErrors['file']}</span>
            </label>
        {/if}
        </div>

        <div class="form-control w-full">
            <label class= "label label-text" for="price">Price</label>
            <input
                type="number" 
                min="0.01" 
                step="0.01"
                name="price"
                placeholder=""
                class="input input-bordered"
            />
            {#if 'price' in formErrors}
                <label class ="label" for="price">
                    <span class= "label-text-alt text-red-500">{formErrors['price']}</span>
                </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class= "label label-text" for="title">Title</label>
            <input
                type="text"
                name="title"
                placeholder=""
                class="input input-bordered"
            />
            {#if 'title' in formErrors}
                <label class ="label" for="title">
                    <span class= "label-text-alt text-red-500">{formErrors['title']}</span>
                </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class= "label label-text" for="description">Description</label>
            <textarea
                name="description"
                placeholder=""
                class="input input-bordered h-20"
            />
            {#if 'description' in formErrors}
                <label class ="label" for="description">
                    <span class= "label-text-alt text-red-500">{formErrors['description']}</span>
                </label>
            {/if}
        </div>

        <div class="form-control w-full mt-4">
        <button class="btn btn-md">Upload</button>
        </div>
    </form>
</Modal>

