import React from "react";
import { Button } from "./ui/button";

// components/PricingBanner.tsx
export const PricingBanner = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Try our one-time demo for free. Upgrade for unlimited code generation.
      </p>
      <Button variant="ghost" size="sm">
        Upgrade to Pro
      </Button>
    </div>
  </div>
);