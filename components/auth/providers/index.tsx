import Provider from "@/components/auth/providers/provider";

export default function Providers() {
  return (
    <div className="flex flex-col w-full gap-2">
      <Provider name={"google"} />
      <Provider name="github" />
    </div>
  );
}
