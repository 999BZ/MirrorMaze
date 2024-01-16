<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SolutionMazeController extends Controller
{
private $n;
    private $m;
    private $maze;

    private $start = array();
    private $end = array();

    private $path = array();
    public function bfs(Request $request){
        $this->maze = $request->query('data');
        $this->n = sizeof($this->maze);
        $this->m = sizeof($this->maze);
        $edges = $this->getEdges();
}
private function getEdges(){
        $edges = array();
        for($i=0;$i<$this->n;$i++){
            for($j=0;$j<$this->m;$j++){
                if($this->maze[$i][$j][3] == "Start"){
                    $this->start[0] = $i;
                    $this->start[1] = $j;
                }
                if($this->maze[$i][$j][1] == "End"){
                    $this->end[0] = $i;
                    $this->end[1] = $j;
                }
                if ($j < $this->m - 1 && $this->maze[$i][$j][1] == "Space") {
                    $edges[] = array(
                        'u' => array($i, $j),
                        'v' => array($i, $j + 1),
                        'directionU' => 1,
                        'directionV' => 3,
                    );
                }
                if ($i < $this->n - 1 && $this->maze[$i][$j][2] == "Space") {
                    $edges[] = array(
                        'u' => array($i, $j),
                        'v' => array($i + 1, $j),
                        'directionU' => 2,
                        'directionV' => 0,
                    );
                }
            }
        }
        return $edges;
    }
}