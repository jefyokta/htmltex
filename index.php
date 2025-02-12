<?php

use Dompdf\Dompdf;
use Dompdf\Options;
use Oktaax\Http\Request;
use Oktaax\Http\Response;
use Oktaax\Oktaax;
use Swoole\Coroutine;

require 'vendor/autoload.php';; 


$app = new Oktaax;

class Handler {

    

     static function latex($data){
        Coroutine::writeFile("content.tex",$data->latex);
        exec("pdflatex main.tex");

    }
    static function dompdf(Request $req){
        $options = new Options();
        $options->set('defaultFont', 'Times'); 
        $pdf = new Dompdf($options);        
    
        $css =    file_get_contents("style.css");
        $html =  "
        <html>
        <head>
        <style>
        {$css}
        </style>
        </head>
        <body class='page'>
     {$req->body['html']}
        </body>
        </html>
        ";
        //nyimpan buat history
        file_put_contents("dompdf.html",$html);
    
        $pdf->loadHtmlFile('dompdf.html');
        $pdf->setPaper('A4', 'portrait'); 
        $pdf->render();
    
        return $pdf->output();

    }
}


$app->post("/",function($req,$res){


    Coroutine::writeFile("ex.json",json_encode($req->body,JSON_PRETTY_PRINT));
$res->end();

});

$app->setServer('task_worker_num',2);

$app->post("/latex",function(Request $req, Response $res){
    $start =microtime(true);

    $data =$req->body;

    Handler::latex($data);
    echo "latex :". microtime(true) - $start.PHP_EOL;
    $res->sendfile('main.pdf');



    
});



$app->post("/dompdf",function ($req, Response $res) {
    $start =microtime(true);
  
    $res->end(Handler::dompdf($req));
    echo "dompdf: ".microtime(true) - $start.PHP_EOL;
});

$app->post('/async/dompdf',function($req,$res){

    xserver()->task($req);
    $res->end();

});
$app->post('/async/latex',function($req,$res){

    xserver()->task($req->body);
    $res->end();

});

$app->on("task",function($server, $task_id, $reactorId, $data){
    
    if ($data instanceof Request) {
        Handler::dompdf($data);
    }
    else {
        Handler::latex($data);
    }
   $server->finish($data);
});

$app->on('Finish', function ( $server, $task_id, $data)
{
    echo "Task#$task_id finished, data_len=" ;
});

$app->listen(3000)
?>