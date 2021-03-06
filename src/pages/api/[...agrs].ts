import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware('/api', {
    // target: "http://localhost:8010",
    target: "https://kanjiapi.dev/v1",
    changeOrigin: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    pathRewrite: {
        '^/api': ''
    },
});

export const config = {
    api: {
        bodyParser: false
    }
}