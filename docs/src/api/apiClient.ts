import { createClient } from "@connectrpc/connect";
import { AuthInterceptor } from 'devkit-apiclient'
import { createConnectTransport } from "@connectrpc/connect-web";
import { DevkitService } from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/devkit_service_pb"
// const interceptor: Interceptor = (next) => async (req) => {
//   try {
//     const token = localStorage.getItem("token") as string
//     req.header.append("Authorization", `bearer ${token}`)
//     const response = await next(req);
//     return response
//   } catch (error: any) {
//     const err: any = {
//       globalErrors: [],
//       fieldErrors: {}
//     }
//     if (error.code == Code.AlreadyExists) {
//       err.fieldErrors[error.rawMessage] = `${error.rawMessage}Unique`
//       throw new Error(JSON.stringify(err));
//     }


//     console.log("rowmessageis", error.rawMessage)
//     err.globalErrors = [`${error.rawMessage}`]
//     const errStr = JSON.stringify(err)

//     const errTOReturn = new Error(errStr)

//     console.log("rowmessageis", errTOReturn)
//     throw errTOReturn;

//   }
// }
const transport = createConnectTransport({
  baseUrl: import.meta.env.VITE_API_URL,
  interceptors: [AuthInterceptor('token')],
  useHttpGet: true,
});

export const apiClient = createClient(DevkitService, transport);

