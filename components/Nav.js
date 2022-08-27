import Link from "next";
import { useRouter } from "next/router";

import {
  Button,
  Flex,
  Menu,
  MenuItem,
  MenuButton,
  Divider,
  useAuthenticator,
} from "@aws-amplify/ui-react";

export default function Nav() {
  const router = useRouter();
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
        gap="1rem"
        width="80%"
      >
        <Link href="/">CompanyName</Link>

        <Flex alignItems="center">
          <Link href="/pricing">Pricing</Link>

          {user && (
            <Menu
              menuAlign="end"
              trigger={
                <MenuButton variation="menu">
                  {user.attributes.email}
                </MenuButton>
              }
            >
              <MenuItem onClick={() => router.push("/settings")}>
                Settings
              </MenuItem>
              <MenuItem>Action 1</MenuItem>
              <Divider />
              <MenuItem isDisabled>Action 2</MenuItem>
              <MenuItem onClick={signOut}>Sign out</MenuItem>
            </Menu>
          )}
          {!user && (
            <Button
              onClick={() => router.push(`/login?ref=${router.pathname}`)}
              size="small"
              variation="primary"
            >
              Login
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  );
}
