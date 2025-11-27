import { GetServerSideProps } from "next"
import { redirect } from "next/dist/server/api-utils"
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie;
  if (!cookies) {
    return { redirect: { destination: '/auth/login', permanent: false } };
  }

  const parsed = cookie.parse(cookies);
  const token = parsed.token;

  if (!token) {
    return { redirect: { destination: '/auth/login', permanent: false } };
  }

  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const id = context.params?.id;

    if (payload.sub !== Number(id)) {
      return { redirect: { destination: '/403', permanent: false } };
    }

    return { props: { userId: payload.sub } };
  } catch {
    return { redirect: { destination: '/auth/login', permanent: false } };
  }
};

export default function ProfilePage({userId}: {userId:string}) {
    return (
        <div>Профиль пользователя с ID: {userId}</div>
    )
}
