import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { toast } from "sonner";

import { trpc } from "~/lib/backend/trpc/client";
import { customizationSchema } from "~/lib/types/schema";

import { Button } from "../ui/button";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function Customization() {
  const { data } = trpc.user.getUserPreferences.useQuery();
  const form = useForm({
    defaultValues: {
      name: data?.nickName || "",
      occupation: data?.occupation || "",
      bio: data?.bio || "",
      customInstructions: data?.customInstructions || "",
    },
    validators: {
      onSubmit: customizationSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });
  const { mutate, isPending, isError, isSuccess } = trpc.user.saveUserPreferences.useMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: "Your preferences have been saved",
      });
    }
    if (isError) {
      toast.error("Error", {
        description: "Something went wrong",
      });
    }
  }, [isSuccess, isError]);
  return (
    <section className="space-y-2">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Customize Your Experience</h2>
        <p className="text-sm text-muted-foreground">
          Tell us a bit about yourself to personalize your chat experience.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
        className="space-y-2"
      >
        <form.Field name="name">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="space-y-2">
                <FieldLabel htmlFor={field.name}>What should we call you?</FieldLabel>
                <div className="relative">
                  <Input
                    id="name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    name={field.name}
                    placeholder="Enter your nick name"
                    className="border-border bg-transparent pr-12 focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
                    {field.state.value.length}/100
                  </span>
                </div>
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="occupation">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="space-y-2">
                <FieldLabel htmlFor={field.name}>What do you do?</FieldLabel>
                <div className="relative">
                  <Input
                    id="occupation"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    name={field.name}
                    placeholder="Developer, Designer, Student, etc."
                    className="border-border bg-transparent pr-12 focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
                    {field.state.value.length}/100
                  </span>
                </div>
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="bio">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="space-y-2">
                <FieldLabel htmlFor={field.name}>Tell us about yourself</FieldLabel>
                <div className="relative">
                  <Textarea
                    id="bio"
                    rows={3}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    name={field.name}
                    placeholder="Interests, values, or preferences to keep in mind"
                    className="border-border bg-transparent pr-12 focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
                    {field.state.value.length}/500
                  </span>
                </div>
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="customInstructions">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid} className="space-y-2">
                <FieldLabel htmlFor={field.name}>Custom Instructions</FieldLabel>
                <div className="relative">
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    name={field.name}
                    rows={3}
                    placeholder="Don't say you are absolutely right, don't use emojis"
                    className="border-border bg-transparent pr-12 focus-visible:ring-1 focus-visible:ring-ring"
                  />
                  <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
                    {field.state.value.length}/500
                  </span>
                </div>
              </Field>
            );
          }}
        </form.Field>
        <Button disabled={isPending}>{isPending ? "Saving..." : "Save Preferences"}</Button>
      </form>
    </section>
  );
}
