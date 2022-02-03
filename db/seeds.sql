USE employees_db;

INSERT INTO departments (name)
VALUES ("Sales"),
       ("Management");

SELECT @salesDeptID := id from departments where name = "Sales" LIMIT 1;
SELECT @managementDeptID := id from departments where name = "Management" LIMIT 1;

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 45000, @salesDeptID),
       ("Branch Manager", 65000, @managementDeptID);

SELECT @salesLeadRoleID := id from roles where title = "Sales Lead" LIMIT 1;
SELECT @branchManagerID := id from roles where title = "Branch Manager" LIMIT 1;

INSERT INTO employees (first_name, last_name, title, role_id)
VALUES ("Michael", "Scott", "Branch Manager", @branchManagerID);

INSERT INTO employees (first_name, last_name, title, role_id, manager_id)
VALUES ("Dwight", "Schrute", "Sales Lead", @salesLeadRoleID, LAST_INSERT_ID());