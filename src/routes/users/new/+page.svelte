<script>
    import { PUBLIC_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';

    let formErrors = {};

    async function postSignUp() {
        goto('/')
    }


    async function create(evt) {
        evt.preventDefault()
        if (evt.target['password'].value != evt.target['confirmPassword'].value){
            formErrors['password'] = {message: 'Password confirmation does not match'};
            return;
        }

        const userData= {
            name: evt.target ['name'].value,
            email: evt.target['email'].value,
            password: evt.target['password'].value,
        };

        const resp = await fetch (PUBLIC_BASE_URL + '/users', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (resp.status == 200) {
            postSignUp();
        } else {
            const res = await resp.json();
            console.log(res)
            formErrors = res.error
            console.log(formErrors)
        }
        
    } 
    
</script>

<div class="container mt-3 lg:mt-10 px-2 lg:px-0 mx-auto">
    <h1 class = "text-center text-xl">Sign Up</h1>

    <div class= "flex justify-center items-center mt-2">
        <form on:submit={create} class="w-1/3">
            <div class="form-control">
                <label class= "label label-text" for="name">Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    class="input input-bordered"
                />
                {#if 'name' in formErrors}
                    <label class="label" for="name">
                        <span class="label-text-alt text-red-500">{formErrors['name']}</span>
                    </label>
                {/if}
            </div>

            <div class="form-control">
                <label class= "label label-text" for="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    class="input input-bordered"
                />
                {#if 'email' in formErrors}
                    <label class="label" for="email">
                        <span class="label-text-alt text-red-500">{formErrors['email']}</span>
                    </label>
                {/if}
            </div>

            <div class="form-control">
                <label class= "label label-text" for="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder=""
                    class="input input-bordered"
                />
            </div>

            <div class="form-control">
                <label class= "label label-text" for="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder=""
                    class="input input-bordered"
                />
            </div>

            <div class="form-control mt-4">
                <button class="btn btn-md">CREATE AN ACCOUNT</button>
            </div>

            <div class="text-center">
                <a class="link-hover italic text-xs" href="/sign-in"
                    >Already signed up? Click here to sign-in instead.</a
                >
            </div>
    </div>
</div>

