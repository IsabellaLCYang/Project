# [Doge-Commerce](https://dogecom.herokuapp.com)


# Menu
- [Introduction](#introduction)
- [Project Description](#project-description)
- [Project Requirements](#project-requirements)
- [Tech Stack](#tech-stack)
- [Above and Beyond Features](#above-and-beyond-features)
- [Next Steps](#next-steps)
- [Contributions](#contributions)
- [Sketch](#sketch)

## Introduction: 
We designed a lightweight e-commerce platform supporting various roles from guests to buyers to sellers. We incorporated a wide range of features from add/edit products, drag & drop files and cart operations to more advanced integrations such as live chat and data visualization.

## Project Description
We designed a business startup framework which supports various role-based activities through our interactive dashboard UI for small businesses and their corresponding targeted customers. Seller activity spans from designing a presentation page to tracking order status where logged-in users can browse the page, add/delete items to/from carts/wishlist, receive email notifications for the restocking of the wanted item, and guests are limited to only browsing.

User login information including address and encrypted password will be saved as JSON into our database along with product and cart information whereas uploaded product pictures will be stored as schemas with Mongoose/ GridFS. Most data will support editing, and retrieving features while email is used for authentication and registration. Additional functionalities may include monthly data visualization of sales, live chat or recommendation.

## Project Requirements
**Minimal Requirements**:
- ✅ Login
- ✅ Basic CRUD operation on user profile includes remove/update/add to cart/wishlist 
- ✅ Editable and expandable product presentation page 
- ✅ Track order status for shipped items
- ✅ View product page 

**Standard Requirements**:
- ✅ Encrypted password 
- ✅ Data visualization
- ✅ Email notification for restocking of wanted item
- ✅ Login with Google
- ✅ Drag and drop pictures (jpeg,gif and most image and video format)

**Stretch Requirements**:
- ❌ Payment (support paypal, mastercard, visa credit cards etc) 
- ✅ Livechat for customer support 
- ❌ Recommondation system 
## Tech Stack
  ### Unit 1 - HTML, CSS, JS
As we’re taking a dashboard approach for our frontend, HTML sets the foundation for the content displayed on the webpage where CSS helps with styling and responsiveness. Javascript is used for frontend logic.


  ### Unit 2 - React & Redux
React allows our application webpages to create reusable components and dynamic page rendering. It also comes in with seamless ready-to-use integration to an unlimited open-source community and third-party like Material UI which is heavily used in our project to create a visually appealing UI. We also used Redux.js for calling backend API asynchronously and managing application states. 

  ### Unit 3 - Node & Express
Our backend is constructed on Express.js with REST API and JWT authentication using middleware. Since our application handles plenty of user and frontend rendering requests, Express’s fast processing not only elevates users’ and developers’ experience by taking care of request/response formatting but also boosts the performance of our application. 

  ### Unit 4 - NoSQL with MongoDB
We went through multiple editions of our data model and structure thus NoSQL databases like MongoDB became essential to our production.  As we store various data types ranging from encrypted passwords to images in our database with frequent GET requests, MongoDB’s powerful query feature simplified the process as we can update/delete/create multiple information at once. In addition, MongoDB provides better query performance than DynamoDB, and MySQL which contributes to smooth user interaction.

  ### Unit 5 - Release Engineering
We deployed our application through Heroku since its service is simpler than other platforms like AWS. As we can change settings to automatic deployment, we saved time as Heroku takes care of the configuration. For Version Control Management, we utilized Git to integrate code across multiple developers. Furthermore, for building our full-stack JavaScript, we choose npm for build management. 
  
## Above and Beyond Features
One of our highlights is the Live Chat feature which enables real-time communication between seller and buyer. This can be exceptionally useful when customers want to request a refund or get more info about a product. If buyers attempt to chat with an offline seller, an error message will be popped up at the bottom left corner of the webpage. Once a buyer has joined a seller’s chatting room, the conversation will be initialized with an automatic message stating the user has joined the room. Then,  sellers will see a notification dot on the chat icon which suggests incoming messages to promote sellers joining the chatting room. Afterward, both parties can send messages to each other within our minimalist and lightweight frontend.
We implemented our Live Chat using Socket. IO. Chat engine was another alternative, but since it only offers paid service, we decided to build our own Live Chat.  React-chat-element was utilized in our creation of chat UI. 

Another two highlights are Drag & Drop and Data Visualization. Drag & Drop is backed up by React DnD and the Carousel component for auto-playing of the uploaded images. Our Drag&Drop accepts a wide range of image types and supports the simultaneous uploading of multiple images.  Once uploaded, such change will be reflected immediately in the carousel. We designed three interactive graphs displaying periodic performance to the sellers through Recharts. We first fetch raw data from our MongoDB, then we clean up the data and transform the timestamp from date object to month. Then, we plot graphs based on the transformed data to yield human-interpretable graphs. More information on each column/point will be displayed while users hover on them.

## Next Steps
Our envision includes further integration with payment services like Paypal and VISA and delivery companies so we can update the order status to delivered. In addition, we would like to support the uploading of bigger images since our current limitation for each image is around 75 kb. Alternatively, we can synthesize external services provided by sites like tinypng.com to reduce the size of images while transferring them into our database. We could have more attributes to a product, so data visualization could be more interesting. Furthermore, we would like to improve the responsiveness of our application since a small portion of our web pages would distort after shrinking. 
## Contributions
- Ruming(Roy) Zhong 
> - Designed and implemented the login/sign-up and profile page.
> - Used Middleware in application to authorize user with JWT, check users permission in backend and perform password encryption.
> - Used Google Identity in the application to quickly and easily manage user authentication and sign-in to the website.
> - Used Socket.IO in application to enable real-time, bi-directional communication between buyer and seller supporting customer support feature.
> - Improved UI to be more responsive and user-friendly.
- Guanghua(Gavin) Yang
> I designed and implemented the NavWrapper component which consist of navigator and header. As well, I designed the data visualization dashboard for seller, who is able to see monthly sale overview, order statistics, and most popular products in charts. Furthermore, I re-designed the cartSlice, buyerSlice, sellerSlice, and their corresponding schemas at backend when optimizing the user actions and REST API.
- Lichuan(Isabella) Yang
> I designed and built the wishlist feature which enables users to receive instant email notification once wishlisted items have been restocked using NodeMailer. In addition, I implemented Drag & Drop to allow image uploads. Furthermore, I created the UI for cart and order tracking as well as sending/handling requests to backend based on user actions.
- Qintu(Quinn) Tao
> - Implemented product display & editing page, from frontend UI to backend routers and schemas. 
> - Built the image backend schemas and routers.
> - Wrote the product searching functionality for both sellers and buyers.


### Sketch 
![Rough_Sketch_Prototype.jpg](./doc/Rough_Sketch_Prototype.jpg)


