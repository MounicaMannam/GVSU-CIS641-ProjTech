# Overview
The Online Bidding System is a web-based platform that facilitates users in placing bids on various products. This document outlines the functional and non-functional requirements for the development of this system.
# Software Requirements

## Functional Requirements

### User Registration & Authentication

| ID | Requirement |
| :-------------: | :----------: |
| FR1 | Users should be able to register with a valid email and password. |
| FR2 | Users should be able to log in using their registered email and password. |
| FR3 | Users should have the option to recover their password through a secure process. |
| FR4 | Users should be able to update their profile information after logging in. |
| FR5 | The system should show Sign-Up link on Sign-In page and vice-versa. |
| FR6 | Users should have the option to save their account information if needed. |
| FR7 | Users should be able to view the agreement statements before signup. |

### Bidding Management

| ID | Requirement |
| :-------------: | :----------: |
| FR8 | Users should be able to place bids on products they are interested in. |
| FR9 | Users should be able to view their bid history, including active and past bids. |
| FR10 | The system should automatically increment the bidding price by 15% for each bid. |
| FR11 | Users should be able to update their bid amounts. |
| FR12 | Users should be able to add products to their wishlist for future bidding. |
| FR13 | Users should have the option to delete their bids. |
| FR14 | The system should display the top five bidders for a selected product. |

### Product Management

| ID | Requirement |
| :-------------: | :----------: |
| FR15 | Users should be able to add new products with details such as name, description, and images. |
| FR16 | Users should be able to update product details. |
| FR17 | Users should be able to delete products they no longer wish to auction. |
| FR18 | Users should assign a category to each product. |
| FR19 | Users should be able to view a list of all their products. |
| FR20 | Users should be able to upload images for each product. |
| FR21 | Admin should be able to view and manage similar products for analysis. |

### Product Images Management

| ID | Requirement |
| :-------------: | :----------: |
| FR22 | Users should be able to upload images for each product during the product addition process. |
| FR23 | Users should have the option to delete images associated with a product. |
| FR24 | Users should be able to view the images associated with a particular product. |
| FR25 | The system should support the upload of multiple images for a single product. |
| FR26 | Thumbnails of uploaded images should be automatically generated for product listings. |
| FR27 | Users should be able to view all images in a gallery format for a particular product. |
| FR28 | The system should validate that uploaded images maintain a consistent aspect ratio for display uniformity. |

### Reporting and Admin Tools

| ID | Requirement |
| :-------------: | :----------: |
| FR29 | Admin should be able to generate reports on auction outcomes. |
| FR30 | Admin should be able to view reports on user activity. |
| FR31 | Admin should be able to generate reports on product trends. |
| FR32 | Admin should be able to view reports on user transactions. |
| FR33 | Admin should be able to add, update, or delete product categories. |
| FR34 | Admin should be able to manage user accounts. |
| FR35 | The system should perform regular backups of critical data. |




## Non-Functional Requirements
### Performance

|  ID  | Requirement |
| --- | --- |
| NFR1 | The system shall be capable of accommodating a minimum of 1000 users simultaneously during peak operating hours. |
| NFR2 | The system shall ensure that the response time for placing a bid does not exceed 2 seconds under normal operational load. |
| NFR3 | Database queries within the system shall be optimized to execute in no more than 1 second for timely retrieval of bidding information. |
| NFR4 | The system shall maintain an uptime of 99.9% on a monthly basis, ensuring uninterrupted availability for bidding services. |
| NFR5 | Web pages within the system shall load within 3 seconds to provide users with a responsive and efficient experience. |
| NFR6 | The system architecture shall be scalable to accommodate a 20% annual increase in user activity, ensuring sustained performance. |
| NFR7 | The system shall ensure that the response time for placing a bid does not exceed 2 seconds under normal operational load. |

### Maintainability

|  ID  | Requirement |
| --- | --- |
| NFR8 | The system shall be easy to maintain and update. |
| NFR9 | Codebase shall be well-documented, allowing for efficient troubleshooting and future development by other developers. |
| NFR10 | The system shall have modular and well-defined components, enabling straightforward replacement or addition of features without major disruptions. |
| NFR11 | A version control system shall be implemented for tracking changes, facilitating collaboration among development teams, and ensuring code integrity. |
| NFR12 | The system shall be designed with clear and concise coding standards to enhance readability and ease of maintenance. |
| NFR13 | The system shall be easy to debug. |
| NFR14 | The system shall be written in a standard programming language. |

### Scalability

|  ID  | Requirement |
| --- | --- |
| NFR15 | The system shall easily scale horizontally to accommodate a 50% increase in concurrent users within a 6-month period. |
| NFR16 | The database supporting the system shall seamlessly scale with the addition of new bidding items and user accounts. |
| NFR17 | The system shall be able to scale to handle peak loads. |
| NFR18 | Load balancing mechanisms shall be implemented to distribute user requests evenly across multiple servers for efficient resource utilization. |
| NFR19 | The system shall handle increased traffic during special events or promotions without compromising overall performance. |
| NFR20 | The system shall support the addition of new features and modules without compromising overall performance or user experience. |
| NFR21 | Regular scalability testing shall be conducted to identify potential bottlenecks and optimize resource allocation for sustained scalability. |

### Usability

|  ID  | Requirement |
| --- | --- |
| NFR22 | The user interface shall be designed to be intuitive and user-friendly, minimizing the need for extensive training for new users. |
| NFR23 | The system shall be accessible from various devices and browsers, ensuring a seamless and consistent user experience across different platforms. |
| NFR24 | Clear and concise error messages shall be provided to users in the case of input errors or system issues to guide them in resolving problems effectively. |
| NFR25 | The system shall be responsive to user input. |
| NFR26 | A responsive design shall be implemented to ensure a consistent and optimal user experience across different screen sizes and resolutions. |
| NFR27 | Real-time notifications shall be provided for important events, such as outbid alerts and auction status updates, to keep users informed. |
| NFR28 | The system shall be easy to use and browse. |

### Compatibility

|  ID  | Requirement |
| --- | --- |
| NFR29 | The system shall be compatible with the latest versions of major web browsers, including Chrome, Firefox, Safari, and Edge. |
| NFR30 | The system shall be responsive and functional on various devices, including desktops, laptops, tablets, and smartphones. |
| NFR31 | The system shall integrate seamlessly with common operating systems, including Windows, macOS, and Linux. |
| NFR32 | Compatibility with standard internet connection speeds shall be ensured to provide a consistent user experience for users with varying network conditions. |
| NFR33 | The system shall be compatible with the latest web standards. |
| NFR34 | The system shall be compatible with security software. |
| NFR35 | The system shall be compatible with different screen sizes and resolutions. |


# Change Management Plan

## 1. Training Program

- **Customized Training Modules:**
  - Develop training materials tailored to different user roles for the employees (e.g., engineers, project managers, and administrators).

- **Hands-on Workshops:**
  - Conduct interactive workshops and simulation exercises to ensure practical understanding and application of the online bidding system.

- **E-Learning Platforms:**
  - Establish an online learning platform with video tutorials, FAQs, and user guides for ongoing reference.

## 2. Ecosystem Integration

- **Integration Assessment:**
  - Conduct a thorough analysis of the customer's existing software ecosystem to identify potential integration points and challenges.

- **API Compatibility:**
  - Ensure the online bidding system has robust APIs that facilitate seamless integration with commonly used software tools in the customer's domain.

- **Pilot Integration:**
  - Implement a small-scale pilot integration to identify and resolve any unforeseen issues before full deployment.

## 3. Issue Resolution Mechanism

- **Dedicated Support Team:**
  - Establish a dedicated support team to address user concerns and issues promptly.

- **User Feedback Loop:**
  - Implement a feedback loop to capture user feedback on an ongoing basis. Regularly analyze and address reported issues.

- **Continuous Improvement:**
  - Have a structured process for continuous improvement, including regular updates and patches to address any identified issues or enhance system features.

## 4. Change Management Strategies

- **Clear Communication:**
  - Develop a comprehensive communication plan to articulate the benefits of the online bidding system. Address concerns and highlight success stories.

- **Change Champions:**
  - Identify and empower influential individuals within the organization as change champions. These individuals can help sway opinions and garner support.

- **Incentive Programs:**
  - Implement incentive programs to recognize and reward early adopters. This can create positive peer pressure and motivation.

## 5. Managerial Engagement

- **Leadership Workshops:**
  - Conduct workshops for managers to showcase the strategic advantages of the online bidding system. Emphasize how it aligns with organizational goals.

- **Managerial Training Programs:**
  - Offer specialized training programs for managers to enhance their understanding and usage of the system.

- **Performance Metrics Alignment:**
  - Align performance metrics for managers with successful adoption and utilization of the new system.

## 6. Organizational Alignment

- **Cross-Functional Collaboration:**
  - Encourage cross-functional collaboration by emphasizing how the online bidding system enhances communication and collaboration among different departments.

- **Change Impact Assessment:**
  - Perform a comprehensive assessment of the impact of the new system on existing processes and workflows. Address and mitigate potential disruptions.

## 7. Continuous Monitoring and Evaluation

- **Key Performance Indicators (KPIs):**
  - Establish KPIs to measure the success and impact of the online bidding system. Regularly evaluate these metrics and adjust strategies accordingly.

- **User Surveys:**
  - Conduct periodic user surveys to gather qualitative feedback and insights. Use this information for further refinement and improvement.





https://github.com/MounicaMannam/GVSU-CIS641-ProjTech/blob/main/artifacts/Activity%20Diagrams.pdf


