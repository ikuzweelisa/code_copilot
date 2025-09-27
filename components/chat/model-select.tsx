"use client";
import { models, type Model } from "~/lib/ai/models";
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

interface ModelSelectorProps {
  selectedModel: Model | null;
  onModelSelect: React.Dispatch<React.SetStateAction<Model>>;
}

export function ModelSelector({
  selectedModel,
  onModelSelect,
}: ModelSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const matchesSearch =
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.provider.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  const handleModelSelect = (model: Model) => {
    onModelSelect(model);
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full max-w-xs justify-between h-auto p-1.5 focus-within:bg-transparent bg-none outline-none border-none shadow-none"
          onClick={() => setOpen(!open)}
        >
          {selectedModel && (
            <div key={selectedModel.id} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <selectedModel.icon size={28} />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="font-medium text-sm">{selectedModel.name}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                  <span className="text-xs text-muted-foreground">
                    {selectedModel.provider.name}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[400px] p-0" align="start">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10  outline-0 border-0 shadow-none  focus:border-0 focus:outline-0 focus-within:border-0 focus-within:outline-none "
            />
          </div>
        </div>

        <ScrollArea className="h-[300px] overflow-auto">
          <div className="p-2">
            {filteredModels.length > 0 ? (
              filteredModels.map((model) => (
                <div
                  key={model.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedModel?.id === model.id ? "bg-muted/30" : ""
                  }`}
                  onClick={() => handleModelSelect(model)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${model.name} from ${model.provider.name}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleModelSelect(model);
                    }
                  }}
                >
                  <div className="flex-shrink-0">
                    <model.icon size={26} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{model.name}</div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                      <model.provider.icon size={6} />
                      <p className="line-clamp-2">{model.provider.name}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No models found matching your search.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
