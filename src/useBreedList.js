import {
    useQuery
} from "@tanstack/react-query"
import fetchBreedList from "./fetchBreedList"


export default function useBreedList(animal) {
    const results = useQuery(["breeds", animal], fetchBreedList)

    // Si je n'ai aps de resultats pour ce fetch => donne moi un tableau vide.

     
    return [results?.data?.breeds ?? [], results.status]; // prettier-ignore  
    
}