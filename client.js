// client.js
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "du10ux2s",
  dataset: "production",
  apiVersion: "2023-01-14",
  useCdn: false,
});

export default client;
