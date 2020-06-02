const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { askQuestions, roleChosen } =require("./lib/questions");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

async function start() {
    const { name, id, email,role } = await askQuestions();

    return roleChosen({name, id, email, role });

}
async function init() {
    try {
        let another = true;
        const allEmployees = [];
        while (another) {
            const collectNewEmployee = await start();
            allEmployees.push(collectNewEmployee);
            const res1 = await inquirer.prompt(
               [
                   {
                       type: "confirm",
                       name: "addNewEmployee",
                       message: "Do you want to add another employee?"
                   }
               ] 
            );

            if (!res1.addNewEmployee) {
                another = false;
                console.log("Thanks for using the Engine-Employee Template.");
            }
        }

        const html = render(allEmployees);

        fs.writeFileSync(outputPath, html, function (err) {
            
            if (err) {
                
                throw err;
            }
        });
        console.log("Succesfully wrote to team.html file")
    } catch (err) {
        console.log(err);
    }
}

init();

