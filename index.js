// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records from array of arrays
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Function to record time event for an employee
function createTimeEvent(employee, timestamp, type) {
    const [date, hour] = timestamp.split(" ");
    const event = { type, hour: parseInt(hour), date };
    type === "TimeIn" ? employee.timeInEvents.push(event) : employee.timeOutEvents.push(event);
    return employee;
}

// Function to record time in for an employee
function createTimeInEvent(employee, timestamp) {
    return createTimeEvent(employee, timestamp, "TimeIn");
}

// Function to record time out for an employee
function createTimeOutEvent(employee, timestamp) {
    return createTimeEvent(employee, timestamp, "TimeOut");
}

// Function to calculate hours worked by an employee on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    const startTime = parseInt(timeIn.hour);
    const endTime = parseInt(timeOut.hour);
    return (endTime - startTime) / 100;
}

// Function to calculate wages earned by an employee on a specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate total wages earned by an employee
function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => {
        return totalWages + wagesEarnedOnDate(employee, date);
    }, 0);
}

// Function to find an employee by first name
function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName);
}

// Function to calculate total payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor(employee);
    }, 0);
}

// Sample usage:
const employeesData = [
    ["John", "Doe", "Manager", 25],
    ["Jane", "Smith", "Employee", 20]
];
const employees = createEmployeeRecords(employeesData);

createTimeInEvent(employees[0], "2024-05-06 0800");
createTimeOutEvent(employees[0], "2024-05-06 1700");

createTimeInEvent(employees[1], "2024-05-06 0900");
createTimeOutEvent(employees[1], "2024-05-06 1800");

console.log(allWagesFor(employees[0])); // Output: 225
console.log(allWagesFor(employees[1])); // Output: 160

console.log(calculatePayroll(employees)); // Output: 385
