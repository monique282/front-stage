# Front Desafio Stage

Front-end Stage for the challenge, a solution for mapping a company's processes
## About

A web page for organizing areas and processes

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Populate `.env` file based on `.env.example`. `VITE_API_URL` should point to your API server. In this case we are using the localhost


4. Run the backend to complete the execution

```bash
npm run dev
```

## What to do when add new ENV VARIABLES

- Take `.env.example` as an example to create the .env file
- Add them to your local `.env` file

## Technologies used
For this project, the following were used:

- React
- Typescript
- React Router Dom 
- React-bootstrap
- Axios 
- React Icons 
- Prop Types
- Vite 
- ESLint
- Bootstrap  


### Layout Components

The first page is the list of areas and processes for each area. If the user is not logged in, the login option will appear. The images below are in web mode and mobile mode.


![Search Boxes](https://imgur.com/dciftUA.png)
![Search Boxes](https://imgur.com/t4JXT0y.png)

Open menu.

![Search Boxes](https://imgur.com/Q2dxsSj.png)


Login screen, there are two types of users, those who are administrators and those who are simple users, if you are an administrator the edit and delete icons will appear and also in the menu the option to register new areas and new processes will appear as well as the registration of other users.

Login screen

![Search Boxes](https://imgur.com/oArjMRm.png)

Main screen for an administrator with edit and delete buttons, web mode.

![Search Boxes](https://imgur.com/0VwbpaB.png)

Mobile mode screen.
Showing how to edit and delete processes.

![Search Boxes](https://imgur.com/W6PYim7.png)


Editing an area.

![Search Boxes](https://imgur.com/nZuGA0h.png)

To edit a process you have to click on the edit icon. The fields to be edited will open on the screen. In the `tools`, `responsible` and `documentation` fields, it works like this: you type in the field and click on the `Adicionar` and it will be added to the list. To remove an element from the list, simply go to the element you want to remove and click on the `x` next to the element.


![Search Boxes](https://imgur.com/Qx34xSP.png)

If you are the administrator, you will be able to register a new user, as shown in the image.

![Search Boxes](https://imgur.com/0uFO0B5.png)


If you are the administrator, you will be able to register a new area or a new process.

![Search Boxes](https://imgur.com/oqtVOHN.png)


Registering a new area.

![Search Boxes](https://imgur.com/fukYqXX.png)

Registration and new process.

![Search Boxes](https://imgur.com/4g30tpX.png)

Future features are planned. If you want to know more, please get in touch.


