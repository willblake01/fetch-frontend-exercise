import { useRouter } from "next/navigation";
import { useResetContext } from "@/app/hooks/resetContext";
import { useState } from "react";

export const useData = (
    fetcher: () => Promise<T>,
    deps: any[],
    options?: { skip?: boolean }
) => {
    const router = useRouter()
    const { resetAllContext } = useResetContext()

    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {

    })
}