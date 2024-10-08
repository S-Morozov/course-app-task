#installing app and using
After you clone the repo, you have to use 2 terminals as it was earlier: 

For backend: 
Navigate to the folders
cd backend 
node server.js  - and server start

For front end part another terminal 
1.cd frontend
2. cd my-app
3. yarn start


# Course Hub

Welcome to the **Course Subscription Application**! This boilerplate application is designed to help you get started with building a simple course subscription application on the ServiceNow platform. It provides the foundational data model and basic configurations, allowing you to focus on implementing the required features and enhancing the application.

## Table of Contents

- [Introduction](#markdown-header-introduction)
- [Prerequisites](#markdown-header-prerequisites)
- [Getting Started](#markdown-header-getting-started)
- [Application Overview](#markdown-header-application-overview)
- [Navigating the Application](#markdown-header-navigating-the-application)
- [Next Steps](#markdown-header-next-steps)
- [Additional Resources](#markdown-header-additional-resources)
- [Support](#markdown-header-support)

## Introduction

The Course Subscription Application allows learners to view available courses and subscribe to them. This boilerplate provides the essential components to help you implement features such as fetching course lists, subscribing to courses, and displaying subscribed courses.

> The goal is to have workable simple version of application that involves ServiceNow in some way. We do not expect you to understand whole ServiceNow platform in couple of days. 

## Prerequisites

Before you begin, ensure you have the following:

- **ServiceNow Personal Developer Instance (PDI)**
    - Sign up at [developer.servicenow.com](https://developer.servicenow.com/) if you don't have one.
- **ServiceNow Studio Access**
    - You will use Studio to import and manage the application.
- **Git and Remote Repository**
    - The repository is public; you should be able to clone it to your local machine and push it to the desired remote repository of your choice.

## Getting Started

Follow these steps to set up the application in your ServiceNow instance.

### 1. Set Up Your ServiceNow Developer Instance

 **Sign Up for a PDI**

- Visit [developer.servicenow.com](https://developer.servicenow.com/) and create an account.
- Request a Personal Developer Instance (PDI) and follow the instructions to activate it.

 **Access Your PDI**

- Once your instance is ready, log in using the credentials provided.

### 2. Clone the Application

 **Obtain the Repository URL**

- Get the HTTPS URL of this repository hosting the application.
- Clone it to your local machine.
- Create a remote repository on your desired provider (e.g., GitHub, GitLab).
- Change the remote to point to your new repository, then push the code to it.

 **Create Git Credentials in ServiceNow**

- In your PDI, navigate to **Connections & Credentials > Credentials**.
- Click **New** and select **Credential**.
- Select **Basic Auth Credentials**.
- Fill in the following:

    - **Name**: *Git Source Control Credential*
    - **Username**: *Your username*
    - **Password**: *Your app password or account password*
- Save the credential.

**Import the Application via Studio**
- Use the application navigator to go to **All > Studio**.
- You can now import the application that you pushed to your remote repository. Follow the guide: [Import App into the PDI](https://developer.servicenow.com/dev.do#!/learn/learning-plans/quebec/new_to_servicenow/app_store_learnv2_devenvironment_quebec_importing_an_application_from_source_control).

**Verify the Import**
- Once the import is complete, you should see the application files in Studio.
- Ensure there are no errors or conflicts.

## Application Overview

### Data Model

The application consists of three main tables:

1. **Course** (`x_quo_coursehub_course`)
2. **Learner** (`x_quo_coursehub_learner`)
3. **Course Subscription** (`x_quo_coursehub_course_subscription`)

### Tables and Fields

All the tables come with default fields: `sys_id`, `created`, `created_by`, `updated`, `updated_by`.

#### Course Table

- **Label**: Course
- **Name**: `x_quo_coursehub_course`

**Fields**:

- **Title** (`title`): String (Max Length: 100, Mandatory)
- **Description** (`description`): String (Max Length: 500)
- **Type** (`type`): Choice (Options: Online, Offline, Hybrid)
- **Duration** (`duration`): Duration (Days Hours:Minutes:Seconds)

#### Learner Table

- **Label**: Learner
- **Name**: `x_quo_coursehub_learner`

**Fields**:

- **User Account** (`user_account`): Reference to `sys_user` (Mandatory)
- **Admission Date** (`admission_date`): Date/Time

#### Course Subscription Table

- **Label**: Course Subscription
- **Name**: `x_quo_coursehub_course_subscription`

**Fields**:

- **Learner** (`learner`): Reference to `x_quo_coursehub_learner` (Mandatory)
- **Course** (`course`): Reference to `x_quo_coursehub_course` (Mandatory)
- **Subscription Date** (`subscription_date`): Date/Time (Defaults to current date/time)

### Access Permission

The following table outlines the access permissions for the roles **x_quo_coursehub.manager** and **x_quo_coursehub.user** across the application's tables.


| **Table**                                           | **Permission** | **x_quo_coursehub.manager** | **x_quo_coursehub.user** |
|-----------------------------------------------------|----------------|------------------------------|--------------------------|
| **Course**<br>`x_quo_coursehub_course`              | **Create**     | Yes                          | No                       |
|                                                     | **Read**       | Yes                          | Yes                      |
|                                                     | **Update**     | Yes                          | No                       |
|                                                     | **Delete**     | Yes                          | No                       |
| **Learner**<br>`x_quo_coursehub_learner`            | **Create**     | Yes                          | Yes                      |
|                                                     | **Read**       | Yes                          | Yes                      |
|                                                     | **Update**     | Yes                          | Yes                      |
|                                                     | **Delete**     | Yes                          | No                       |
| **Course Subscription**<br>`x_quo_coursehub_course_subscription` | **Create** | Yes | Yes |
|                                                     | **Read**       | Yes                          | Yes                      |
|                                                     | **Update**     | Yes                          | Yes                      |
|                                                     | **Delete**     | Yes                          | No                       |

## Navigating the Application

### Accessing the Application

**Open the Application Navigator**:

- In your ServiceNow instance, use the filter navigator on the left. Click the **"All"** menu item on the top navigation bar to open the Application Navigator.
- You should find the **"CourseHub"** application menu.
- **Courses** and **Learners** are listed under **"CourseHub"**.

**Explore the Tables, Lists, and Forms**

- Click on **"Course"** or **"Learners"**.
- Create a few relevant records using the standard UI.

**Default REST API**

- All the existing tables have REST API enabled.
- You can check the [Table API](https://developer.servicenow.com/dev.do#!/reference/api/quebec/rest/c_TableAPI).
- You can also explore using the REST API Explorer, which you can navigate to using the Application Navigator: **System Web Services > REST API Explorer**.

## Next Steps

Now that you have the application set up, you can start implementing the required features. You have two options for building the web front-end user interface (UI):

**Develop UI within ServiceNow**: Utilize NOW platform built-in tools to create custom UIs directly inside your ServiceNow instance. This includes using tools like UI Builder or UI Pages to design and implement your interface.

**Build UI externally**: Create the front end using any external web development frameworks or libraries of your choice, such as React, Angular, or Vue.js. You can then integrate your UI with the ServiceNow backend via REST APIs. You can explore about ServiceNow [REST API](https://docs.servicenow.com/csh?topicname=c_RESTAPI.html&version=latest). For simplicity, we recommend using Table API, as pointed above.

If you choose to develop the UI within ServiceNow, the following resources may be helpful:

- [UI Builder](https://docs.servicenow.com/csh?topicname=ui-builder-overview.html&version=latest)
- [UI Pages](https://docs.servicenow.com/csh?topicname=r_UIPages.html&version=latest)

> Follow the assignment instructions provided, focus on implementing features that you can.

## Additional Resources

- **ServiceNow Developer Site**: [developer.servicenow.com](https://developer.servicenow.com/)
- **ServiceNow Documentation**:
    - [Building Applications on the Now Platform](https://docs.servicenow.com/bundle/quebec-application-development/page/build/applications/concept/build-applications.html)
    - [Tables and Data Management](https://docs.servicenow.com/bundle/quebec-platform-administration/page/administer/table-administration/concept/c_TableAdministration.html)
    - [Pro-Code Development](https://docs.servicenow.com/bundle/quebec-application-development/page/build/applications/concept/building-pro-code-applications.html)
    - [REST API Reference](https://developer.servicenow.com/dev.do#!/reference/api/quebec/rest)
    - [Import Application from Git rep](https://docs.servicenow.com/csh?topicname=t_ImportAppFromSourceControl.html&version=latest)

## Support

If you encounter any issues or have questions:

- **Contact**: [Arjun Basnet]
- **Email**: [ab@datacontentmanager.com]

---

We hope this boilerplate helps you get started quickly. Good luck with your assignment, and we look forward to discussing your work in the interview!

---

