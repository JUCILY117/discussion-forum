import { useEffect, useRef, useState } from "react";

export function useAvailabilityCheck({
  value,
  checkFn,
  minLength = 3,
  delay = 600,
}) {
  const [status, setStatus] = useState("idle");
  const debounceRef = useRef(null);

  useEffect(() => {
    const normalized = value?.trim().toLowerCase();

    if (!normalized || normalized.length < minLength) {
      setStatus("idle");
      return;
    }

    setStatus("checking");

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await checkFn(normalized).unwrap();
        setStatus(res.available ? "available" : "taken");
      } catch {
        setStatus("idle");
      }
    }, delay);

    return () => clearTimeout(debounceRef.current);
  }, [value, checkFn, minLength, delay]);

  return status;
}
