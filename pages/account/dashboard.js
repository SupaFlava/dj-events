import DashboardEvent from "@/components/DashboardEvent";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import styles from "@/styles/Dashboard.module.css";
import { useRouter } from "next/router";

const DashboardPage = ({ events, token }) => {
  const router = useRouter();
  const { data } = events.data.attributes;

  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) toast.error(data ? data.message : "Something Went Wrong!");
      else router.reload();
    }
  };

  return (
    <Layout>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {data.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/account/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {import 'react-toastify/dist/ReactToastify.css'
import styles from '@/styles/AuthForm.module.css'
import Layout from '@/components/Layout'
import { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import AuthContext from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error } = useContext(AuthContext)

  useEffect(() => {
    error && toast.error(error)
  })

  const handleSubmit = async e => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <Layout title='User Login'>
      <ToastContainer theme='colored' />
      <div className={styles.auth}>
        <h1>
          <Image src='/images/icon/user.png' height={32} width={32} alt='login' />
          <span>Log In</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id='email' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <input type="submit" value="Login" className='btn' />
          <p>
            Dont Have an account?
            <Link href='/account/register'> Register</Link>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default LoginPage
      events,
      token,
    },
  };
}
