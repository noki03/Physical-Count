import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BayFormProps {
  bayCode: string;
  error: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const BayForm: React.FC<BayFormProps> = ({
  bayCode,
  error,
  isLoading,
  onChange,
  onSubmit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col space-y-4 mt-2">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Enter or scan Bay code"
        value={bayCode}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={onSubmit} className="w-full" disabled={isLoading}>
        {isLoading ? "Collecting..." : "Collect Bay"}
      </Button>
    </div>
  );
};
