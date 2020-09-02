<?php

use Slim\Http\Request;
use Slim\Http\Response;
use \Firebase\JWT\JWT;



$app->post('/login', function (Request $request, Response $response, array $args) {

    $input = $request->getParsedBody();
    $sql = "SELECT * FROM users WHERE userEmail= :email";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("email", $input['email']);
    $sth->execute();
    $user = $sth->fetchObject();

    if(!$user) {
        return $this->response->withJson(['error' => true, 'message' => 'These credentials do not match our records.']);  
    }
    
    if (md5($input['password']) != $user->userPassword) {
        return $this->response->withJson(['error' => true, 'message' => 'These credentials do not match our records.']);  
    }

    $settings = $this->get('settings');

    $token = JWT::encode(['id' => $user->userId, 'email' => $user->userEmail], $settings['jwt']['secret'], "HS256");

    return $this->response->withJson(['token' => $token, 'email' => $user->userEmail, 'username' => $user->userName, 'id' => $user->userId]);

});

$app->post('/register', function ($request, $response) {
    $input = $request->getParsedBody();
    $password = md5($input['userPassword']);
    $sql = "INSERT INTO users (userName, userEmail, userPassword) VALUES (:userName, :userEmail, :userPassword )";
    $sth = $this->db->prepare($sql);
    $sth->bindParam("userName", $input['userName']);
    $sth->bindParam("userEmail", $input['userEmail']);
    $sth->bindParam("userPassword", $password);
    $sth->execute();
    $input['id'] = $this->db->lastInsertId();
    return $this->response->withJson($input);
});

$app->group('/tasks', function(\Slim\App $app) {

    $app->get('/',function(Request $request, Response $response, array $args) {
        $sth = $this->db->prepare("SELECT * FROM tasks ORDER BY taskId DESC");
        $sth->execute();
        $tasks = $sth->fetchAll();
        return $this->response->withJson($tasks);
    });

    $app->post('/create', function ($request, $response) {
        $input = $request->getParsedBody();
        $sql = "INSERT INTO tasks (taskUserId, taskName, taskCreatedDate, taskDueDate, taskStatus) VALUES (:taskUserId, :taskName, :taskCreatedDate, :taskDueDate, :taskStatus )";
        $sth = $this->db->prepare($sql);
        $sth->bindParam("taskUserId", $input['taskUserId']);
        $sth->bindParam("taskName", $input['taskName']);
        $sth->bindParam("taskCreatedDate", $input['taskCreatedDate']);
        $sth->bindParam("taskDueDate", $input['taskDueDate']);
        $sth->bindParam("taskStatus", $input['taskStatus']);
        $sth->execute();
        $input['id'] = $this->db->lastInsertId();
        return $this->response->withJson($input);
    });

    $app->put('/edit/[{id}]', function ($request, $response, $args) {
        $input = $request->getParsedBody();
        $sql = "UPDATE tasks SET 
            taskUserId=:taskUserId, 
            taskName=:taskName, 
            taskCreatedDate=:taskCreatedDate, 
            taskDueDate=:taskDueDate, 
            taskStatus=:taskStatus
        WHERE taskId=:id";
        $sth = $this->db->prepare($sql);
        $sth->bindParam("id", $args['id']);
        $sth->bindParam("taskUserId", $input['taskUserId']);
        $sth->bindParam("taskName", $input['taskName']);
        $sth->bindParam("taskCreatedDate", $input['taskCreatedDate']);
        $sth->bindParam("taskDueDate", $input['taskDueDate']);
        $sth->bindParam("taskStatus", $input['taskStatus']);
        $sth->execute();
        $input['id'] = $args['id'];
        return $this->response->withJson($input);
    });

    $app->put('/edit/status/[{id}]', function ($request, $response, $args) {
        $input = $request->getParsedBody();
        $sql = "UPDATE tasks SET 
            taskStatus=:taskStatus
        WHERE taskId=:id";
        $sth = $this->db->prepare($sql);
        $sth->bindParam("id", $args['id']);
        $sth->bindParam("taskStatus", $input['taskStatus']);
        $sth->execute();
        $input['id'] = $args['id'];
        return $this->response->withJson($input);
    });

    $app->delete('/delete/[{id}]', function ($request, $response, $args) {
        $sth = $this->db->prepare("DELETE FROM tasks WHERE taskId=:id");
        $sth->bindParam("id", $args['id']);
        $sth->execute();
        return $this->response->withJson(200);
    });

    $app->get('/get/[{id}]', function ($request, $response, $args) {
        $sth = $this->db->prepare("SELECT * FROM tasks WHERE taskId=:id");
        $sth->bindParam("id", $args['id']);
        $sth->execute();
        $tasks = $sth->fetchObject();
        return $this->response->withJson($tasks);
    });
   
});

$app->group('/users', function(\Slim\App $app) {

    $app->get('/',function(Request $request, Response $response, array $args) {
        $sth = $this->db->prepare("SELECT userId as id, userName as nome, userEmail as email FROM users");
        $sth->execute();
        $users = $sth->fetchAll();
        return $this->response->withJson($users);
    });


    $app->put('/edit/[{id}]', function ($request, $response, $args) {
        $input = $request->getParsedBody();
        $password = md5($input['userPassword']);
        $sql = "UPDATE users SET 
            userName=:userName, 
            userEmail=:userEmail, 
            userPassword=:userPassword
        WHERE userId=:id";
        $sth = $this->db->prepare($sql);
        $sth->bindParam("id", $args['id']);
        $sth->bindParam("userName", $input['userName']);
        $sth->bindParam("userEmail", $input['userEmail']);
        $sth->bindParam("userPassword", $password);
        $sth->execute();
        $input['id'] = $args['id'];
        return $this->response->withJson($input);
    });

    $app->delete('/delete/[{id}]', function ($request, $response, $args) {
        $sth = $this->db->prepare("DELETE FROM users WHERE userId=:id");
        $sth->bindParam("id", $args['id']);
        $sth->execute();
        $users = $sth->fetchAll();
        return $this->response->withJson($users, 200);
    });

    $app->get('/profile/[{id}]', function ($request, $response, $args) {
        $sth = $this->db->prepare("SELECT * FROM users WHERE userId=:id");
        $sth->bindParam("id", $args['id']);
        $sth->execute();
        if ($sth->rowCount() > 0) {
            $users = $sth->fetchObject();
            return $this->response->withJson($users);
        } else {
            return [];
        }
    });
   
});

