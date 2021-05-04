var App = angular.module('drag-and-drop', ['ngDragDrop']);


App.controller('oneCtrl', function($scope, $timeout) {

  $scope.list1 = [];
  $scope.list2 = [];
  $scope.list3 = [];
  $scope.list4 = [];
  load($scope);
  
   $scope.$watch('listNew', function() {update('listNew',$scope.listNew); }, true); 
  $scope.$watch('list1', function() {update('list1',$scope.list1); }, true);
   $scope.$watch('list2', function() {update('list2',$scope.list2); }, true);
  
    
     
     function update(listName,list){
 
     		var task = {};
			
			var allTasks = localStorage.getItem("TaskManlist");	
			if(!allTasks) allTasks="{}";
			allTasks = JSON.parse(allTasks);
		
			allTasks[listName] = list;
		
			localStorage.setItem("TaskManlist",JSON.stringify(allTasks));
     }
  
   $scope.edit= function(title,deadline,desc,taskId) {
       $scope.title = title;
       $scope.desc = desc;
      $scope.deadline = deadline;
        $scope.taskId = taskId;
        var href = window.location.pathname;
		var dir = href.substring(0, href.lastIndexOf('/')) + "/uploads/"+taskId;
		var root = href.substring(0, href.lastIndexOf('/')) + "/uploads/";
		dir = dir.substring(1);
			 	
        $scope.link=dir;
	$scope.root=root;
       var x = document.getElementById("editForm");
       x.style.display = "block";

    }
    
    $scope.del= function(taskId) {
       		var allTasks = localStorage.getItem("TaskManlist");
			if(!allTasks) allTasks="{}";
			allTasks = JSON.parse(allTasks);
			var task = {};
			task['taskId'] = taskId;
			allTasks=delTask(task,allTasks);

    }



$scope.submit = function() {
        if ($scope.title) {
          var x = document.getElementById("newForm");
       	  x.style.display = "none";
          newElement($scope);
          load( $scope);
           
        }
      };
      
  $scope.commit= function() {

          var x = document.getElementById("editForm");
       	  x.style.display = "none";
         updateElement($scope);
          load( $scope);
           
        
      }
          
$scope.cancelEdit = function(){
  var x = document.getElementById("editForm");
       	  x.style.display = "none";
       	  	$scope.title="";
				  $scope.desc="";	
}

$scope.exportContent = function(){
var allTasks = localStorage.getItem("TaskManlist");	
expFile(allTasks);
}

$scope.importfile = function(){
var file =$scope.importfile;
var fileName = file.substring(file.lastIndexOf('\\')+1);
var href = window.location.pathname;
var fullPath = href.substring(1, href.lastIndexOf('/'))+"/"+fileName;


}

$scope.importContent = function(){
localStorage.setItem("TaskManlist",JSON.parse($scope.import));	
alert("Import Done");


}

$scope.help = function(){
alert("Attached local files:Copy files to ../uploads/{taskId} folder    \n Export tasks: Created TaskMan.export file to download folder.\n Import: Copy export file content to textarea.");
}

$scope.cancelNew = function(){
  var x = document.getElementById("newForm");
       	  x.style.display = "none";
       	  	$scope.title="";
				  $scope.desc="";	
}
      
  // Limit items to be dropped in list1
  $scope.optionsList1 = {
    accept: function(dragEl) {
      if ($scope.list1.length >= 2) {
        return false;
      } else {
        return true;
      }
    }
  };
});
 function load( $scope){

 			var allTasks = localStorage.getItem("TaskManlist");
			if(!allTasks) allTasks="{}";
			allTasks = JSON.parse(allTasks);
			
			var tasks = allTasks['listNew'];
			if(!tasks) tasks=new Array();		
			$scope.listNew = tasks;
			
			var tasks = allTasks['list1'];
			if(!tasks) tasks=new Array();		
			$scope.list1 = tasks;
			
			var tasks = allTasks['list2'];
			if(!tasks) tasks=new Array();		
			$scope.list2 = tasks;
			
			var tasks = allTasks['list3'];
			if(!tasks) tasks=new Array();		
			$scope.list3 = tasks;
			
			var tasks = allTasks['list4'];
			if(!tasks) tasks=new Array();		
			$scope.list4 = tasks;
			
			
 }
 
 
 function saveTextAsFile (data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        var blob = new Blob([data], {type: 'text/plain'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')
// FOR IE:

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
  }
  else{
      var e = document.createEvent('MouseEvents'),
          a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
      e.initEvent('click', true, false, window,
          0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
  }
}

function newElement($scope) {

			var task = {};
			task['title'] = $scope.title;
			
			
			 
	
			task['desc'] = $scope.desc;
			task['deadline'] = $scope.deadline;
			task['drag'] = true;
			task['taskId'] = task['title'].substring(0, 14)+"-"+Math.random().toString(36).substr(2, 3);
			var taskString = JSON.stringify(task);
			var allTasks = localStorage.getItem("TaskManlist");
			if(!allTasks) allTasks="{}";
			allTasks = JSON.parse(allTasks);
			var tasks = allTasks['list1'];
			if(!tasks) tasks=new Array();
			
			tasks = addNewTask(task,tasks);
			allTasks["list1"] = tasks;
			
			localStorage.setItem("TaskManlist",JSON.stringify(allTasks));
			
				 
				  for (index = 0; index < tasks.length; index++) { 
				    $scope.list1 =  tasks[index];
				  }
				  
				  $scope.title="";
				  $scope.desc="";
				  $scope.date="";
}

function updateElement($scope) {

			var task = {};
			task['title'] = $scope.title;
			  var href = window.location.pathname;
			 var dir = href.substring(0, href.lastIndexOf('/')) + "/uploads/";
			 dir = dir.substring(1);
			
			
			task['desc'] = $scope.desc;
			task['title'] = $scope.title;
			task['deadline'] = $scope.deadline;
		
			task['drag'] = true;
			task['taskId'] = $scope.taskId;
			var taskString = JSON.stringify(task);
			var allTasks = localStorage.getItem("TaskManlist");
			if(!allTasks) allTasks="{}";
			allTasks = JSON.parse(allTasks);
			var listName = getListName(task);
			var listTasks = allTasks[listName];
			if(!listTasks) tasks=new Array();
			
			listTasks = updateTask(task,listTasks);
			
			
			allTasks[listName] = listTasks;
		
			localStorage.setItem("TaskManlist",JSON.stringify(allTasks));
			
			
				 
				  
				  
				  $scope.title="";
				  $scope.desc="";
}

function getListName(task){
			var allTasks = localStorage.getItem("TaskManlist");
			if(!allTasks) allTasks="{}";
			allTasks = JSON.parse(allTasks);
			var list = allTasks["listNew"];
			for (index = 0; index < list.length; index++) {
				    if(task.taskId == list[index].taskId)  return "listNew";
				  }
			      var list = allTasks["list1"];
				  for (index = 0; index < list.length; index++) {
				    if(task.taskId == list[index].taskId)  return "list1";
				  }
				  var list = allTasks["list2"];
				  for (index = 0; index < list.length; index++) {
				    if(task.taskId == list[index].taskId)  return "list2";
				  }
				  var list = allTasks["list3"];
				  for (index = 0; index < list.length; index++) {
				    if(task.taskId == list[index].taskId)  return "list3";
				  }
				  var list = allTasks["list4"];
				  for (index = 0; index < list.length; index++) {
				    if(task.taskId == list[index].taskId)  return "list4";
				  }
}

function addNewTask(task,tasks){
	
	 tasks.push(task);
	 return tasks;
}

function updateTask(task,tasks){
	 tasks=delTask(task,tasks);
	 tasks.push(task);
	 return tasks;
}

function delTask(task,tasks){
	for (i = 0; i < tasks.length; i++) {
	  existing = tasks[i];
	  if(existing.taskId == task.taskId) {
	  	tasks.splice(i,1);
	  }
	 
	}
	
	 return tasks;
}

function expFile(content) {

var fileName = "TaskMan.export"
saveTextAsFile(JSON.stringify(content), fileName);
}

function showForm() {
		
  var x = document.getElementById("newForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  
}