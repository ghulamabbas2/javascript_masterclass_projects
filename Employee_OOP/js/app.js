class Employee {
    constructor(name, salary, tax) {
        this.name = name;
        this.salary = salary;
        this.tax = tax;
    }

    calculateSalary() {
        this.netSalary = Math.round(this.salary - ((this.tax / 100) * this.salary));
        return this.netSalary;
    }

    generateId() {
        this.id = Math.floor(Math.random() * 100000);
        return this.id;
    }
}

class EmployeeUI {
    addEmployee(employee) {
        const employeeList = document.querySelector('tbody');

        const markup = `<tr>
                        <th scope="row">${employee.id}</th>
                        <th>${employee.name}</th>
                        <th>$${employee.salary}</th>
                        <th>${employee.tax}%</th>
                        <th>$${employee.netSalary}</th>
                        <th><a href="#" class="btn btn-danger delete">Delete</a></th>
                    </tr>`;

        employeeList.insertAdjacentHTML('afterbegin', markup);
    }

    clearFields() {
        document.querySelector('#nameField').value = '';
        document.querySelector('#salaryField').value = '';
        document.querySelector('#taxField').value = '';
    }

    alertMessage(messageType, message) {
        const markup = `<div class="alert alert-${messageType}" role="alert">${message}</div>`;

        const form = document.querySelector('form');
        form.insertAdjacentHTML('beforebegin', markup);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    deleteEmployee(target) {
        if(target.matches('.delete')) {
            target.parentElement.parentElement.remove();
            return true;
        }
    }
}

class StoreEmployee {
    static getEmployees() {
        let employees;

        if(localStorage.getItem('employees') === null) {
            employees = [];
        } else {
            employees = JSON.parse(localStorage.getItem('employees'));
        }

        return employees;
    }

    static displayEmployees() {
        const employees = StoreEmployee.getEmployees();
        const employeeUi = new EmployeeUI();

        employees.forEach(employee => {
            employeeUi.addEmployee(employee);
        });
    }

    static addEmployee(employee) {
        const employees = StoreEmployee.getEmployees();

        employees.push(employee);

        localStorage.setItem('employees', JSON.stringify(employees));
    }

    static removeEmployee(id) {
        const employees = StoreEmployee.getEmployees();

        employees.forEach((employee, index) => {
            if(employee.id === parseInt(id)) {
                employees.splice(index, 1);
            }
        });

        localStorage.setItem('employees', JSON.stringify(employees));
    }
}

const addEmployeeButton = document.querySelector('#add_employee');
addEmployeeButton.addEventListener('click', e => {
    const name = document.querySelector('#nameField').value;
    const salary = document.querySelector('#salaryField').value;
    const tax = document.querySelector('#taxField').value;

    const employeeUi = new EmployeeUI();

    if(name === '' || salary === '' || tax === '') {
        employeeUi.alertMessage('danger', 'Please complete the form.');
    } else {
        const employee = new Employee(name, salary, tax);

        // Assign random id to employee
        employee.id = employee.generateId();
        employee.netSalary = employee.calculateSalary();

        
        employeeUi.addEmployee(employee);

        StoreEmployee.addEmployee(employee);

        employeeUi.alertMessage('success', 'Employee is added sucessfully.')
        employeeUi.clearFields();
    }

});

document.querySelector('tbody').addEventListener('click', e => {
    const employeeUi = new EmployeeUI();

    const isDeleted = employeeUi.deleteEmployee(e.target);

    StoreEmployee.removeEmployee(e.target.parentElement.parentElement.firstElementChild.textContent);

    if(isDeleted) {
        employeeUi.alertMessage('success', 'Employee deleted Successfully');
    }

});

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
});

StoreEmployee.displayEmployees();