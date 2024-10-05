import { Outlet } from "@remix-run/react";
import { useMantineTheme } from "@mantine/core";

/**
 * _publicパス下共通layout
 */
export default function Index() {
  const theme = useMantineTheme();

  return (
    <main
      style={{
        height: "100%",
        backgroundColor: theme.colors.bodyColor[theme.primaryShade as number],
        color: theme.colors.textColor[theme.primaryShade as number],
      }}
    >
      <Outlet />
    </main>
  );
}
