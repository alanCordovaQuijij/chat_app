import axios from "axios";
import { ENV } from "../utils/constanst";
import { Auth } from "./auth/auth";
import { MMKV } from "react-native-mmkv";
const storage = new MMKV()



const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const PUBLIC_ROUTES = [ENV.ENDPOINT.AUTH.REGISTER, ENV.ENDPOINT.AUTH.LOGIN, ENV.ENDPOINT.AUTH.REFRESH_ACCESS_TOKEN]
//const authController = new Auth();


// 🔐 Interceptor de solicitud para agregar token
api.interceptors.request.use(
  async config => {
    // o 'token', según cómo lo guardas
    //const token = await authController.getAccessToken();
    const token =  storage.getString(ENV.JWT.ACCESS)

    // No agregar token a rutas públicas
    const isPublicRoute = PUBLIC_ROUTES.some(route => config.url?.includes(route))

    if (token && !isPublicRoute) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // 🔧 CORRECCIÓN: Manejo de FormData mejorado
      if (config.data instanceof FormData) {
        // Eliminar Content-Type para que axios lo configure automáticamente
        delete config.headers['Content-Type'];
        delete config.headers['content-type'];
        
        config.headers['Content-Type'] = 'multipart/form-data';

      }
    return config
  },
  error => Promise.reject(error)
)


// 🔴 Interceptor de respuesta para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { data } = error.response;
      // ✅ Asume que el backend siempre devuelve { message: '...' }
      return Promise.reject(new Error(data?.message || 'Ocurrió un error'));
    }

    // ⚠️ Caso: no hay respuesta del servidor (por ejemplo, sin internet)
    return Promise.reject(new Error('Error de red o servidor no disponible'));
  }
);


export default api;
