#!usr/bin/env node
import inquirer from "inquirer";
;
let users = [
    {
        userID: "alisha",
        userPin: 1234,
    },
    {
        userID: "khan",
        userPin: 5678,
    },
    {
        userID: "laiba",
        userPin: 9678,
    }
];
let balance = Math.floor((Math.random() * 100000));
let answers1;
let answers2;
startLoop();
async function startLoop() {
    await getUserID();
    do {
        await getTransaction();
        var again = await inquirer.prompt([
            {
                type: "list",
                name: "restart",
                choices: ['Yes', 'No'],
                message: "Do you want to continue: ",
            }
        ]);
    } while (again.restart == 'Yes');
}
async function getUserID() {
    answers1 = await inquirer.prompt([
        {
            type: "input",
            name: "userID",
            message: "Please enter your User ID: "
        },
        {
            type: "number",
            name: "userPin",
            message: "PLease enter your PIN: "
        },
    ]);
    await checkUserID(answers1.userID, answers1.userPin);
}
async function checkUserID(userID, userPin) {
    let condition = false;
    for (let i = 0; i < users.length; i++) {
        if (userID === users[i].userID && userPin === users[i].userPin) {
            condition = true;
            break;
        }
    }
    if (!condition) {
        console.log(`Invalid user ID or Pin. Try again. `);
        await getUserID();
    }
}
async function getTransaction() {
    answers2 = await inquirer.prompt([
        {
            type: "list",
            name: "accountType",
            choices: ["current", "saving"],
            message: "Please select account type: "
        },
        {
            type: "list",
            name: "transType",
            choices: ["Fast Cash", "Withdraw"],
            message: "Please select transaction type: ",
        },
        {
            type: "list",
            name: "amount",
            choices: [5000, 10000, 15000, 20000, 25000],
            message: `Please select your amount(Current Balance is ${balance}): `,
            when(answer2) {
                return answer2.transType == "Fast Cash";
            }
        },
        {
            type: "number",
            name: "amount",
            message: `Please enter your amount (Current Balance is ${balance}): `,
            when(answer2) {
                return answer2.transType == "Withdraw";
            }
        }
    ]);
    if (answers1.userID && answers1.userPin) {
        if (answers2.amount <= balance) {
            balance -= answers2.amount; // balance = balance - answer2.amount
            console.log(`Your current balance is: ${balance}`);
        }
        else {
            console.log(`Insufficient balance ${balance}`);
        }
    }
}
