import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Process = lazy(() => import("./pages/Process"));
const Capabilities = lazy(() => import("./pages/Capabilities"));
const Resources = lazy(() => import("./pages/Resources"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageLoader() {
  return (
    <div
      className="grid min-h-[70vh] place-items-center"
      role="status"
      aria-label="Cargando"
    >
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-mist border-t-blue" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/servicios"
          element={
            <Suspense fallback={<PageLoader />}>
              <Services />
            </Suspense>
          }
        />
        <Route
          path="/proceso"
          element={
            <Suspense fallback={<PageLoader />}>
              <Process />
            </Suspense>
          }
        />
        <Route
          path="/capacidades"
          element={
            <Suspense fallback={<PageLoader />}>
              <Capabilities />
            </Suspense>
          }
        />
        <Route
          path="/recursos"
          element={
            <Suspense fallback={<PageLoader />}>
              <Resources />
            </Suspense>
          }
        />
        <Route
          path="/nosotros"
          element={
            <Suspense fallback={<PageLoader />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/contacto"
          element={
            <Suspense fallback={<PageLoader />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
