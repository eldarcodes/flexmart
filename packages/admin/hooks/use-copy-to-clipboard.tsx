import { useCallback, useState } from "react";

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

interface CopyToClipboardConfig {
  delay?: number;
}

interface UseCopyToClipboardResult {
  copiedText: CopiedValue;
  copy: CopyFn;
  isCopied: boolean;
}

export function useCopyToClipboard({
  delay = 2000,
}: CopyToClipboardConfig = {}): UseCopyToClipboardResult {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copy: CopyFn = useCallback(
    async (text) => {
      if (!navigator?.clipboard) {
        console.warn("Clipboard not supported");
        return false;
      }

      // Try to save to clipboard then save it in the state if worked
      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        setIsCopied(true);

        // Reset isCopied after 3 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, delay);

        return true;
      } catch (error) {
        console.warn("Copy failed", error);
        setCopiedText(null);
        setIsCopied(false);
        return false;
      }
    },
    [delay]
  );

  return {
    copiedText,
    copy,
    isCopied,
  };
}
