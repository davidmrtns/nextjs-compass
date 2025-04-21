import { loginRoute } from "@/middleware";

const baseUrl = "/api";

export async function fetchWrapper<T>(
    endpoint: string,
    options: RequestInit = { credentials: "include", headers: { "Content-Type": "application/json" } }
): Promise<T> {
    const response = await fetch(`${baseUrl}/${endpoint}`, options);

    if(response.status === 401){
        alert("Unauthorized");
        window.location.href = loginRoute;
        return {} as T;
    }

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
    }
    
    return response.json();
}