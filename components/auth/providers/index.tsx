import Provider from "@/components/auth/providers/provider";

export default function Providers() {
  return (
    <div className="flex flex-col w-full gap-3">
      <Provider name={"google"} />
      <Provider name="github" />
    </div>
  );
}
