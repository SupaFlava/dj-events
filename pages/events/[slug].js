import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function EventPage({ evt }) {
  return (
    <Layout>
      <h1>My Event</h1>
      <div className={styles.event}>
        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={
                evt.image.data
                  ? evt.image.attributes.formats.small.url
                  : "/images/event-default.png"
              }
              width={1920}
              height={1005}
              alt={evt.name}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(
    `${API_URL}/events?filters[slug]=${slug}&populate=%2A`
  );
  const events = await res.json();
  const evt = events.data.find((item) => item.attributes.slug == slug);

  return {
    props: {
      evt,
    },
  };
}
