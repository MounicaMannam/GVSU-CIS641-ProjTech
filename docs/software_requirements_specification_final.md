# Overview
The Online Bidding System is a web-based platform that facilitates users in placing bids on various products. This document outlines the functional and non-functional requirements for the development of this system.
# Software Requirements

## Functional Requirements

### User Registration & Authentication

| ID | Requirement |
| :-------------: | :----------: |
| FR1 | Users shall be able to register with a valid email and password. |
| FR2 | Users shall be able to log in using their registered email and password. |
| FR3 | Users shall have the option to recover their password through a secure process. |
| FR4 | Users shall be able to update their profile information after logging in. |
| FR5 | The system shall show Sign-Up link on Sign-In page and vice-versa. |
| FR6 | Users shall have the option to save their account information if needed. |
| FR7 | Users shall be able to view the agreement statements before signup. |

### Bidding Management

| ID | Requirement |
| :-------------: | :----------: |
| FR8 | Users shall be able to place bids on products they are interested in. |
| FR9 | Users shall be able to view their bid history, including active and past bids. |
| FR10 | The system shall automatically increment the bidding price by 15% for each bid. |
| FR11 | Users shall be able to update their bid amounts. |
| FR12 | Users shall be able to add products to their wishlist for future bidding. |
| FR13 | Users shall have the option to delete their bids. |
| FR14 | The system shall display the top five bidders for a selected product. |

### Product Management

| ID | Requirement |
| :-------------: | :----------: |
| FR15 | Users shall be able to add new products with details such as name, description, and images. |
| FR16 | Users shall be able to update product details. |
| FR17 | Users shall be able to delete products they no longer wish to auction. |
| FR18 | Users shall assign a category to each product. |
| FR19 | Users shall be able to view a list of all their products. |
| FR20 | Users shall be able to upload images for each product. |
| FR21 | Admin shall be able to view and manage similar products for analysis. |

### Product Images Management

| ID | Requirement |
| :-------------: | :----------: |
| FR22 | Users shall be able to upload images for each product during the product addition process. |
| FR23 | Users shall have the option to delete images associated with a product. |
| FR24 | Users shall be able to view the images associated with a particular product. |
| FR25 | The system shall support the upload of multiple images for a single product. |
| FR26 | Thumbnails of uploaded images shall be automatically generated for product listings. |
| FR27 | Users shall be able to view all images in a gallery format for a particular product. |
| FR28 | The system shall validate that uploaded images maintain a consistent aspect ratio for display uniformity. |

### Reporting and Admin Tools

| ID | Requirement |
| :-------------: | :----------: |
| FR29 | Admin shall be able to generate reports on auction outcomes. |
| FR30 | Admin shall be able to view reports on user activity. |
| FR31 | Admin shall be able to generate reports on product trends. |
| FR32 | Admin shall be able to view reports on user transactions. |
| FR33 | Admin shall be able to add, update, or delete product categories. |
| FR34 | Admin shall be able to manage user accounts. |
| FR35 | The system shall perform regular backups of critical data. |

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

# Traceability links

This section establishes a vital link between the various artifacts developed for the online bidding system and the specified project requirements. Through careful mapping, we ensure that every software artifact, including use case diagrams, class diagrams, and activity diagrams, is systematically connected to the relevant requirements. This traceability framework is a foundational element in validating the project's alignment with the defined functional and non-functional aspects. By providing a clear and comprehensive association between each artifact and its corresponding requirements, this section assures stakeholders of the thorough consideration given to every project facet, fostering transparency and accountability in the development process.

## Use Case Diagram Traceability

| Artifact ID  | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
| UseCase1 | Buyer | FR1, FR2, FR3. FR4, FR5, FR6, FR7, FR8, FR9, FR11, FR12, FR13, FR24, FR27 |
| UseCase2| Seller | FR1, FR2, FR3. FR4, FR5, FR6, FR7,  FR15, FR16, FR17, FR18, FR19, FR20, FR22, FR123, FR24, FR27 |
| UseCase3| Admin | FR21, FR29, FR30, FR31, FR32, FR33, FR34 |


## Class Diagram Traceability

| Artifact Name | Requirement ID |
| :-------------: |:----------: |
| classAdmin|FR21, FR29, FR30, FR31, FR32, FR33, FR34|
|ClassUser | FR1, FR2, FR3. FR4, FR5, FR6, FR7,  FR15, FR16, FR17, FR18, FR19, FR20, FR22, FR123, FR24, FR27, FR33 |
|ClassCategory | | … |
|ClassProduct |  FR22, FR23, FR24, FR26, FR27|
|ClassBid | … | … |
|ClassWishlist | … | … |
|ClassTransaction | … | … |

## Activity Diagram Traceability

<In this case, it makes more sense (I think, feel free to disagree) to link to the file and to those requirements impacted>

| Artifact ID  | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
| AD1:Customer_Information | Handle Customer Input | FR1-5, NFR1, NFR2, NFR7, NFR22, NFR24, NFR25 |
| AD2:Admin_Page| Manage Auction creation and user account | FR21, FR29, FR30, FR31, FR32, FR33, FR34, NFR11, NFR14, NFR27  |


# Software Artifacts

This section serves as a repository for the tangible outputs of our online bidding system project. It provides hyperlinks to key artifacts developed. These artifacts collectively provide an in-depth understanding of the system's structure, functionality, and dynamic processes.

* [A link to](https://github.com/MounicaMannam/GVSU-CIS641-ProjTech/blob/main/artifacts/Activity%20Diagrams.pdf)  - Activity Diagrams.pdf
* [A link to](https://github.com/MounicaMannam/GVSU-CIS641-ProjTech/blob/main/artifacts/Final%20Update%20Class%20Diagrams.pdf) - Final Update Class Diagram.pdf
* [A link to](https://github.com/MounicaMannam/GVSU-CIS641-ProjTech/blob/main/artifacts/Final%20Update%20Object%20Diagrams.pdf) - Final Update Object Diagram
* [A link to](https://github.com/MounicaMannam/GVSU-CIS641-ProjTech/blob/main/artifacts/Use%20Case%20Diagrams.pdf) - Use Case Diagrams.pdf
* [A link to](https://github.com/MounicaMannam/GVSU-CIS641-ProjTech/blob/main/artifacts/Object%20Diagram.pdf) - Object Diagram.pdf
* [A link to](https://github.com/MounicaMannam/GVSU-CIS641-ProjTech/blob/main/artifacts/CRC%20Card.pdf) - CRC Card.pdf
* [A link to](https://github.com/MounicaMannam/GVSU-CIS641-ProjTech/blob/main/artifacts/ProjTech%20Logo.jpg) - ProjTech Logo.jpg
* [A link to](https://github.com/MounicaMannam/GVSU-CIS641-ProjTech/blob/main/artifacts/ER%20Diagram.pdf) - ER Diagram.pdf
* [A link to ](https://github.com/MounicaMannam/GVSU-CIS641-ProjTech/blob/main/artifacts/Database%20Schema.pdf) - Database Schema.pdf
* [A link to ](https://github.com/MounicaMannam/GVSU-CIS641-ProjTech/blob/main/artifacts/Windows%20Navigation%20Diagram%20IC.pdf) -Windows Navigation Diagram.pdf







