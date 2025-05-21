<script setup lang="ts" generic="TApi extends Record<string, Function>">
import AppForm, { AppFormProps } from "@/app/appform";
import {
  AuthLoginProviderRequest,
  AuthLoginRequest,
  AuthLoginResponse,
} from "@/pkg/types/api_types";
import { AuthHandler } from "@/pkg/types/types";
import { resolveApiEndpoint } from "devkit-apiclient";
import { AppBtn } from "devkit-base-components";
import { inject, onMounted } from "vue";

const authHandler = inject<AuthHandler<TApi>>("authHandler");
const apiClient = inject<TApi>("apiClient");
const removeTimestamps = (key: string, value: any) => {
  const timestampKeys = ["createdAt", "updatedAt", "deletedAt"];
  if (timestampKeys.includes(key)) {
    return undefined; // omit this key from the final JSON
  }

  // Handle BigInt safely too
  if (typeof value === "bigint") {
    return value.toString(); // or undefined if you want to remove BigInts too
  }

  return value;
};
const loginCallback = (response: AuthLoginResponse) => {
  if (response.navigationBar)
    localStorage.setItem("sidebar", JSON.stringify(response.navigationBar));
  // 2. Cache the access token
  if (response.loginInfo) {
    localStorage.setItem("token", response.loginInfo.accessToken);
  }
  // 3. Cache the user info
  if (response.user) {
    localStorage.setItem(
      "user_info",
      JSON.stringify(response.user, removeTimestamps),
    );
  }
};
const loginFormProps: AppFormProps<
  TApi,
  AuthLoginRequest,
  AuthLoginRequest,
  AuthLoginResponse
> = {
  context: {
    title: "login",
    formKey: "login",
    options: {
      successMessageSummary: "logged in",
    },
    submitHandler: {
      endpoint: authHandler ? authHandler.login : "",
      redirectRoute: {
        path: "/",
      },
      callback: loginCallback,
    },
    sections: {
      login: {
        inputs: [
          {
            $formkit: "text",
            prefixIcon: "tools",
            outerClass: "col-12 sm:col-6 md:col-5",
            name: "loginCode",
            validation: "required",
            placeholder: "user name",
            label: "userName",
          },
          {
            $formkit: "text",
            prefixIcon: "tools",
            outerClass: "col-12 sm:col-6 md:col-5",
            name: "userPassword",
            validation: "required",
            placeholder: "password",
            label: "password",
          },
        ],
      },
    },
  },
};
onMounted(() => {
  if (!authHandler) return;
  const hash = window.location.hash.substring(1); // remove the leading '#'
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");
  if (accessToken) {
    if (authHandler.providerLoginCallback) {
      resolveApiEndpoint(authHandler.providerLoginCallback, apiClient, {
        accessToken,
      }).then(loginCallback);
    }
  }
  console.log("routequery is", accessToken);
  console.log("mounted changed");
});

const providerLogin = async (provider: string) => {
  if (!authHandler?.providerLogin) return;
  const request: AuthLoginProviderRequest = {
    provider,
    redirectUrl: authHandler.redirectRoute || "/",
  };
  const { url } = await resolveApiEndpoint(
    authHandler.providerLogin,
    apiClient,
    request,
  );

  window.open(url, "_blank");
};
</script>
<template>
  <h2>hello authHandler {{ authHandler }}</h2>
  <Message v-if="!authHandler" severity="error">{{
    $t("provide auth handler")
  }}</Message>
  <AppForm :context="loginFormProps.context" />
  <AppBtn
    icon="google"
    label="login by google"
    :action="() => providerLogin('google')"
  />
  <!-- <AppForm :context="formProps.context" /> -->
  <!-- <FileManager /> -->
</template>
