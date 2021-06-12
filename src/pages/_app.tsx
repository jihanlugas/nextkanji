import './styles/global.scss'
import type { AppProps } from 'next/app'
import { AppContextProvider } from "../stores/appContext"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

function MyApp({ Component, pageProps }: AppProps) {

    const queryClient = new QueryClient();

    return (
        <AppContextProvider>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </AppContextProvider>
    )
}
export default MyApp
