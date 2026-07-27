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
        title="Agua mineral de Tehuacán con tu propia marca"
        description="MOG México embotella agua mineral de Tehuacán, Puebla, con tu marca. Marca propia, mejora de formulación y diversidad de envases y tapas, también para otras bebidas."
        path="/"
        jsonLd={organizationJsonLd}
      />
      <Hero />
      <ServicesStrip />
      <StatementBand />
      <ProcessPreview />
      <CapabilitiesBlock />
      <TrustStrip />
      <WaveDivider nextColor="#07232C" className="bg-foam" />
      <CtaBand />
    </>
  );
}
