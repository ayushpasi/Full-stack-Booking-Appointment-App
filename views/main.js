// Get the form element by its ID
var form = document.getElementById("my-form");

// Add a submit event listener to the form
form.addEventListener("submit", saveData);

// Get the "users" ul element
var user = document.getElementById("users");

// Function to handle form submission
function saveData(e) {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Get the values from the input fields
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var mobile = document.getElementById("mobile").value;

  // Create an object to store the user data
  var dataObj = {
    name: name,
    email: email,
    mobile: mobile,
  };

  axios
    .post("http://localhost:4000/user/save", dataObj)
    .then((res) => {
      console.log(res.data.newUser);

      showData(res.data.newUser);
    })
    .catch((err) => {
      document.body.innerHTML = "Somthing went wrong";
      console.log(err);
    });
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("mobile").value = "";
}

function showData(obj) {
  // Create a new list item element
  var li = document.createElement("li");

  // Add a class "item" to the list item
  li.className = "item";

  // Create a text node with user data and append it to the list item
  li.appendChild(
    document.createTextNode(
      obj.name + "  " + obj.email + "  " + obj.mobile + "  "
    )
  );

  // Create a delete button element
  var btn = document.createElement("button");

  // Add a class "delete" to the button
  btn.className = "delete";

  // Add text "delete" to the button
  btn.appendChild(document.createTextNode("delete"));

  // Add a click event listener to the delete button
  btn.onclick = () => {
    user.removeChild(li);
    console.log("id" + obj.id);
    axios
      .delete("http://localhost:4000/user/delete/" + obj.id)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  // Create an edit button element
  var edit = document.createElement("button");

  // Add a class "edit" to the button
  edit.className = "edit";

  // Add text "edit" to the button
  edit.appendChild(document.createTextNode("edit"));

  // Add a click event listener to the edit button
  edit.onclick = () => {
    user.removeChild(li);
    axios
      .delete("http://localhost:4000/user/delete/" + obj.id)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    document.getElementById("name").value = obj.name;
    document.getElementById("email").value = obj.email;
    document.getElementById("mobile").value = obj.mobile;
  };

  // Append the edit and delete buttons to the list item
  li.appendChild(edit);
  li.appendChild(btn);

  // Append the list item to the "users" ul
  user.appendChild(li);
}
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:4000/user/fetch")
    .then((res) => {
      console.log("fetched:" + res.data);
      var data = res.data;
      data.forEach((item) => {
        showData(item);
      });
    })
    .catch((err) => {
      console.log("Error fetching data:", err);
    });
});
