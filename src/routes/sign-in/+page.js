import { goto } from "$app/navigation";
import { getTokenFromLocalStorage } from "../../utils/auth";


export async function load() {
    const isLoggedIn = getTokenFromLocalStorage()
    if (isLoggedIn){
        goto('/')
    }
}