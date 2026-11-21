import { site } from "@/lib/site";

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <h1>{site.name.he}</h1>
      <p>{site.tagline.he}</p>
      <p lang="en" dir="ltr">
        {site.name.en}: {site.tagline.en}
      </p>
    </main>
  );
}
