export async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const url = form.action;

  try {
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({ url, formData });
    console.log(responseData);
    form.reset();
  } catch (error) {
    alert(error);
  }
}

async function postFormDataAsJson({ url, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString
  };
  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.text();
}

export async function getDataAsJson(url) {
  // const fetchOptions = {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   }
  // };

  // const response = await fetch(url, fetchOptions);

  // if (!response.ok) {
  //   const errorMessage = await response.text();
  //   throw new Error(errorMessage);
  // }

  // return response.json();

  return getUserList();
}

function getUserList() {
  return [
    {
      userName: 'john.smith',
      firstName: 'John',
      lastName: 'Smith'
    },
    {
      userName: 'jane.smith',
      firstName: 'Jane',
      lastName: 'Smith'
    }
  ];
}

export function log(message) {
  console.log(message);
}
