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

    private $queue = array();
    private $path = array();
    public function bfs(Request $request){
        $this->maze = $request->query('data');
        $this->n = sizeof($this->maze);
        $this->m = sizeof($this->maze);
        $edges = $this->getEdges();
        $this->queue = [[$this->start[0], $this->start[1], []]];
        while (!empty($this->queue)) {
            [$NodeX, $NodeY, $currentPath] = array_shift($this->queue);
            if ($NodeX == $this->end[0] && $NodeY == $this->end[1]) {
                $currentPath = array_merge($currentPath, [$NodeX . ',' . $NodeY]);
                foreach ($currentPath as $pair) {
                    list($x, $y) = explode(",", $pair);
                    $this->path[] = ['x' => (int)$x, 'y' => (int)$y];
                }
                return $this->path;
            }
            $this->queueNodes($NodeX, $NodeY, $edges, $currentPath);
        }
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

    private function queueNodes($i,$j,$edges,$currentPath){
        foreach ($edges as $edge) {
            if ($edge['u'][0] == $i && $edge['u'][1] == $j) {
                $nextNode = $edge['v'];
            } elseif ($edge['v'][0] == $i && $edge['v'][1] == $j) {
                $nextNode = $edge['u'];
            } else {
                continue;
            }
            if (!in_array($nextNode, $currentPath, true)) {
                $newPath = array_merge($currentPath, [$i . ',' . $j]);
                array_push($this->queue, [$nextNode[0], $nextNode[1], $newPath]);
            }
        }
    }
}