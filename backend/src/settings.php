<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        "jwt" => [
            'secret' => 'supersecretkeyyoushouldnotcommittogithub'
        ],

        // Monolog settings
        
         // Database connection settings           
          "db" => [
            "host" => "desafio.tasks",
            "dbname" => "tasks",
            "user" => "root",
            "pass" => ""
        ],
    ],
];
