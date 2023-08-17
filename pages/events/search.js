import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import qs from "qs";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Result">
      <Link href="/events">Go Back</Link>
      <h1>Search Results {router.query.term}</h1>
      {events.length === 0 && <h3>No events for now ...</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        { name: { $contains: term } },
        { venue: { $contains: term } },
        { performers: { $contains: term } },
        { description: { $contains: term } },
      ],
    },
  });

  const res = await fetch(`${API_URL}/api/events?${query}&populate=%2A`);
  const events = await res.json();

  return {
    props: {
      events: events.data,
    },
  };
}
