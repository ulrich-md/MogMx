import { Seo, organizationJsonLd } from "@/lib/seo";
import { Hero } from "@/components/hero/Hero";
import { ServicesStrip } from "@/components/sections/ServicesStrip";
import { StatementBand } from "@/components/sections/StatementBand";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { CapabilitiesBlock } from "@/components/sections/CapabilitiesBlock";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CtaBand } from "@/components/sections/CtaBand";
import { WaveDivider } from "@/components/ui/WaveDivider";

export default function Home() {
  return (
    <>
      <Seo
        title="Maquila y embotellado de agua mineral en Tehuacán"
        description="MOG México: maquila, embotellado y marca privada de agua mineral y purificada en Tehuacán, Puebla. Producimos tu marca de agua de principio a fin."
        path="/"
        jsonLd={organizationJsonLd}
      />
      <Hero />
      <ServicesStrip />
      <StatementBand />
      <ProcessPreview />
      <CapabilitiesBlock />
      <TrustStrip />
      <WaveDivider nextColor="#0E2A47" className="bg-foam" />
      <CtaBand />
    </>
  );
}
