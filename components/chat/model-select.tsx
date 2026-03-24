"use client";
import cookies from "js-cookie";
import { Search, Filter, Star, Eye, Brain, FileText, Info, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import type { Model } from "~/lib/drizzle";

import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import { ModelIcons } from "~/lib/ai/models";
import { trpc } from "~/lib/backend/trpc/client";
import { modelTypes } from "~/lib/constants/models";
import { cn } from "~/lib/utils";

import { ModelSelectorSkelton } from "../skeletons";

export function ModelSelector() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "favorites" | (typeof modelTypes)[number]>(
    "all",
  );
  const [open, setOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model>();

  const { data: models, isLoading } = trpc.models.useQuery();

  useEffect(() => {
    if (selectedModel) {
      cookies.set("model.id", selectedModel.id, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    }
  }, [selectedModel]);

  useEffect(() => {
    if (models && !selectedModel) {
      const modelId = cookies.get("model.id");
      const cookieModel = modelId ? models.find((m) => m.id === modelId) : null;

      if (cookieModel) {
        setSelectedModel(cookieModel);
      } else {
        const defaultModel = models.find((m) => m.isDefault);
        if (defaultModel) setSelectedModel(defaultModel);
      }
    }
  }, [models, selectedModel]);

  const filteredModels = useMemo(() => {
    return models?.filter((model) => {
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab =
        selectedTab === "all" || selectedTab === "favorites" ? true : model.type === selectedTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, selectedTab, models]);

  const handleModelSelect = (model: Model) => {
    if (model.isPremium) return; // Prevent selection if premium, matching disabled state
    setSelectedModel(model);
    setOpen(false);
    setSearchQuery("");
  };

  const SelectedModelIcon = selectedModel ? ModelIcons[selectedModel.type] : null;

  const availableTypes = useMemo(() => {
    if (!models) return [];
    const typesSet = new Set(models.map((m) => m.type));
    return modelTypes.filter((t) => typesSet.has(t));
  }, [models]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={isLoading}>
        {isLoading ? (
          <ModelSelectorSkelton />
        ) : (
          <Button
            variant="outline"
            className="h-auto w-fit max-w-xs justify-between border-none bg-none p-1.5 shadow-none outline-hidden focus-within:bg-transparent"
            onClick={() => setOpen(!open)}
          >
            {selectedModel && (
              <div key={selectedModel.id} className="flex items-center space-x-3">
                <div className="shrink-0">
                  {SelectedModelIcon && <SelectedModelIcon size={28} />}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="text-sm font-medium">{selectedModel.name}</div>
                </div>
              </div>
            )}
          </Button>
        )}
      </PopoverTrigger>

      <PopoverContent
        className="flex h-[500px] w-[480px] flex-col overflow-hidden p-0"
        align="start"
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b bg-gradient-to-r from-background to-muted/10 px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold">Unlock all models</h3>
            </div>
            <Button variant="secondary" size="sm" className="h-8" asChild>
              <Link href="/pricing/upgrade">Upgrade</Link>
            </Button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 border-b p-3">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-full border-0 bg-transparent pl-9 text-sm outline-none placeholder:text-muted-foreground focus:ring-0"
              />
            </div>
            <Filter className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto border-b bg-muted/20 px-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              title="All Models"
              className={cn(
                "shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                selectedTab === "all" && "bg-muted text-foreground",
              )}
              onClick={() => setSelectedTab("all")}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              title="Favorites"
              className={cn(
                "shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                selectedTab === "favorites" && "bg-muted text-foreground",
              )}
              onClick={() => setSelectedTab("favorites")}
            >
              <Star size={18} className={cn(selectedTab === "favorites" && "fill-current")} />
            </button>

            <div className="mx-1 h-5 w-px shrink-0 bg-border" />

            {availableTypes.map((type) => {
              const Icon = ModelIcons[type];
              if (!Icon) return null;
              return (
                <button
                  key={type}
                  title={type.replace("_", " ")}
                  className={cn(
                    "shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    selectedTab === type && "bg-muted text-foreground",
                  )}
                  onClick={() => setSelectedTab(type)}
                >
                  <Icon size={18} />
                </button>
              );
            })}
          </div>

          {/* Model List */}
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-1 p-2">
              {filteredModels && filteredModels.length > 0 ? (
                filteredModels.map((model) => {
                  const Icon = ModelIcons[model.type];
                  const isSelected = selectedModel?.id === model.id;

                  return (
                    <button
                      type="button"
                      key={model.id}
                      className={cn(
                        "flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted/50",
                        isSelected && "bg-muted/40",
                        model.isPremium && "opacity-80",
                      )}
                      onClick={() => handleModelSelect(model)}
                      tabIndex={0}
                      aria-label={`Select ${model.name}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleModelSelect(model);
                        }
                      }}
                    >
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {Icon && (
                            <Icon
                              size={20}
                              className={cn("text-foreground", isSelected && "text-primary")}
                            />
                          )}
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-semibold">{model.name}</span>
                            <span
                              className={cn(
                                "text-xs font-medium tracking-wider",
                                model.isPremium ? "text-green-500/80" : "text-muted-foreground",
                              )}
                            >
                              {model.isPremium ? "$$$" : "Free"}
                            </span>
                            {model.isDefault && (
                              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            )}
                          </div>
                          <div className="mt-0.5 truncate text-xs text-muted-foreground">
                            {model.model}
                          </div>
                        </div>
                      </div>

                      <div className="ml-2 flex shrink-0 items-center gap-1.5 text-muted-foreground">
                        {model.meta?.reasoning && (
                          <div className="rounded bg-muted/40 p-1 text-purple-400">
                            <Brain className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  <p className="text-sm">No models found.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
