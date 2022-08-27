// /pages/settings.js

import { useEffect } from "react";
import { useRouter } from "next/router";
import { withSSRContext } from "aws-amplify";
import {
  useAuthenticator,
  Heading,
  View
} from "@aws-amplify/ui-react";

// we'll create this below
import Nav from "../components/Nav";

export async function getServerSideProps({ req }) {
  const { Auth } = withSSRContext({ req });

  let user;

  try {
    user = await Auth.currentAuthenticatedUser();
  } catch (err) {}

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: `/login`,
      },
    };
  }

  return { props: {} };
}


export default function Settings() {
  const { user, authStatus } = useAuthenticator((context) => [context.route]);
  const router = useRouter();

  useEffect(() => {
    if (
      authStatus &&
      authStatus !== "authenticated" &&
      authStatus !== "configuring"
    ) {
      router.push("/login");
    }
  }, [authStatus]);


  return (
    <View padding="2rem" align="center">
      <Nav />

      <View marginTop="4rem">
        {user && authStatus === "authenticated" && (
          <main>
            <View width="80%" align="left">
              <Heading level={3}>Hey, {user?.attributes.email} 👋</Heading>
            </View>
          </main>
        )}
      </View>
    </View>
  );