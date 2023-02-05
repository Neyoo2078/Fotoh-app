import sanityClient from "@sanity/client"
import imageUrlBiulder from "@sanity/image-url"

export const client = sanityClient({
    projectId:import.meta.env.VITE_PROJECT_ID,
    dataset:"production",
    apiVersion:"2021-11-16",
    useCdn:true,
    token:import.meta.env.VITE_API_KEY})

const builder = imageUrlBiulder(client);

export const urlFor =(source)=> builder.image(source);