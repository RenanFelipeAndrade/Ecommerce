import sanityClient from "@sanity/client";
import imageUrlBulder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = sanityClient({
  projectId: "ekbzdif5",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBulder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
