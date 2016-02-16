
	var date= new Date().toISOString().substring(0, 10),
		task= [];
  		
  		// add function...
  	function add () {
  		var title= document.getElementById('title').value,
			description= document.getElementById('description').value,
			start_date= document.getElementById('start_date').value,
  			end_date= document.getElementById('end_date').value,
  			lists= {};
  		
  		
  			var formValidate = validate();

  				function validate(){
  		//validate function
			  		var flag;

			  		if(title == ''){
			  				alert("Please mention your Task TITLE");
			  				flag = false;

			  			} else if(description == ''){
			  				alert("Please write DESCRIPTION");
			  				flag = false;

			  			}else if(start_date==''){
			  				alert("Please specify START date");
			  				flag = false;

			  			} else if(date > start_date){
				  					alert("Please enter valid date");
				  					flag = false;

			  			} else if(end_date == ''){
			  				alert("Please specify your END date");
			  				flag = false;

			  			} else if (date > end_date ){
			  				alert("Sorry, the END date you specify is already gone... Thats mean your task is completed...")
			  				flag = false;

			  			} else if(start_date > end_date){
			  				alert("Ooops!!! Your end time is set before start time...!!! Can you please correct it?");	
			  				flag = false;
			  			}
			  			else{
			  				flag = true;
			  			}
			  			
			  			return flag;
			  	}
  			
  			if(formValidate){

  				var status;
  				
  				if(start_date==date){
  					status = 'ACTIVE';
  				}
  				if(end_date==date){
  					status = 'WARNING';
  				}
  				if(start_date > date || end_date < date){
  					status = 'PROGRESS';
  				}
  				var id= Math.random();

  				lists= {
  							'ID': id,
  							'TITLE': title, 
  							'DESCRIPTION': description , 
  							'START_DATE': start_date , 
  							'END_DATE': end_date,
  							'STATUS' : status
  					};
  				task.push(lists);

  				var html= '<table class="table table-bordered">' +
  						  '<thead>'+	
  						  '<tr>'+
  						  '<th>Title</th>'+
  						  '<th>Description</th>'+
  						  '<th>Start Date</th>'+
  						  '<th>End Date</th>'+
  						  '<th>Status</th>'+
  						  '<th>Edit</th>'+
  						  '</tr>'+
  						  '</thead>'

	  			for(var i =0; i<task.length; i++){
	  					html+="<tr>";
	        			html+="<td>"+task[i].TITLE+"</td>";
	        			html+="<td>"+task[i].DESCRIPTION+"</td>";
	       				html+="<td>"+task[i].START_DATE+"</td>";
	       				html+="<td>"+task[i].END_DATE+"</td>";
	       				html+="<td class='status'>"+task[i].STATUS+"</td>";
	       				html+="<td><input type='submit' value='Is task Completed?' onclick='edit("+task[i].ID+")' ></td>";
	        			html+="</tr>"; 
	  				}
	  			html+="</table>";
	  			document.getElementById('box').innerHTML= html;
  				clearField();

  				function clearField(){
  				  document.getElementById('description').value='';
  				  document.getElementById('title').value='';
  				  document.getElementById('start_date').value='';
  				  document.getElementById('end_date').value='';

  				}
  				
  			}

 		return false;
  	}

function edit(value){
	// console.log(task);
	for(var i=0;i<task.length;i++){
		if(task[i].ID == value){
			task[i].STATUS = 'DONE'	;
			document.getElementsByClassName('status')[i].innerHTML= JSON.stringify(task[i].STATUS);
		}
		
	}
	alert("Wow!!! Congratulations!!! You completed your task");	
}