// const username = document.getElementById("userName")?.value;

const applicationState = {
  users: [],
};

const dbAPI = "http://localhost:7000";

export const getCurrentUser = () => {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  applicationState.currentUser = user;
  return user;
};

//create export function that sets current user to Session Data
export const setCurrentUser = (user) => {
  sessionStorage.setItem("currentUser", JSON.stringify(user));
};

// fetch all users from db
export const fetchAllUsers = async () => {
  const data = await fetch(`${dbAPI}/users`);
  const jsonData = await data.json();
  applicationState.users = jsonData;
};

export const getAllUsers = () => {
  return applicationState.users.map((x) => ({ ...x }));
};

await fetchAllUsers();

document.addEventListener("click", (e) => {
  if (e.target.id === "submit") {
    const formIsValid = document.getElementById("loginForm").checkValidity();
    if (!formIsValid) {
      document.getElementById("loginForm").reportValidity();
    } else {
      e.preventDefault();
      const users = getAllUsers();
      const submittedUser = document.getElementById("userName").value;
      const submittedPassword = document.getElementById("userPassword").value;
      //   console.log(submittedUser, submittedPassword);
      //loop through all users, find the user that matches, check if password matches. if No user is found, alert no user or password incorrect

      const foundUser = users.find((currentUser) => {
        return currentUser.userName === submittedUser;
      });
      const foundPassword =
        foundUser?.password === submittedPassword ? true : false;

      if (foundUser && foundPassword) {
        setCurrentUser(foundUser);
        render();
      } else {
        window.alert("username or password is incorrect");
      }
    }
  }
});

const displayForm = () => {
  return `<form id="loginForm" >
    <fieldset>
        <label for="userName">Username</label>
        <input type="text" id="userName" name="userName" required/>
    </fieldset>
    <fieldset>
        <label for="userPassword">Password</label>
        <input type="text" id="userPassword" name="userPassword" required/>
    </fieldset>
    <button id="submit">submit</button>
</form>`;
};

const displayContent = () => {
  const user = getCurrentUser();
  return `<h1>Hello ${user.userName}</h1>`;
};

const render = () => {
  const mainContainer = document.getElementById("app");
  if (getCurrentUser()) {
    mainContainer.innerHTML = displayContent();
  } else {
    mainContainer.innerHTML = displayForm();
  }
};
render();
