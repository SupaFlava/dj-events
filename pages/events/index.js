import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const query = qs.stringify({
    sort: ["date:asc"],
    populate: "*",
    pagination: {
      pageSize: PER_PAGE,
      page: +page,
    },
  });

  const res = await fetch(`${API_URL}/api/events?${query}`);
  const events = await res.json();

  return {
    props: {
      events: events.data,
      page: +page,
      total: events.meta.pagination.total,
    },
  };
}
