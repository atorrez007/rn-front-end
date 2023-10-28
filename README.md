# RN-ReviewsNow 

https://rn-front-end.vercel.app/

**Introduction**

Our healthcare system is facing a growing crisis with increasing patient numbers and inadequate nurse-to-patient ratios. RN-ReviewsNow is a project designed to address this issue by providing transparency and accountability within the healthcare sector. We aim to empower nurses, improve patient care, and create a platform for sharing valuable insights.



## Technologies Used

- **Frontend**: RN-ReviewsNow is built with React, providing an intuitive and user-friendly interface for users to access hospital reviews and ratings.

- **Backend**: The project uses an Express/Node backend to handle server-side logic and database operations.

- **Database**: We store and manage hospital information, user reviews, and ratings in a MongoDB database.


## Project Challenges

One of the primary challenges of this project is integrating a MongoDB cluster with hospital information updated from the CMS website (Centers for Medicare & Medicaid Services). We have obtained a data API to facilitate this process, but ensuring seamless and accurate data synchronization is essential.

## Minimum Viable Product (MVP)

The MVP of RN-ReviewsNow focuses on the following key features:

1. **Hospital Ratings**: Allow users to access ratings for hospitals based on nurse-to-patient ratios, helping them make informed decisions about travel assignments.

2. **Hospital Reviews**: Enable users to post reviews of hospitals where they have completed travel assignments, sharing their experiences and insights.

In the future, we plan to expand the platform's functionality to incorporate more transparency by allowing users to confidentially disclose the agency they work for and the pay they received during their assignments. This feature will benefit both newly established agencies seeking to recruit more nurses with better pay and more established agencies, preventing them from undercutting their nurses' compensation.

## CRUD Functionality

RN-ReviewsNow offers CRUD (Create, Read, Update, Delete) functionality to ensure a dynamic user experience:

- **Create**: Users can post reviews of hospitals they have worked at, providing details and ratings through a user-friendly form.

- **Read**: Users can access information on hospitals, view ratings, and read reviews from other nurses to make informed decisions.

- **Update**: Users can update their reviews if needed to reflect changes in their experiences.


To populate the hospitals in the database, we ideally query the CMS website for providers in the United States and then populate the MongoDB according to our Schema. If automatic data retrieval is not feasible, we will consider manual data updates to ensure the platform's accuracy and reliability.

**Getting Started**

- Clone this repository.
- Navigate to the project directory.
- Run `npm install` to install the project's dependencies.
- Run `npm run start:dev` to start the development server.
- Run `npm run start:prod` to start the production server.


RN-ReviewsNow is a vital project in the healthcare sector, addressing the critical need for transparency and accountability in nurse-patient ratios and hospital quality. We are dedicated to making this platform a valuable resource for traveling nurses and medical professionals. Join us in our mission to improve patient care and empower healthcare professionals!

https://rn-front-end.vercel.app/
