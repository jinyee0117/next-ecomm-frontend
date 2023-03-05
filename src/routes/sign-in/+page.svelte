<script>
    import {authenticateUser} from '../../utils/auth'
    import { goto } from '$app/navigation';

     let formErrors = {};

     async function signIn() {
        goto('/')
     }

    async function onSubmit(evt) {
        evt.preventDefault()
        
        const userData= {
            email: evt.target['email'].value,
            password: evt.target['password'].value
        };

        const resp = await authenticateUser(userData.email, userData.password)

        if (resp.success === true) {
            signIn();
        } else {
            formErrors = resp.res.error
        }
        
    } 

</script>
<div class="container mt-3 lg:mt-10 px-2 lg:px-0 mx-auto">
    <h1 class = "text-center text-xl">Sign In</h1>

    <div class= "flex justify-center items-center mt-2">
        <form on:submit={onSubmit} class="w-1/3">
            <div class="form-control">
                <label class= "label label-text" for="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    class="input input-bordered"
                />
                {#if 'email' in formErrors}
                    <label class ="label" for="email">
                        <span class= "label-text-alt text-red-500">{formErrors['email']}</span>
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
                {#if 'password' in formErrors}
                    <label class ="label" for="password">
                        <span class= "label-text-alt text-red-500">{formErrors['password']}</span>
                    </label>
                {/if}
            </div>

            <div class="form-control mt-4">
                <button class="btn btd-md">Sign In</button>
            </div>

            <div class="text-center">
                <a class="link-hover italic text-xs" href="/users/new"
                    >Don't have an account yet? Click here to sign-up instead.</a
                >
            </div>

    </div>

    
</div>

