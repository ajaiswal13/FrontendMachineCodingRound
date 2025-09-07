const employeeApp = async function () {
  const response = await fetch("./src/data.json");
  const data = await response.json();
  
  let employees = data;
  let selectedEmployee = employees[0];
  let selectedEmployeeId = employees[0].id;
  const employeeList = document.querySelector('.employee_list_names');
  const employeeInfo = document.querySelector('.employee_info');
  const addEmployeeBtn = document.querySelector('.employee_add');
  const addEmployeeModal = document.querySelector('.addEmployeeModal');
  const addEmployeeForm =  document.querySelector('.addEmployeeForm');
  //For showing the modal on button click
  addEmployeeBtn.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  })
  //For closing the modal on click
  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className=="addEmployeeModal") {
        addEmployeeModal.style.display = "none";
    }
  })

  //Logic for selected employee
  employeeList.addEventListener('click', (e) => {
    //Click event for span
    if (e.target.tagName === "SPAN" && e.target.id != selectedEmployeeId) {
      selectedEmployeeId = e.target.id;
         renderEmployees();
         renderSelectedEmployee();
    }

    //Click event for delete i.e i
    if (e.target.tagName === "I") {
      employees = employees.filter(emp => emp.id != parseInt(e.target.parentNode.id))
      
      if (selectedEmployeeId === parseInt(e.target.parentNode.id)) {
        selectedEmployeeId = employees[0].id;
        selectedEmployee = employees[0];
        renderSelectedEmployee();
      }
      renderEmployees();
    }
    
  })

  //Adding an employee
  addEmployeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    let emp = {};
    values.map((val) => {
      emp[val[0]] = val[1];
    })
    emp.id = employees[employees.length - 1].id + 1;
    emp.imageUrl = emp.imageUrl || 'https://cdn-icons-png.flaticon.com/512/0/93.png'
    employees.push(emp);
    addEmployeeModal.style.display = "none";
    addEmployeeForm.reset();
    renderEmployees();
  })

  //Rendering the employees
  const renderEmployees = () => {
    //Create employee data
    employeeList.innerHTML = "";
    employees.map((emp) => {
      const employee = document.createElement('span');
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="deleteEmployee">❌</i>`

      employee.classList.add('employee_list_item');
      if (parseInt(selectedEmployeeId) === emp.id) {
        employee.classList.add('selected');
        selectedEmployee = emp;
      }
      employee.setAttribute('id', emp.id);
        //Render employees in the list
      employeeList.append(employee);
    })
  
  }
  renderEmployees();

  const renderSelectedEmployee = () => {
    employeeInfo.innerHTML = `
      <img src=${selectedEmployee.imageUrl} />
      <span class="fullname">${selectedEmployee.firstName} ${selectedEmployee.lastName}</span>
      <span>${selectedEmployee.address}</span>
      <span>${selectedEmployee.email}</span>
      <span>${selectedEmployee.contactNumber}</span>
    `
  }
  if (selectedEmployee) {
    renderSelectedEmployee();
  }


  
};

employeeApp();