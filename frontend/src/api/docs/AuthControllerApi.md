# AuthControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**login**](AuthControllerApi.md#loginoperation) | **POST** /auth/login | Authenticate a user and return a JWT token in an HTTP-only cookie |
| [**logout**](AuthControllerApi.md#logout) | **POST** /auth/logout | Logout a user by removing the JWT token from HTTP-only cookie |
| [**me**](AuthControllerApi.md#me) | **POST** /auth/me | Authenticate a user and return a JWT token in an HTTP-only cookie |
| [**signup**](AuthControllerApi.md#signup) | **POST** /auth/signup | Register a new user |



## login

> login(loginRequest)

Authenticate a user and return a JWT token in an HTTP-only cookie

### Example

```ts
import {
  Configuration,
  AuthControllerApi,
} from '';
import type { LoginOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthControllerApi();

  const body = {
    // LoginRequest
    loginRequest: ...,
  } satisfies LoginOperationRequest;

  try {
    const data = await api.login(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **loginRequest** | [LoginRequest](LoginRequest.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## logout

> logout()

Logout a user by removing the JWT token from HTTP-only cookie

### Example

```ts
import {
  Configuration,
  AuthControllerApi,
} from '';
import type { LogoutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthControllerApi();

  try {
    const data = await api.logout();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## me

> UserResponse me()

Authenticate a user and return a JWT token in an HTTP-only cookie

### Example

```ts
import {
  Configuration,
  AuthControllerApi,
} from '';
import type { MeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthControllerApi();

  try {
    const data = await api.me();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**UserResponse**](UserResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## signup

> UserResponse signup(loginRequest)

Register a new user

### Example

```ts
import {
  Configuration,
  AuthControllerApi,
} from '';
import type { SignupRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuthControllerApi();

  const body = {
    // LoginRequest
    loginRequest: ...,
  } satisfies SignupRequest;

  try {
    const data = await api.signup(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **loginRequest** | [LoginRequest](LoginRequest.md) |  | |

### Return type

[**UserResponse**](UserResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

