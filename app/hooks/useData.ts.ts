import { useRouter } from "next/navigation";
import { useResetContext } from "@/app/hooks/resetContext";
import React, { useState, useEffect } from "react";
import { handleApiError } from "@/app/utils";
import { Alert } from "@/app/components/utils";

interface UseDataOptions {
  skip?: boolean;
  keepPreviousData?: boolean;  // Option to prevent flash
}

export const useData = <T,>(
  fetcher: () => Promise<T>,
  deps: React.DependencyList = [],
  options?: UseDataOptions
) => {
    const router = useRouter()
    const { resetAllContext } = useResetContext()

    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        // Skip early to avoid unnecessary state updates
        if (options?.skip) {
            // Only clear data if not keeping previous data
            if (!options.keepPreviousData && data !== null) {
                setData(null)
            }
            return
        }

        // Clear stale data unless keeping previous data
        if (!options?.keepPreviousData) {
            setData(null)
        }

        // Create AbortController for request cancellation
        const controller = new AbortController()

        setIsLoading(true)
        setError(null)  // Clear previous errors

        fetcher()
            .then(newData => {
                // Only update if request wasn't aborted
                if (!controller.signal.aborted) {
                    setData(newData)
                }
            })
            .catch(err => {
                // Ignore abort errors
                if (err.name === 'AbortError' || controller.signal.aborted) {
                    return
                }

                setError(err)
                handleApiError(err, router, resetAllContext)

                // Show error toast for non-auth errors
                if (err.message !== 'Unauthorized') {
                  void Alert({
                    title: 'Error',
                    text: err.message,
                    icon: 'error',
                    toast: true
                  })
                }
            })
            .finally(() => {
                // Only update loading if not aborted
                if (!controller.signal.aborted) {
                    setIsLoading(false)
                }
            })

        // Cleanup: abort request when deps change or component unmounts
        return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    return { data, isLoading, error }
}