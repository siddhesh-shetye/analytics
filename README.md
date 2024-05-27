<p align="center">
  <img src="./logo.png" width="200" alt="Logo" />
</p>
<h1 align="center">Analytics to maintain Custom Events</h1>

## Analytics Module Overview
This module is designed to track analytics within your application, allowing you to gain valuable insights into user interactions. It captures various key parameters for each event, ensuring detailed analysis.


## Supported Event Types:
Clicked: Indicates instances where a user interacts with a clickable element.
Viewed: Indicates when a user accesses or views a particular item or page.
Added to Cart: Records when a user adds an item to their shopping cart or basket.


## Parameters Captured:
- event_type: Classifies events into categories such as "clicked," "viewed," or "addedToCart."
- event_name: A descriptive string identifying the specific action taken by the user, providing detailed context for each event.
- collection_name: Indicates the name of the collection within which the event occurred.
- collection_id: The record of the collection on which the event took place.
- field: Identifies any specific field within the collection record where the event occurred.
- user_token: should be pass as bearer token.


## env:
ATTEMPTS_ENABLED=true	//To enable or disabled attempts per hours check.
ATTEMPTS=5		//This value determines the threshold for blocking user attempts after the specified number of tries.
ATTEMPTS_HOURS=1	//This value determines the timeframe for blocking user attempts after reaching the specified number of tries within the indicated hours.


## How to Install

Copy the following code and run from your terminal

```
yarn add siddhesh_shetye/analytics
```

```
npm i siddhesh_shetye/analytics
```
