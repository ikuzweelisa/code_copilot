import { useSession } from "~/lib/auth/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function Personalization() {
  const { data } = useSession();
  return (
    <div className="h-full">
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="flex items-center space-x-4 space-y-2">
          <Avatar className="w-16 h-16 border-2 border-border">
            <AvatarImage src="/placeholder.svg" alt="user" />
            <AvatarFallback className="bg-muted text-xl font-bold">
              {data?.user?.name.split(" ")[0][0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="font-medium">{data?.user?.name}</p>
            <p className="text-sm text-muted-foreground">{data?.user?.email}</p>
          </div>
        </div>
      </section>

      <div className="h-px bg-border w-full mt-2" />

      {/* Customization Section */}
      <section className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Customize Your Experience</h2>
          <p className="text-sm text-muted-foreground">
            Tell us a bit about yourself to personalize your chat experience.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              What should we call you?
            </Label>
            <div className="relative">
              <Input
                id="name"
                placeholder="Enter your name"
                className="bg-transparent border-border pr-12 focus-visible:ring-1 focus-visible:ring-ring"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                {1}/50
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-medium">
              What do you do?
            </Label>
            <div className="relative">
              <Input
                id="role"
                placeholder="Engineer, student, etc."
                className="bg-transparent border-border pr-12 focus-visible:ring-1 focus-visible:ring-ring"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                {4}/100
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="about" className="text-sm font-medium">
              Anything else we should know about you?
            </Label>
            <Textarea
              id="about"
              rows={3}
              placeholder="Interests, values, or preferences to keep in mind"
              className="bg-transparent border-border focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
          </div>
          <Button>
            Save Preferences
          </Button>
        </div>
      </section>
    </div>
  );
}
