# BE Bugs

## Vehicle and customer are updated unexpectedly
When a contract get updated and a new vehicle/customer was selected, the vehicle/customer in the contract is still old vehicle/customer with data from new vehicle/customer. And the data of the vehicle/customer is changed unexpectedly via update contract API

## No error is thrown when a new contract is added with a used vehicle
When a request is sent with a vehicle which is selected, BE just save it, so the vehicle can be used in multiple contracts. There is no API to check if a vehicle is already used in a contract so the FE must send a request to get every contract to know if a vehicle is used. And the contract overview API need a page size param, which can't be defined in this case. The only option is doing a hack by using the number from the first API as the size to provide to the API.
