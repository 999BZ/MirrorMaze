<?php

use App\Http\Controllers\SolutionMazeController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\GenerateMazeController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



Route::get('/generateMaze/{difficulty}',  [GenerateMazeController::class, 'generateMaze']);


Route::post('/solution/{solution}',  [SolutionMazeController::class, 'solution']);
