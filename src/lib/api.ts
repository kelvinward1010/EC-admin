import axios from "axios";

import storage, { storageRefreshToken } from "@/utils/storage";
import { BASE_URL, URL_API_REFRESHTOKEN } from "@/constant";

export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 60 * 30 * 3, // 90 minutes
});

apiClient.interceptors.request.use(
    function (config) {
        config.headers.Authorization = "Bearer " + storage.getToken();
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Trong interceptor
apiClient.interceptors.response.use(
    function (response) {
        // Xử lý phản hồi thành công
        return response;
    },
    async function (error) {
        if (error?.response?.status === 401) {
            try {
                // Gọi API để lấy token mới
                const refreshtoken = storageRefreshToken.getToken();

                const draftData = {
                    refresh_token: refreshtoken,
                };
                const refreshTokenResponse = await apiClient.post(
                    `${URL_API_REFRESHTOKEN}`,
                    draftData,
                );

                const newToken = refreshTokenResponse.data?.access_token;

                // Lưu token mới vào local storage
                storage.setToken(newToken);

                // Thử gửi lại yêu cầu ban đầu với token mới
                const originalRequest = error.config;
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                return Promise.reject(error);
            }
        } else if (error?.response?.status === 404) {
            return error?.response;
        }
        return Promise.reject(error);
    },
);
