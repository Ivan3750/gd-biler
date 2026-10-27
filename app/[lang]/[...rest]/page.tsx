import { notFound } from "next/navigation";

// Any unknown URL under a language ends up here so it gets the site's own 404 page.
export default function CatchAll() {
  notFound();
}
