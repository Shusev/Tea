<?
$adminemail="nikolayshusev@mail.ru";
$date=date("d.m.y");
$time=date("H:i");

$name = $_POST["name"];
$phone = $_POST["phone"];
$msg = '
                <html>
                    <head>
                        <title>'.Чай.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$name.'</p>
                        <p>Телефон: '.$phone.'</p>                        
                    </body>
                </html>';

// Для отправки HTML-письма должен быть установлен заголовок Content-type
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

mail("$adminemail", "$date $time Сообщение 
от $name", "$msg", "$headers");

