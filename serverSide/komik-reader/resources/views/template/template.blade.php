<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('bootstrap') }}/css/bootstrap.css">
    <link rel="stylesheet" href="{{ asset('index.css') }}">
    <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Finger+Paint&family=Nunito:wght@300&family=Poppins:ital,wght@0,300;0,700;0,800;1,900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" />


    <style>
        body {
            font-family: 'Nunito';
        }
    </style>
</head>

<body class="antialiased">
    @include('template.navbar')
    <div class="row p-3">
        <div class="col-lg-2">
            @include('template.sidebar')
        </div>
        <div class="col-lg-10">
            @yield('content')
        </div>
    </div>



    <script src="{{ asset('boostrap') }}/js/bootstrap.js"></script>

</body>

</html>
