# ConversationControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**create**](ConversationControllerApi.md#create) | **POST** /conversations |  |
| [**createMessage**](ConversationControllerApi.md#createmessage) | **POST** /conversations/{conversationId}/messages |  |
| [**findForConnectedUser**](ConversationControllerApi.md#findforconnecteduser) | **GET** /conversations |  |
| [**findMessagesByConversationId**](ConversationControllerApi.md#findmessagesbyconversationid) | **GET** /conversations/{conversationId}/messages |  |



## create

> ConversationResponse create(conversationRequest)



### Example

```ts
import {
  Configuration,
  ConversationControllerApi,
} from '';
import type { CreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ConversationControllerApi();

  const body = {
    // ConversationRequest
    conversationRequest: ...,
  } satisfies CreateRequest;

  try {
    const data = await api.create(body);
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
| **conversationRequest** | [ConversationRequest](ConversationRequest.md) |  | |

### Return type

[**ConversationResponse**](ConversationResponse.md)

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


## createMessage

> MessageResponse createMessage(conversationId, messageRequest)



### Example

```ts
import {
  Configuration,
  ConversationControllerApi,
} from '';
import type { CreateMessageRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ConversationControllerApi();

  const body = {
    // number
    conversationId: 789,
    // MessageRequest
    messageRequest: ...,
  } satisfies CreateMessageRequest;

  try {
    const data = await api.createMessage(body);
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
| **conversationId** | `number` |  | [Defaults to `undefined`] |
| **messageRequest** | [MessageRequest](MessageRequest.md) |  | |

### Return type

[**MessageResponse**](MessageResponse.md)

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


## findForConnectedUser

> Array&lt;ConversationResponse&gt; findForConnectedUser()



### Example

```ts
import {
  Configuration,
  ConversationControllerApi,
} from '';
import type { FindForConnectedUserRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ConversationControllerApi();

  try {
    const data = await api.findForConnectedUser();
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

[**Array&lt;ConversationResponse&gt;**](ConversationResponse.md)

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


## findMessagesByConversationId

> Array&lt;MessageResponse&gt; findMessagesByConversationId(conversationId)



### Example

```ts
import {
  Configuration,
  ConversationControllerApi,
} from '';
import type { FindMessagesByConversationIdRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ConversationControllerApi();

  const body = {
    // number
    conversationId: 789,
  } satisfies FindMessagesByConversationIdRequest;

  try {
    const data = await api.findMessagesByConversationId(body);
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
| **conversationId** | `number` |  | [Defaults to `undefined`] |

### Return type

[**Array&lt;MessageResponse&gt;**](MessageResponse.md)

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

