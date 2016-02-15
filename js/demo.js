
	var date= new Date().toISOString().substring(0, 10);
  		
  		// add function...
  	function add (arg) {
  		var title= document.getElementById('title').value,
			description= document.getElementById('description').value,
			start_date= document.getElementById('start_date').value,
  			end_date= document.getElementById('end_date').value;
  		
  		
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

			  			} else if(date > start_date ){
				  					alert("Please enter valid date");
				  					flag = false;

			  			} else if(end_date == ''){
			  				alert("Please specify your END date");
			  				flag = false;

			  			} else if (date > end_date ){
			  				alert("Sorry, the end date you specify is already gone... Thats mean your task is completed...")
			  				flag = false;

			  			}
			  			else{
			  				flag = true;
			  			}
			  			console.log(flag);
			  			return flag;
			  	}
  			
  			if(formValidate){
  				alert("Okay you have successfully added task.. Now Go and process the task");
  			}
  	}


  