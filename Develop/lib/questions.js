const inquirer = require("inquirer");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

async function askQuestions() {

    const responses = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is employee's name?"
        },
        {
            type: "input",
            name: "id",
            message:"What is employee's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is employee's email?"
        },
        {
            type: "list",
            message: "What is employee's role?",
            name: "role",
            choices: ["Manager", "Engineer", "Intern"]
        }
    ]);

    return responses;
};

async function roleChosen(emp) {
    const { name, id, email, role } = emp;
    switch (role) {

        case "Manager":
            return managerRole({name, id, email, role});

        case "Engineer":
            return engineerRole({ name, id, email, role });

        case "Intern":
            return internRole({ name, id, email, role });

        default:
            return "There is no such position in this company."
    }
    
};

async function managerRole(data) {
    const { name, id, email } = data;
    const res = await inquirer.prompt([
        {
            type: "input",
            name: "officeNumber",
            message: "What is the Manager's office number?"
        },
    ]);
    const { officeNumber } = res;

    const newManager = new Manager(name, id, email, officeNumber);

    return newManager;
};

async function engineerRole(data) {
    const { name, id, email } = data;
    const res1 = await inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "What is the Engineer's Github username?"
        },
    ]);
    const { github } = res1;

    const newEngineer = new Engineer(name, id, email, github);

    return newEngineer;

};

async function internRole(data) {
    const { name, id, email } = data;
    const res2 = await inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "What is the Intern's school?"
        },
    ]);
    const { school } =res2;

    const newIntern = new Intern(name, id, email, school);

    return newIntern;

}

module.exports = { askQuestions, managerRole, internRole, engineerRole, roleChosen };