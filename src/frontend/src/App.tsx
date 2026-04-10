import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { SOSProvider } from "./context/SOSContext";

// Lazy page imports
const Home = lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.Home })),
);
const Alerts = lazy(() =>
  import("./pages/Alerts").then((m) => ({ default: m.Alerts })),
);
const SafePlaces = lazy(() =>
  import("./pages/SafePlaces").then((m) => ({ default: m.SafePlaces })),
);
const Resources = lazy(() =>
  import("./pages/Resources").then((m) => ({ default: m.Resources })),
);
const SafetyTips = lazy(() =>
  import("./pages/SafetyTips").then((m) => ({ default: m.SafetyTips })),
);
const About = lazy(() =>
  import("./pages/About").then((m) => ({ default: m.About })),
);
const Contact = lazy(() =>
  import("./pages/Contact").then((m) => ({ default: m.Contact })),
);

function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// Root route with Layout + SOSProvider
const rootRoute = createRootRoute({
  component: () => (
    <SOSProvider>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Layout>
    </SOSProvider>
  ),
});

import { Outlet } from "@tanstack/react-router";

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const alertsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/alerts",
  component: Alerts,
});
const safePlacesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/safe-places",
  component: SafePlaces,
});
const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resources",
  component: Resources,
});
const safetyTipsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/safety-tips",
  component: SafetyTips,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  alertsRoute,
  safePlacesRoute,
  resourcesRoute,
  safetyTipsRoute,
  aboutRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
