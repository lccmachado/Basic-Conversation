# **Basic Conversation**

Credit: This application was originally created by **Sergio Gama** (sgama@br.ibm.com).

## Web Application Template for Watson Conversation API Demonstration

**Requirements:**
1. Bluemix user account http://www.bluemix.net
2. Git user account https://github.com/

Main steps:
1. Do a **"Fork"** of this code: https://github.com/lccmachado/Basic-Conversation
2. Create a Jazz Hub project (Bluemix DevOps Services) **pointing to the Fork created in the last step**
3. Create and instance of **Watson Conversation Service**.
4. Create a workspace
5. Configure the Intents
6. Configure the Dialog
7. Take note of Watson Conversation Serice's **Credentials** and **workspace_id**
8. Edit the file **app.js** and fill the fields: *username*, *<password>* and *<workspace_id>* with the data collected in the last step.
```css
var conversation = watson.conversation({
  username:"<username>",//replace with the username from service credential
  password:"<password>",//replace with the password from service credential
  version: 'v1',
  version_date: '2016-07-11'
});
```
```css
var workspace = "<workspace_id>"; //replace with the workspace_id from service credential
```
9. Deploy the application
