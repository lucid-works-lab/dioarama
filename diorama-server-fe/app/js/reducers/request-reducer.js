import { ActionType } from '../actions';
import { fromJS } from 'immutable'

const initialMocks =[
    {
        "index": 3,
        "method": "POST",
        "mockId": "submit",
        "requestBody": "{\"applicant\":{\"dateOfBirth\":\"1946-01-10\",\"accountType\":\"CAS\",\"address\":{\"addressLine1\":\"888 DISNEY RD\",\"addressLine3\":\"\",\"city\":\"CALGARY\",\"countryCode\":\"CAN\",\"countryName\":\"Canada\",\"postalCode\":\"T4N3N2\",\"stateCode\":\"AB\"},\"annualGrossIncome\":\"100000\",\"emailAddress\":{\"emailAddress\":\"mickey.mouse@test.com\",\"emailAddressType\":\"pref\"},\"employmentStatus\":\"RET\",\"firstName\":\"MICKEY\",\"lastName\":\"MOUSE\",\"monthOfEmployment\":0,\"monthlyHousingPaymentAmount\":\"0\",\"mortgageIndicator\":false,\"motherMaidenName\":\"Mary\",\"otherHouseHoldIncome\":6000,\"phoneNumber\":{\"phoneNumberType\":\"Home\",\"telephoneNumber\":\"4164415344\"}},\"channelType\":\"Internet\",\"clientID\":\"DynamicApp\",\"countryCode\":\"CAN\",\"faceToFaceRequired\":false,\"foreignLanguageIndicator\":\"en-CA\",\"isApplicationSigned\":\"Y\",\"languageCode\":\"en-ca\",\"productId\":\"5000\"}",
        "requestHeaders": "HttpHeaders: X-Content-Type-Options: [nosniff]\nX-XSS-Protection: [1; mode=block]\nCache-Control: [no-cache]\nPragma: [no-cache]\nExpires: [0]\nX-Frame-Options: [DENY]\nAccept: [application/json]\nX-Version-Served: [1]\nContent-Type: [application/json;charset=UTF-8]\n",
        "responseBody": "{\n  \"applicationReferenceId\": \"123\",\n  \"applicationStatus\": \"Approved\",\n  \"createdTS\": \"2016-05-09T16:57:12.036-04:00\",\n  \"updatedTS\": \"2016-05-09T18:57:12.036-04:00\",\n  \"message\": \"Message TEST\",\n  \"creditLimit\": \"999\",\n  \"isExistingCustomer\": \"true\"\n}",
        "responseHeaders": "HttpHeaders: X-Content-Type-Options: [nosniff]\nX-XSS-Protection: [1; mode=block]\nCache-Control: [no-cache]\nPragma: [no-cache]\nExpires: [0]\nX-Frame-Options: [DENY]\nAccept: [application/json]\nX-Version-Served: [1]\nContent-Type: [application/json;charset=UTF-8]\n",
        "responseStatus": 201,
        "url": "/submit-app-web/credit-cards/applications"
    },
    {
        "index": 2,
        "method": "PUT",
        "mockId": "verification",
        "requestBody": "{\"verificationId\":\"519776201220160229150234-0500\",\"answers\":[{\"questionId\":\"2030\",\"answerText\":\"444 QUEEN ST\",\"timeTakenToAnswer\":0},{\"questionId\":\"175\",\"answerText\":\"TORONTO DOMINION BANK\",\"timeTakenToAnswer\":0},{\"questionId\":\"167\",\"answerText\":\"57 - 59\",\"timeTakenToAnswer\":0},{\"questionId\":\"155\",\"answerText\":\"6C\",\"timeTakenToAnswer\":0}]}",
        "requestHeaders": "HttpHeaders: X-Content-Type-Options: [nosniff]\nX-XSS-Protection: [1; mode=block]\nCache-Control: [no-cache]\nPragma: [no-cache]\nExpires: [0]\nX-Frame-Options: [DENY]\nSet-Cookie: [JSESSIONID=C9FAF91F1140455B4F293AA90D6CC6CC; Path=/identity-verification-orchs-web/; HttpOnly]\nLocation: [https:/credit-cards/canada/identity-verification/399697]\nAccept: [application/json]\nX-Version-Served: [1]\nContent-Type: [application/json;charset=UTF-8]\n",
        "responseBody": "{\n  \"verificationId\": \"519776201220160229150234-0500\",\n  \"decision\": \"PASS\"\n}",
        "responseHeaders": "HttpHeaders: X-Content-Type-Options: [nosniff]\nX-XSS-Protection: [1; mode=block]\nCache-Control: [no-cache]\nPragma: [no-cache]\nExpires: [0]\nX-Frame-Options: [DENY]\nSet-Cookie: [JSESSIONID=C9FAF91F1140455B4F293AA90D6CC6CC; Path=/identity-verification-orchs-web/; HttpOnly]\nLocation: [https:/credit-cards/canada/identity-verification/399697]\nAccept: [application/json]\nX-Version-Served: [1]\nContent-Type: [application/json;charset=UTF-8]\n",
        "responseStatus": 200,
        "url": "/identity-verification-orchs-web/credit-cards/canada/identity-verification/399697"
    },
    {
        "index": 1,
        "method": "POST",
        "mockId": "verification",
        "requestBody": "{\"applicantDetails\":{\"firstName\":\"MICKEY\",\"lastName\":\"MOUSE\",\"dateOfBirth\":\"KlMv3H29JvkeUx2KK40ARQ==\",\"address\":{\"addressType\":\"Primary\",\"addressLine1\":\"888 DISNEY RD\",\"city\":\"CALGARY\",\"stateCode\":\"AB\",\"postalCode\":\"T4N3N2\",\"countryCode\":\"CAN\"},\"socialInsuranceNumber\":\"\",\"phoneNumber\":{\"phoneNumberType\":\"Home\",\"telephoneNumber\":\"4164415344\"}},\"languageCode\":\"en\"}",
        "requestHeaders": "HttpHeaders: X-Content-Type-Options: [nosniff]\nX-XSS-Protection: [1; mode=block]\nCache-Control: [no-cache]\nPragma: [no-cache]\nExpires: [0]\nX-Frame-Options: [DENY]\nSet-Cookie: [JSESSIONID=C9FAF91F1140455B4F293AA90D6CC6CC; Path=/identity-verification-orchs-web/; HttpOnly]\nLocation: [https:/credit-cards/canada/identity-verification/399697]\nAccept: [application/json]\nX-Version-Served: [1]\nContent-Type: [application/json;charset=UTF-8]\n",
        "responseBody": "{\n  \"type\": \"sessionResponse\",\n  \"sessionReferenceId\": \"399697\",\n  \"verificationId\": \"519776201220160229150234-0500\",\n  \"decision\": \"QUESTION\",\n  \"questions\": [\n    {\n      \"questionId\": \"2030\",\n      \"questionText\": \"With which TD-Canada Trust branch location do you have an active personal or home equity line of credit?\",\n      \"answers\": [\n        {\n          \"answerText\": \"444 QUEEN ST\"\n        },\n        {\n          \"answerText\": \"270 RAGLAN ST S\"\n        },\n        {\n          \"answerText\": \"4499 HIGHWAY #7\"\n        },\n        {\n          \"answerText\": \"534 BAYFIELD ST\"\n        },\n        {\n          \"answerText\": \"805 WEST BROADWAY\"\n        }\n      ]\n    },\n    {\n      \"questionId\": \"175\",\n      \"questionText\": \"With which of the following companies have you most recently received credit?\",\n      \"answers\": [\n        {\n          \"answerText\": \"TORONTO DOMINION BANK\"\n        },\n        {\n          \"answerText\": \"CITIBANK MASTERCARD\"\n        },\n        {\n          \"answerText\": \"DAVIS PONTIAC BUICK GMC\"\n        },\n        {\n          \"answerText\": \"FAIRVIEW ACURA\"\n        },\n        {\n          \"answerText\": \"NONE OF THE ABOVE\"\n        }\n      ]\n    },\n    {\n      \"questionId\": \"167\",\n      \"questionText\": \"How old are you today?\",\n      \"answers\": [\n        {\n          \"answerText\": \"57 - 59\"\n        },\n        {\n          \"answerText\": \"45 - 47\"\n        },\n        {\n          \"answerText\": \"48 - 50\"\n        },\n        {\n          \"answerText\": \"51 - 53\"\n        },\n        {\n          \"answerText\": \"54 - 56\"\n        }\n      ]\n    },\n    {\n      \"questionId\": \"155\",\n      \"questionText\": \"From the following list, select the apartment number from one of your previous addresses.\",\n      \"answers\": [\n        {\n          \"answerText\": \"6C\"\n        },\n        {\n          \"answerText\": \"8D\"\n        },\n        {\n          \"answerText\": \"1512\"\n        },\n        {\n          \"answerText\": \"915\"\n        },\n        {\n          \"answerText\": \"NONE OF THE ABOVE\"\n        }\n      ]\n    }\n  ]\n}\n",
        "responseHeaders": "HttpHeaders: X-Content-Type-Options: [nosniff]\nX-XSS-Protection: [1; mode=block]\nCache-Control: [no-cache]\nPragma: [no-cache]\nExpires: [0]\nX-Frame-Options: [DENY]\nSet-Cookie: [JSESSIONID=C9FAF91F1140455B4F293AA90D6CC6CC; Path=/identity-verification-orchs-web/; HttpOnly]\nLocation: [https:/credit-cards/canada/identity-verification/399697]\nAccept: [application/json]\nX-Version-Served: [1]\nContent-Type: [application/json;charset=UTF-8]\n",
        "responseStatus": 201,
        "url": "/identity-verification-orchs-web/credit-cards/canada/identity-verification"
    }
]


export default function requests (state = [], action) {
    switch(action.type) {
        case ActionType.FetchMockRequestList.SUCCESS:
            return fromJS(action.requestList).toJS()
    }
    return state;
}