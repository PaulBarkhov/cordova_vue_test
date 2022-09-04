CREATE TABLE Todos (
       todo_id INT PRIMARY KEY AUTO_INCREMENT, 
       todo_content VARCHAR(255), 
       todo_done BOOLEAN
);
INSERT INTO Todos(
       todo_content, 
       todo_done) 
VALUES(
       "test first todo", 
        1
);
INSERT INTO Todos(
       todo_content, 
       todo_done) 
VALUES(
       "test second todo", 
        0
);
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'; 
flush privileges;