import { axiosRequest } from "../api/axiosDefaults"

export const fetchMoreData = async (resource, setResource) => {
    try {
        const {data} = await axiosRequest.get(resource.next)
        setResource(prevResource => ({
            ...prevResource,
            next: data.next,
            // 
            results: data.results.reduce((acc, curr) => {
                return acc.some(accResult => accResult.id === curr.id)
                    ? acc
                    : [...acc, curr];
            }, prevResource.results)
        }))
    } catch (err) {

    }
}