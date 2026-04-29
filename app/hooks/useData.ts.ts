import { useRouter } from "next/navigation";
import { useResetContext } from "@/app/hooks/resetContext";
import React, { useState, useEffect, useRef } from "react";
import { handleApiError } from "@/app/utils";
import { Alert } from "@/app/components/utils";

interface UseDataOptions {
  skip?: boolean;
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
    const isFirstRender = useRef(true)

    useEffect(() => {
        // Clear stale data when deps change (except on first render)
        if (!isFirstRender.current) {
            setData(null)
        }
        isFirstRender.current = false

        if (options?.skip) return

        setIsLoading(true)

        fetcher()
            .then(data => setData(data))
            .catch(err => {
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
            .finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    return { data, isLoading, error }
}