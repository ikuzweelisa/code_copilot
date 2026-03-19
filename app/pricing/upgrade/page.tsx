import { PricingCard } from "~/components/ui/pricing-card";

export default function page() {
  return (
    <div className="mx-auto max-w-7xl py-16">
      <div className="mb-16 space-y-4 text-center">
        <h2 className="text-2xl font-bold md:text-4xl">Simple, transparent pricing</h2>
        <p className="mx-auto max-w-2xl text-xl font-semibold text-muted-foreground">
          Choose the plan that's right for you and your team.
        </p>
      </div>

      <div className="mx-auto  grid max-w-5xl gap-8 md:grid-cols-3">
        <PricingCard
          slug="FREE"
          price="$0"
          description="Perfect for individuals just getting started with ai"
          features={["1000 tokens/month", "Up to 20 uploads"]}
        />
        <PricingCard
          slug="PRO"
          isPopular
          price="$5"
          description="Perfect for individuals just getting started with ai"
          features={["1000 tokens/month", "Up to 20 uploads"]}
        />
        <PricingCard
          slug="PRO_PLUS"
          price="$10"
          description="Perfect for individuals just getting started with ai"
          features={["1000 tokens/month", "Up to 20 uploads"]}
        />
      </div>
    </div>
  );
}
