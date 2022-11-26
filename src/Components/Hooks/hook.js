import { defaults } from "autoprefixer"
import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Spark Photography`
    }, [title])
}

export default useTitle