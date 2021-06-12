import { useQuery } from "react-query"
import { Api } from "./Api";

export default function useAuth(){
    const {data: auth, isLoading, error} = useQuery("auth", () => Api.get("/auth"))

    return {auth, isLoading, error}
    
}