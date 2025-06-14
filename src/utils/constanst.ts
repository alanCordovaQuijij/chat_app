const SERVER_IP = "192.168.0.109:3000" //casa
//const SERVER_IP = "192.168.20.203:3000"


export const ENV = {
    SERVER_IP: SERVER_IP,
    BASE_PATH: `http://${SERVER_IP}`,
    API_URL: `http://${SERVER_IP}/api`,
    SOCKET_URL: `http://${SERVER_IP}`,
    ENDPOINT: {
        AUTH: {
            REGISTER: "/auth/register",
            LOGIN: "/auth/login",
            REFRESH_ACCESS_TOKEN: "/auth/refresh_access_token"
        },
        ME: "/user/me",
        USER: "/user",
        CHAT: "/chat",
        CHAT_MESSAGE_LAST: "/chat/message/last",
        CHAT_MESSAGE_TOTAL: "/chat/message/total"
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh"
    },
    ACTIVE_CHAT_ID: "active_chat_id"
}