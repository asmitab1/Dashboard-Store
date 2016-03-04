 var canvas,
     context,
     sprintWidth = 80,
     barHeight = 30,
     projectContainer,
     currentProjectIndex = 0,
     currentProjectID,
     totalProjects,
     releaseWidth = 670,
     allProjectList,
     allProjectReleases,
     allDefectAssignments,
     noOfAssignedDefectsToShow = 6,
     defectChartdata,
     currSprintName,
	 pageRefreshInterval,
	 programStatisticsResponse,
	 intervalDuration = 30000;

 var storyProgressOptions = {
     width: 200,
     height: 150,
     greenColor: '#298A08',
     yellowColor: '#c0c0c0',
     redColor: '#ff9900',
     greenFrom: 0,
     greenTo: 20,
     yellowFrom: 20,
     yellowTo: 40,
     redFrom: 40,
     redTo: 50,
     //majorTicks: 50,
     minorTicks: 20,
     max: 50,
     min: 0
 };

 var burnDownChartOptions = {
     chart: {
         marginRight: 40
     },
     title: {
         text: ''
     },
     colors: ['#707070', '#3385FF'],
     plotOptions: {
         line: {
             lineWidth: 3
         },
         tooltip: {
             hideDelay: 200
         }
     },
     xAxis: {
         title: {
             text: 'Week',
             style: {
                 fontSize: '15px'
             }
         },
         categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6',
             'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15'
         ]
     },
     yAxis: {
         title: {
             text: 'Person Days',
             style: {
                 fontSize: '15px'
             }
         },
         plotLines: [{
             value: 0,
             width: 1
         }]
     },
     tooltip: {
         enabled: false
     },
     legend: {
         layout: 'vertical',
         verticalAlign: 'bottom',
         borderWidth: 0
     }
 };


 var sprintProgressnChartOptions = {
     chart: {
         type: 'column',
         options3d: {
             enabled: true,
             alpha: 15,
             beta: 15,
             viewDistance: 70,
             depth: 40
         },
         marginTop: 60,
         marginRight: 150,
         height: 340,
         width: 720
     },
     colors: ['#82D5FF', '#74FF74', '#3D06D2'],
     title: {
         text: ''
     },

     xAxis: {
         categories: ['Resolved-in month', 'Open-month end']
     },

     yAxis: {
         allowDecimals: false,
         min: 0,
         title: {
             text: ''
         }
     },

     tooltip: {
         headerFormat: '<b>{point.key}</b><br>',
         pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
     },

     plotOptions: {
         column: {
             stacking: 'normal',
             depth: 40,
             dataLabels: {
                 enabled: true,
                 formatter: function() {
                     if (this.y != 0) {
                         return this.y;
                     } else {
                         return null;
                     }
                 }
             }
         }
     },
     credits: {
         enabled: false
     },
     legend: {
         enabled: true,
         floating: true,
         layout: 'vertical',
         verticalAlign: 'middle',
         align: 'right',
         borderWidth: 0
     }
 };
	  
	  

 
 var runBookPieChartOptions = {
	     colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9',
	         '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'
	     ],
	     chart: {
	         type: 'pie',
	         backgroundColor: 'transparent',
	         margin: [0, 0, 0, 0],
	         spacing: [0, 0, 0, 0],
	         height: 350,
	         options3d: {
	             enabled: true,
	             alpha: 55,
	             beta: 0
	         },
	         animation: {
	        	 duration : 1000
	         }
	     },
	     title: {
	         text: ''
	     },
	     tooltip: {
	         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	     },
	     plotOptions: {
	         pie: {
	             allowPointSelect: true,
	             cursor: 'pointer',
	             depth: 35,
	             size: '100%',
	             dataLabels: {
	                 enabled: true,
	                 distance: 5,
	                 format: "{y}"
	             },
	             animation: {
	            	 duration: 1000
	             },
	             showInLegend: true
	         }
	     },
	     series: [{
	         type: 'pie',
	         name: 'Browser share',
	         data: []
	     }]
	 };



 /************* Hard Coded Data sections ************/
 
 var  runProgressDataTemplate = {
	         series: [{
            name: 'Task 1',
            stack: 'Tasks',
            data: [{
                x: 0,
                low: 7,
                high: 8
            }, {
                x: 1,
                low: 6.5,
                high: 7.5
            }]
        }, {
            name: 'Task 2',
            stack: 'Tasks',
            data: [{
                x: 0,
                low: 7.5,
                high: 9
            }, {
                x: 1,
                low: 7.5,
                high: 8.5
            }]
        }]
 } ;

 var monthlyTicketDataTemplate = {
     series: [{
         name: 'Open at month-end',
         data: [5, 2],
         stack: 'Ticket'
     }, {
         name: 'Resolved in month',
         data: [4, 6],
         stack: 'Ticket'
     },
	 {
            name: "Injection Rate",
            data: [ 49.9, 71.5],
            type: "line",
			zIndex: 42
        }]
 }

 var storyProgressData = [{
         series: [{
             name: 'Channel A- DEV',
             data: [18],
             yAxis: 0
         }, {
             name: 'Channel B- QA',
             data: [2],
             yAxis: 1
         }]
     },

     {
         series: [{
             name: 'Channel A- DEV',
             data: [18],
             yAxis: 0
         }, {
             name: 'Channel B- QA',
             data: [2],
             yAxis: 1
         }]
     }
 ];

 var burnDownChartDataTemplate = {
     subtitle: {
         text: 'Sprint #13',
         x: 0,
         style: {
             fontSize: '18px'
         }
     },
     series: [{
         name: 'Guideline',
         lineWidth: 2,

         data: []
     }, {
         name: 'Remaining Values',
         marker: {
             radius: 6
         },
         data: []
     }]
 };

 


 /************* Hard Coded Data sections ************/

 var services = {
     getAllProjects: function() {
         $.ajax({
             type: "GET",
             url: "/dashboard/rest/services/allprojects",
             async: false,
             dataType: "json",
             success: function(response) {
                 allProjectList = response;
                 currentProjectIndex = 0;
                 currentProjectID = allProjectList[currentProjectIndex].projectId;

                 totalProjects = response.length;
                 for (pjt in response) {
                     $("div#bb-bookblock").append(
                         '<div class="bb-item" id="item' + pjt + '"></div>'
                     );
                     $(".bb-item#item" + pjt).html($("#project-template").html());
                 }
                 Page.init();
                 selectProjectContainer(currentProjectIndex);			 
				 setupandServiceCall();
 
                
             },
             error: function(request, status, error) {
                 console.log(error);
             },
             failure: function(status) {
                 console.log(status);
             }
         });
     },
     getdefectResolutions: function(projectID) {
         $.ajax({
             type: "GET",
             url: "/dashboard/rest/services/defectResolutions?appID=" + projectID,
             async: false,
             dataType: "json",
             success: function(response) {
                 defectDetails = response;
                 if (defectDetails)
                     populatedefectDetails(defectDetails);
             },
             error: function(request, status, error) {
                 console.log(error);
             },
             failure: function(status) {
                 console.log(status);
             }
         });
     },
     getProgramStatistics: function(projectID) {
         $.ajax({
             type: "GET",
             url: "/dashboard/rest/services/programStatistics?appID=" + projectID,
             async: false,
             dataType: "json",
             success: function(response) {
				 programStatisticsResponse = response;
				 drawProgramStatisticsChartNew();

             },
             error: function(request, status, error) {
                 console.log(error);
             },
             failure: function(status) {
                 console.log(status);
             }
         });

     },
     getMonthlyTicketCount: function(projectID) {
         $.ajax({
             type: "GET",
             url: "/dashboard/rest/services/monthlyTicketCount?appID=" + projectID,
             async: false,
             dataType: "json",
             success: function(response) {
                 drawMonthlyChart(response);
             },
             error: function(request, status, error) {
                 console.log(error);
             },
             failure: function(status) {
                 console.log(status);
             }
         });
     },
     getResourceWorkload: function(projectID) {
         $.ajax({
             type: "GET",
             url: "/dashboard/rest/services/resourceWorkload?appID=" + projectID,
             async: false,
             dataType: "json",
             success: function(response) {
            	 allDefectAssignments = response;
                 if (allDefectAssignments)
                     populateDefectAssignment(allDefectAssignments);
             },
             error: function(request, status, error) {
                 console.log(error);
             },
             failure: function(status) {
                 console.log(status);
             }
         });

     },
     getdefectAssignment: function(projectID) {
         $.ajax({
             type: "GET",
             url: "/dashboard/rest/services/defectAssignment?appID=" + projectID,
             async: false,
             dataType: "json",
             success: function(response) {
            	 showDefectAssignment(response);
             },
             error: function(request, status, error) {
                 console.log(error);
             },
             failure: function(status) {
                 console.log(status);
             }
         });

     },
	 getAllReleases: function(projectID) {
         $.ajax({
             type: "GET",
             url: "/dashboard/rest/services/allReleases?appID=" + projectID,
             async: false,
             dataType: "json",
             success: function(response) {
                 allProjectReleases = response;
                 if (allProjectReleases)
					populateReleaseChart(allProjectReleases);
             },
             error: function(request, status, error) {
                 console.log(error);
             },
             failure: function(status) {
                 console.log(status);
             }
         });
     },
	 getBurnDownChartData: function(projectID) {
         $.ajax({
             type: "GET",
             url: "/dashboard/rest/services/burnDownChart?appID=" + projectID,
             async: false,
             dataType: "json",
             success: function(response) {
                 drawBurnDownChart(response);

             },
             error: function(request, status, error) {
                 console.log(error);
             },
             failure: function(status) {
                 console.log(status);
             }
         });
     },
	 getTaskAssignments: function(projectID) {
         $.ajax({
             type: "GET",
             url: "/dashboard/rest/services/taskAssignments?appID=" + projectID,
             async: false,
             dataType: "json",
             success: function(response) {
                 drawTaskAssignments(response);

             },
             error: function(request, status, error) {
                 console.log(error);
             },
             failure: function(status) {
                 console.log(status);
             }
         });
     },
	 getHighlights : function(projectID) {
		$.ajax({
             type: "GET",
             url: "/dashboard/rest/services/highlights?appID=" + projectID,
             async: false,
             dataType: "json",
             success: function(response) {
                 showHighlights(response);
             },
             error: function(request, status, error) {
                 console.log(error);
             },
             failure: function(status) {
                 console.log(status);
             }
         }); 
	 },
	 getDefectWorkloadDemand : function(projectID) {
			$.ajax({
	             type: "GET",
	             url: "/dashboard/rest/services/defectWorkloadDemand?appID=" + projectID,
	             async: false,
	             dataType: "json",
	             success: function(response) {
	            	 populateWorkloadDemand(response);
	             },
	             error: function(request, status, error) {
	                 console.log(error);
	             },
	             failure: function(status) {
	                 console.log(status);
	             }
	         }); 
		 },
		 getRunAgingData: function(projectID) {
	         $.ajax({
	             type: "GET",
	             url: "/dashboard/rest/services/runAgingData?appID=" + projectID,
	             async: false,
	             dataType: "json",
	             success: function(response) {
	            	 runAgingData = response;
	                 if (runAgingData)
	                	 drawRunBookPieChartOptions(runAgingData);
	             },
	             error: function(request, status, error) {
	                 console.log(error);
	             },
	             failure: function(status) {
	                 console.log(status);
	             }
	         });
	     },
	 
	 
 };

 $(function() {
	 google.charts.load('current', {'packages':['gantt']});
	 google.charts.setOnLoadCallback(function() {
		 services.getAllProjects();
		 	 $('body').on('click', '.toggle-button', function() {
		$(this).toggleClass('toggle-button-selected'); 
		pageFlipOnOff($(this));
	});
	 
     releaseWidth = $("#release").width();
     pageRefreshInterval = setInterval(function() {
         refreshProject();
     }, intervalDuration);
		 });
     
 });


 function refreshProject() {
	 if(allProjectList.length > 1) {
		 if (!allProjectList)
			 services.getAllProjects();
		 $(projectContainer).find("#myCarousel").carousel(0);
		 $(projectContainer).find("#myCarousel").carousel('pause');
		 if (currentProjectIndex < totalProjects - 1) {
			 currentProjectIndex++;
		 } else {
			 currentProjectIndex = 0;
		 }
		 currentProjectID = allProjectList[currentProjectIndex].projectId;
		 selectProjectContainer(currentProjectIndex);

		 setupandServiceCall();
		 $('#bb-nav-next').click();
	 }

 }


 function drawMonthlyChart(dynamicData) {
     var storyProgressDataDynamic = monthlyTicketDataTemplate;
	 var openTicketArray = new Array();
	 var closedTicketArray = new Array();
	 var injectedTicketArray = new Array();
	 var categories = new Array();
	  for (c in dynamicData) {
		  /*if(c == 0 ){
			 injectedTicketArray.push({x: 0 , y : dynamicData[c].initialTickets});
		  } */
		 openTicketArray.push(dynamicData[c].openTickets);
		 closedTicketArray.push(dynamicData[c].closedTickets);
		 categories.push(dynamicData[c].month);
		 injectedTicketArray.push(dynamicData[c].injectionRate);
	 }

     storyProgressDataDynamic.series[0].data = openTicketArray;
	 storyProgressDataDynamic.series[1].data = closedTicketArray;
	 storyProgressDataDynamic.series[2].data = injectedTicketArray;
	 sprintProgressnChartOptions.xAxis.categories =  categories;

     $(projectContainer).find('#chart-04').highcharts($.extend(sprintProgressnChartOptions, storyProgressDataDynamic));
 }
 
 
 function drawProgramStatisticsChart() {
	 $(projectContainer).find("#chart-02").empty();
	  dynamicData = programStatisticsResponse;
	  var runProgressData = new google.visualization.DataTable();
      runProgressData.addColumn('string', 'Task ID');
      runProgressData.addColumn('string', 'Task Name');
      runProgressData.addColumn('date', 'Start Date');
      runProgressData.addColumn('date', 'End Date');
      runProgressData.addColumn('number', 'Duration');
      runProgressData.addColumn('number', 'Percent Complete');
      runProgressData.addColumn('string', 'Dependencies');
	  
	  var dataRows = new Array();
	  
	  
	  var TodayDate = new Date();
	 var d = TodayDate.getDate();
	 var m = TodayDate.getMonth() + 1;
	 var y = TodayDate.getFullYear();
	 var totalProgressPercent = 0;
		 
		 for (c in dynamicData) {
			totalProgressPercent =  dynamicData[0].totalPercentageCalculation;
			var dataObj = new Array();
			var progressPercent = 100;
			dataObj.push(dynamicData[c].programName);
			dataObj.push(dynamicData[c].programName);
			dataObj.push( new Date(y +"/"+ m + "/"+ d + " "+ dynamicData[c].actualStartTime));
			var targetEnd = new Date(y +"/"+ m + "/"+ d + " "+ dynamicData[c].targetTime);
			var actualEnd = new Date(y +"/"+ m + "/"+ d + " "+ dynamicData[c].actualEndTime);
			if(targetEnd > actualEnd) {
				if(targetEnd > new Date()) {
					progressPercent = 50;
				} 
				dataObj.push(targetEnd);
			} else {
				if(actualEnd > new Date()) {
					progressPercent = 50;
				}
				dataObj.push(actualEnd);
			}
			dataObj.push(null);
			dataObj.push(progressPercent);
			dataObj.push(null);	 
			
			dataRows.push(dataObj);
		 }
		 
		 runProgressData.addRows(dataRows);
		 //document.getElementById("#myBar").setAttribute("style", "width: "+totalProgressPercent+"%;");
		 $(projectContainer).find("#myBar").css('width' , totalProgressPercent+"%");
		 $(projectContainer).find("#label").html(totalProgressPercent+"%");
		 var chart = new google.visualization.Gantt($(projectContainer).find("#chart-02").get(0));

		 chart.draw(runProgressData, { });
	 
 }
 
 function drawProgramStatisticsChartNew() {
	 var dynamicData = programStatisticsResponse;
	 var todayDate = new Date();
	 var d = todayDate.getDate();
	 var m = todayDate.getMonth() + 1;
	 var y = todayDate.getFullYear();
	 var totalProgressPercent = 0;
		if(d<10) {
		    d='0'+d;
		} 

		if(m<10) {
		    m='0'+m;
		} 

		todayDate = y+'-'+m+'-'+d;
	 var g = new JSGantt.GanttChart($(projectContainer).find("#chart-02").get(0), 'hour');

	 	
	 if( g.getDivId() != null ) {
		 g.setCaptionType('Complete');  // Set to Show Caption (None,Caption,Resource,Duration,Complete)
			//g.setQuarterColWidth(36);
			//g.setDateTaskDisplayFormat('day dd month yyyy'); // Shown in tool tip box
			//g.setDayMajorDateDisplayFormat('mon yyyy - Week ww') // Set format to display dates in the "Major" header of the "Day" view
			//g.setWeekMinorDateDisplayFormat('dd mon') // Set format to display dates in the "Minor" header of the "Week" view
			g.setShowTaskInfoLink(1); //Show link in tool tip (0/1)
			g.setUseSort(0);
			g.setShowRes(0);
			g.setShowDur(0);
			g.setShowComp(1);
			g.setShowStartDate(0);
			g.setShowEndDate(0); // Show/Hide the date for the last day of the week in header for daily view (1/0)
			g.setUseSingleCell(10000); // Set the threshold at which we will only use one cell per table row (0 disables).  Helps with rendering performance for large charts.
			g.setFormatArr('hour');
			var i=0;
	  for (c in dynamicData) {
		  	
			totalProgressPercent =  dynamicData[0].totalPercentageCalculation;
			var progressPercent = 100;
			var targetTimes= am_pm_to_hours(dynamicData[c].targetTime.trim());
			targetTimes = todayDate+' '+targetTimes;
			var actualEndTimes=am_pm_to_hours(dynamicData[c].actualEndTime.trim());
			actualEndTimes = todayDate+' '+actualEndTimes;
			var actualStartTimes=am_pm_to_hours(dynamicData[c].actualStartTime.trim());
			actualStartTimes = todayDate+' '+actualStartTimes;
			
			var targetEnd = new Date(y +"-"+ m + "-"+ d + " "+ dynamicData[c].targetTime);
			var actualEnd = new Date(y +"-"+ m + "-"+ d + " "+ dynamicData[c].actualEndTime);
			var actualStart = new Date(y +"-"+ m + "-"+ d + " "+ dynamicData[c].actualStartTime); 
			if(targetEnd > actualEnd) {
				if(targetEnd > new Date()) {
					progressPercent = 50;
				} 
			} else {
				if(actualEnd > new Date()) {
					progressPercent = 50;
				}
			}
		
		  g.AddTaskItem(new JSGantt.TaskItem(i++,dynamicData[c].programName,actualStartTimes,targetTimes,'gtaskblue', '', 0, '',progressPercent,0,0,0,'','','',g));
	}
			/*g.AddTaskItem(new JSGantt.TaskItem(11,  'Chart Object',         '2014-03-14','2014-04-14', 'gtaskyellow',   '',                 0, '',   99,   0,      0,       0,     '',      '',      '',      g));
			g.AddTaskItem(new JSGantt.TaskItem(121, 'Constructor Proc',     '2014-05-14','2014-06-14', 'gtaskblue',    '',                 0, '', 100,    0,      0,      0,     '',      '',      '',      g));*/
	  
	  g.Draw();
	 
	 
	 }
	
	  
	  
	  
	  
		 
		 //runProgressData.addRows(dataRows);
		 //document.getElementById("#myBar").setAttribute("style", "width: "+totalProgressPercent+"%;");
		 $(projectContainer).find("#myBar").css('width' , totalProgressPercent+"%");
		 $(projectContainer).find("#label").html(totalProgressPercent+"%");
		 //var chart = new google.visualization.Gantt($(projectContainer).find("#chart-02").get(0));

		// chart.draw(runProgressData, { });
	 

	 
 }
 
 function am_pm_to_hours(time) {
     var hours = Number(time.match(/^(\d+)/)[1]);
     var minutes = Number(time.match(/:(\d+)/)[1]);
     var AMPM = time.match(/\s(.*)$/)[1];
     if (AMPM == "PM" && hours < 12) hours = hours + 12;
     if (AMPM == "AM" && hours == 12) hours = hours - 12;
     var sHours = hours.toString();
     var sMinutes = minutes.toString();
     if (hours < 10) sHours = "0" + sHours;
     if (minutes < 10) sMinutes = "0" + sMinutes;
     return (sHours +':'+sMinutes);
}

 function createDefectChartData(defectData) {
     var chartDataArray = [];
     /*['Defect Category', 'Defect Count']*/
     var chartElement;
     for (c in defectData) {
         chartElement = [defectData[c].categoryName, defectData[c].count];
         chartDataArray.push(chartElement);
     }
     return chartDataArray;
 }

 function getCustomCodePosition(defectData) {
     for (c in defectData) {
         if (defectData[c].categoryName == "Custom Code Error") {
             return c;
         }
     }
     return undefined;
 }

 function drawDefectChart(chartDataArray, customCodePos) {
     defectChartOptions.series[0].data = chartDataArray;
     $(projectContainer).find('#defectChart').highcharts(defectChartOptions);
 }


 function getDefectCount(outstandingDefectData){
	 var count = 0;
	 for (var d in outstandingDefectData) {
		 count += outstandingDefectData[d].Urgent+outstandingDefectData[d].High+outstandingDefectData[d].Medium+outstandingDefectData[d].Low;
	 }
	 return count;
 }
 
 


 function populateDefectAssignment(outstandingDefectData) {
     var defectListHTML = "";
     var urgentCount = 0;
     var highCount = 0;
     var mediumCount = 0;
     var lowCount = 0;
     var defectCount = getDefectCount(outstandingDefectData);
     $(projectContainer).find("#outstanding-defect-count").html(defectCount);
     $(projectContainer).find(".outstanding-defect-list-header").show();
     $(projectContainer).find(".no-defects-msg").hide();
     if (outstandingDefectData.length == 0) {
         $(projectContainer).find(".outstanding-defect-list-header").hide();
         $(projectContainer).find(".no-defects-msg").show();
     }
     var rowCounter = 0,
         classNme;
     for (var d in outstandingDefectData){
    	 urgentCount += outstandingDefectData[d].Urgent;
    	 highCount += outstandingDefectData[d].High;
    	 mediumCount += outstandingDefectData[d].Medium;
    	 lowCount += outstandingDefectData[d].Low;
     }
     
     for (var d in outstandingDefectData) {
         rowCounter++;
         if (rowCounter % 2 == 0) {
             classNme = "even";
         } else {
             classNme = "odd";
         }
         defectListHTML += "<li class=" + classNme + "><span class='col1'>" + outstandingDefectData[d].Analyst + "</span> <span class='col2'>" + outstandingDefectData[d].Urgent +" </span> <span class='col2'>" + outstandingDefectData[d].High +"</span> <span class='col2'>" + outstandingDefectData[d].Medium + "</span> <span class='col2'>" + outstandingDefectData[d].Low +"</span> </li>";

         $(projectContainer).find(".outstanding-defect-list-header").html("<li> <span class='col1'> Support Analyst </span> <span class='col2'> Urgent("+urgentCount+")</span> <span class='col2'> High("+highCount+") </span>  <span class='col2'> Medium("+mediumCount+") </span> <span class='col2'> Low("+lowCount+") </span></li>");
     
     $(projectContainer).find("#outstanding_defect_list").html(defectListHTML);
	 
     }
	 
	 if (rowCounter > noOfAssignedDefectsToShow) {
         if ($(projectContainer).find('#ticker-flag').val() == "N") {
             $(projectContainer).find('#ticker-flag').val("Y");
             $(projectContainer).find('.news-container').vTicker({
                 speed: 1000,
                 pause: 3000,
                 animation: 'fade',
                 mousePause: false,
                 showItems: noOfAssignedDefectsToShow,
                 height: 400,
                 direction: 'up'
             });
         }
     }
 }
 
 function populateWorkloadDemand(outstandingDefectData) {
     var defectListHTML = "";
     var veryHighCount = 0;
     var highCount = 0;
     var mediumCount = 0;
     var lowCount = 0;
	 
	 var defectCount = 0;
	 for (var d in outstandingDefectData) {
		 defectCount += outstandingDefectData[d].veryHigh+outstandingDefectData[d].high+outstandingDefectData[d].medium+outstandingDefectData[d].low;
	 }
	 
     $(projectContainer).find("#outstanding-defect-count").html(defectCount);
     $(projectContainer).find(".outstanding-defect-list-header").show();
     $(projectContainer).find(".no-defects-msg").hide();
     if (outstandingDefectData.length == 0) {
         $(projectContainer).find(".outstanding-defect-list-header").hide();
         $(projectContainer).find(".no-defects-msg").show();
     }
     var rowCounter = 0,
         classNme;
     for (var d in outstandingDefectData){
    	 veryHighCount += outstandingDefectData[d].veryHigh;
    	 highCount += outstandingDefectData[d].high;
    	 mediumCount += outstandingDefectData[d].medium;
    	 lowCount += outstandingDefectData[d].low;
     }
	 
	 defectListHTML += '<ul class="outstanding-defect-list-header"></ul>';
     defectListHTML += " <ul id='outstanding_defect_list'>";
     for (var d in outstandingDefectData) {
         rowCounter++;
         if (rowCounter % 2 == 0) {
             classNme = "even";
         } else {
             classNme = "odd";
         }
         defectListHTML += "<li class=" + classNme + "><span class='col1'>" + outstandingDefectData[d].analyst + "</span> <span class='col2'>" + outstandingDefectData[d].veryHigh +" </span> <span class='col2'>" + outstandingDefectData[d].high +"</span> <span class='col2'>" + outstandingDefectData[d].medium + "</span> <span class='col2'>" + outstandingDefectData[d].low +"</span> </li>";

	 }  
	 
     defectListHTML +=  "</ul>";
     $(projectContainer).find("#chart-04").html(defectListHTML);
	 
	 $(projectContainer).find(".outstanding-defect-list-header").html("<li> <span class='col1'> Analyst </span> <span class='col2'> Very High("+veryHighCount+")</span> <span class='col2'> High("+highCount+") </span>  <span class='col2'> Medium("+mediumCount+") </span> <span class='col2'> Low("+lowCount+") </span></li>");
     
	 
	 if (rowCounter > noOfAssignedDefectsToShow) {
         if ($(projectContainer).find('#ticker-flag').val() == "N") {
             $(projectContainer).find('#ticker-flag').val("Y");
             $(projectContainer).find('.news-container').vTicker({
                 speed: 1000,
                 pause: 3000,
                 animation: 'fade',
                 mousePause: false,
                 showItems: noOfAssignedDefectsToShow,
                 height: 400,
                 direction: 'up'
             });
         }
     }
 }
 
 function drawRunBookPieChartOptions(dynamicData) {

     var chartDataArray = [];
     var chartElement;
     var chartFirstElement = {};
     var daysArray = ['0 to 30 days', '31 to 60 days', '61 to 90 days', 'Greater than 90 days'];
     var rubnBookDataArray = [dynamicData[0].firstQuarter, dynamicData[0].secondQuarter, dynamicData[0].thirdQuarter, dynamicData[0].fourthQuarter];
     
    /* chartFirstElement = {
    		 name: daysArray[0],
             y: rubnBookDataArray[0],
             sliced: true,
             selected: true,    		 	
    };
     
	chartDataArray.push(chartFirstElement);*/
    
     for (var i = 0; i < rubnBookDataArray.length; i++) {
    	 chartElement = [daysArray[i], rubnBookDataArray[i]];
    	 chartDataArray.push(chartElement);
     }
     
     runBookPieChartOptions.series[0].data = chartDataArray;
     $(projectContainer).find('#chart-02').highcharts(runBookPieChartOptions);
     var chart = $('#chart-02').highcharts();
     $('#chart-02').highcharts().redraw();
 }
 
 function setTranslation(p, slice) {
     p.sliced = slice;
     if (p.sliced) {
         p.graphic.animate(p.slicedTranslation);
     } else {
         p.graphic.animate({
             translateX: 0,
             translateY: 0});
     }
 }
 
 function populateDefectAssignment(outstandingDefectData) {
     var defectListHTML = "";
     var urgentCount = 0;
     var highCount = 0;
     var mediumCount = 0;
     var lowCount = 0;
     var defectCount = getDefectCount(outstandingDefectData);
     $(projectContainer).find("#outstanding-defect-count").html(defectCount);
     $(projectContainer).find(".outstanding-defect-list-header").show();
     $(projectContainer).find(".no-defects-msg").hide();
     if (outstandingDefectData.length == 0) {
         $(projectContainer).find(".outstanding-defect-list-header").hide();
         $(projectContainer).find(".no-defects-msg").show();
     }
     var rowCounter = 0,
         classNme;
     for (var d in outstandingDefectData){
    	 urgentCount += outstandingDefectData[d].Urgent;
    	 highCount += outstandingDefectData[d].High;
    	 mediumCount += outstandingDefectData[d].Medium;
    	 lowCount += outstandingDefectData[d].Low;
     }
     
     for (var d in outstandingDefectData) {
         rowCounter++;
         if (rowCounter % 2 == 0) {
             classNme = "even";
         } else {
             classNme = "odd";
         }
         defectListHTML += "<li class=" + classNme + "><span class='col1'>" + outstandingDefectData[d].Analyst + "</span> <span class='col2'>" + outstandingDefectData[d].Urgent +" </span> <span class='col2'>" + outstandingDefectData[d].High +"</span> <span class='col2'>" + outstandingDefectData[d].Medium + "</span> <span class='col2'>" + outstandingDefectData[d].Low +"</span> </li>";

         $(projectContainer).find(".outstanding-defect-list-header").html("<li> <span class='col1'> Support Analyst </span> <span class='col2'> Urgent("+urgentCount+")</span> <span class='col2'> High("+highCount+") </span>  <span class='col2'> Medium("+mediumCount+") </span> <span class='col2'> Low("+lowCount+") </span></li>");
     
     $(projectContainer).find("#outstanding_defect_list").html(defectListHTML);
	 
     }
	 
	 if (rowCounter > noOfAssignedDefectsToShow) {
         if ($(projectContainer).find('#ticker-flag').val() == "N") {
             $(projectContainer).find('#ticker-flag').val("Y");
             $(projectContainer).find('.news-container').vTicker({
                 speed: 1000,
                 pause: 3000,
                 animation: 'fade',
                 mousePause: false,
                 showItems: noOfAssignedDefectsToShow,
                 height: 400,
                 direction: 'up'
             });
         }
     }
 }
 
 
 function populatedefectDetails(defectDetails){
	 var defectListHTML = "";
	 var rowCounter = 0;
     $(projectContainer).find(".no-defects-msg").hide();
     if (defectDetails.length == 0) {
         $(projectContainer).find(".no-defects-msg").show();
     }
     for (var d in defectDetails) {
    	 rowCounter++;
		  
		  if(d==0) {
			  defectListHTML += "<div class='item active'>";
		  } else {
			  defectListHTML += "<div class='item'>";
		  }
     	 defectListHTML += "<ul class='defect_list_rows' id='defect_list_'"+rowCounter+"'>";
         defectListHTML += "<li class='even'><span class='col1'> Ticket Number </span> <span class='col3'>" + defectDetails[d].ticketNumber + "</span> </li>";
         defectListHTML += "<li class='even'><span class='col1'> Issue Description </span> <span class='col3'>" + defectDetails[d].issueDescription + "</span> </li>";
         defectListHTML += "<li class='even'><span class='col1'> Root Cause </span> <span class='col3'>" + defectDetails[d].rootCause + "</span> </li>";
         defectListHTML += "<li class='even'><span class='col1'> Resolution </span> <span class='col3'>" + defectDetails[d].resolution + "</span> </li>";
         defectListHTML += "<li class='even'><span class='col1'> Mitigated Risk Opportunity </span> <span class='col3'>" + defectDetails[d].mitigatedRiskOpportunity + "</span> </li>";
         defectListHTML += "</ul>";
		 defectListHTML += "</div>";
     }

     /*$("ul#defect_list_1").hide();
     $("ul#defect_list_2").hide();
     
     $("ul#defect_list_1").show();*/
     
     $(projectContainer).find("#defect_list").html(defectListHTML);

 }

 function selectProjectContainer(projectIndex) {
     projectContainer = $(".bb-item:eq(" + projectIndex + ")");
	 $(projectContainer).find("#projectName").text(allProjectList[currentProjectIndex].projectName);
 }


 function convertDate(dateStr) {
     var m_names = new Array("Jan", "Feb", "Mar",
         "Apr", "May", "Jun", "Jul", "Aug", "Sep",
         "Oct", "Nov", "Dec");
     var givendate = new Date(dateStr);
     var _date = givendate.getDate();
     var _month = givendate.getMonth();
     var _year = givendate.getFullYear();
     return m_names[_month] + " " + _date + ", " + _year;
 }

 function showDefectAssignment(jsonText) {
     var defectAssignmentHTML = "";
     $.each(jsonText, function(index, value) {
    	 defectAssignmentHTML += "<span >" + value.analyst + " :  Defect- " + value.storyId + " (<span class='story-desc'>" + value.storyDesc + "</span>) | </span>";
     });
     $(projectContainer).find("#story-assignment").html(defectAssignmentHTML);

 }
 
 function showHighlights(jsonText) {
     var defectAssignmentHTML = "";
     $.each(jsonText, function(index, value) {
    	 defectAssignmentHTML += "<span >" + value.analyst + " :  (<span class='story-desc'>" + value.description + "</span>) | </span>";
     });
     $(projectContainer).find("#story-assignment").html(defectAssignmentHTML);

 }
 
 function pageFlipOnOff($this){
	var $button=$this.find('button'),
		action = $button.attr('action');		
	if(action == 'pause'){
		$button.attr('action', 'play');
		clearInterval(pageRefreshInterval);
	} else if(action == 'play') {
		$button.attr('action', 'pause');
		refreshProject();
		pageRefreshInterval = setInterval(function() {
			 refreshProject();
		}, intervalDuration);
	} 
}

 
  function populateReleaseChart(sprintJSON, parentElement) {
	  var parentElement = $(projectContainer).find(".release-container");
	  var completed = 0, inProgress = 0, notStarted = 0 ,totalCount = 0;
	  
	  for(var ph in sprintJSON.phaseNames) {
		  totalCount++;
		  if(inProgress >0){
			  notStarted++;
		  } else if(sprintJSON.phaseNames[ph] == sprintJSON.currentPhase) {
			  inProgress++;
		  }else {
			  completed++;
		  }
	  }

     var totalWidth = Math.ceil(releaseWidth * .85);
     
     var releaseName = sprintJSON.releaseName;
     $(parentElement).find("#releaseName").html(releaseName);
     $(parentElement).find("#projectID").html(currentProjectID + " ");


     canvas = $(parentElement).find("#myCanvas").get(0);
     context = canvas.getContext('2d');
     context.clearRect(0, 0, canvas.width, canvas.height);

     var txt = sprintJSON.endDate;
     var txtWidth = context.measureText(txt).width;

     sprintWidth = Math.ceil(totalWidth / totalCount);

     totalWidth = sprintWidth * totalCount;


     $(parentElement).find("#myCanvas").attr('width', (totalWidth + Math.ceil(txtWidth / 2) + 20));

     var keyFeatures = sprintJSON.keyFeatures;
     var featureHtml = "<ul>";
     for (var feature in keyFeatures) {
         featureHtml += "<li> <span>" + keyFeatures[feature] + " </span></li>";
     }
     featureHtml += "</ul>";

     $(parentElement).find("#keyFeatures").find(".chart-stage").html(featureHtml);


     context.font = "14px Arial";

     var posX = 0;
     var allcounter = 0;

     var indicatorShift = (completed * sprintWidth + sprintWidth / 2 - 20);
     var rectYstart = canvas.height / 2 - barHeight / 2;

     for (var i = 0; i < completed; i++) {
         context.fillStyle = "green";
         context.fillRect(posX, rectYstart, sprintWidth, barHeight);
         context.strokeRect(posX, rectYstart, sprintWidth, barHeight);
         context.fillStyle = "white";
         context.fillText(sprintJSON.phaseNames[allcounter++], (posX + sprintWidth / 8), canvas.height * .5);
         posX = posX + sprintWidth;
     }

     for (var i = 0; i < inProgress; i++) {
         context.fillStyle = "#3ADC3A"; //"#FFCC00";
         context.fillRect(posX, rectYstart, sprintWidth, barHeight);
         context.strokeRect(posX, rectYstart, sprintWidth, barHeight);
         context.fillStyle = "black";
         context.fillText(sprintJSON.phaseNames[allcounter++], (posX + sprintWidth / 8), canvas.height * .5);
         posX = posX + sprintWidth;
     }

     for (var i = 0; i < notStarted; i++) {
         context.fillStyle = "#C0C0C0";
         context.fillRect(posX, rectYstart, sprintWidth, barHeight);
         context.strokeRect(posX, rectYstart, sprintWidth, barHeight);
         context.fillStyle = "black";
         context.fillText(sprintJSON.phaseNames[allcounter++], (posX + sprintWidth / 8), canvas.height * .5);
         posX = posX + sprintWidth;
     }

     var imgSrc = document.getElementById("currentSprint").src;
     var image = new Image();

     image.src = imgSrc;
     image.context = context;



     context.setLineDash([5]);
     context.beginPath();
     context.moveTo(posX, 20);
     context.lineTo(posX, rectYstart);
     context.strokeStyle = "black";
     context.stroke();


     context.beginPath();
     context.moveTo(posX, rectYstart + barHeight);
     context.lineTo(posX, canvas.height - 20);
     context.strokeStyle = "black";
     context.stroke();


     context.font = "12px Arial";
     context.fillStyle = "black";
     context.fillText(txt, posX - Math.floor(txtWidth / 2), 15);

     image.onload = function() {
         this.context.drawImage(this, indicatorShift, 0);
     };

 }
 
 function drawBurnDownChart(dynamicData) {
     var dayArray = [],
         idealEffortArray = [],
         effortArray = [];
	
         burnDownChartOptions.yAxis.title.text = 'Person Days';
         
     burnDownChartOptions.xAxis.categories = dayArray;
     
	  for (c in dynamicData) {
		 dayArray.push(dynamicData[c].week); 
		 if(dynamicData[c].pdLeft != 0){
			 effortArray.push(dynamicData[c].pdLeft);
		 }
         idealEffortArray.push(dynamicData[c].idealpdLeft);
     }

     burnDownChartDataTemplate.series[0].data = idealEffortArray;
     burnDownChartDataTemplate.series[1].data = effortArray;
     burnDownChartDataTemplate.subtitle.text = currSprintName;

     $(projectContainer).find('#chart-02').highcharts($.extend(burnDownChartOptions, burnDownChartDataTemplate));
 }
 
 function setupandServiceCall(){
	 if(allProjectList[currentProjectIndex].projectType == 'dev') {
					 $(projectContainer).find(".dev-view").show();
					 $(projectContainer).find(".support-view").remove();
					 $(projectContainer).find("#title-1").text('Release Milestone');
					 $(projectContainer).find("#title-2").text('Effort-Schedule Deviation');
					 $(projectContainer).find("#title-3").text('Task Assignments');
					 $(projectContainer).find("#title-4").html('UAT Defect Assignments  (<span id="outstanding-defect-count">0</span>)');
					 $(projectContainer).find(".variable-width-1").removeClass("col-sm-5");
					 $(projectContainer).find(".variable-width-1").addClass("col-sm-6");
					 $(projectContainer).find(".variable-width-2").removeClass("col-sm-7");
					 $(projectContainer).find(".variable-width-2").addClass("col-sm-6");
					 $(projectContainer).find(".variable-width-3").removeClass("col-sm-5");
					 $(projectContainer).find(".variable-width-3").addClass("col-sm-6");
					 $(projectContainer).find(".variable-width-4").removeClass("col-sm-7");
					 $(projectContainer).find(".variable-width-4").addClass("col-sm-6");
					 
					 $(projectContainer).find("#chart-04").css("min-height", "327px");
					 $(projectContainer).find("#chart-04").css("margin-top", "0px");
	
					 $(projectContainer).find("#myProgress").hide();
					 services.getAllReleases(currentProjectID);
					 services.getBurnDownChartData(currentProjectID);
					 services.getTaskAssignments(currentProjectID);
					 //services.getAllDefectAssignments(currentProjectID);
					 services.getHighlights(currentProjectID);
					 services.getDefectWorkloadDemand(currentProjectID);
				 } else {
					if(allProjectList[currentProjectIndex].runBookAvailable == 'no'){
						$(".dev-view").hide();
						$(".support-view").show();	
						 $(projectContainer).find("#title-1").text('Current Major RCA');
						 $(projectContainer).find("#title-2").text('Runbook Status for Tonight');
						 $(projectContainer).find("#title-3").text('Work Assignment');
						 $(projectContainer).find("#title-4").text('Backlog Management Index');	
						 $(projectContainer).find("#myProgress").hide();
						 services.getdefectResolutions(currentProjectID);
						 services.getRunAgingData(currentProjectID);
						 services.getMonthlyTicketCount(currentProjectID);
						 services.getResourceWorkload(currentProjectID);
						 services.getdefectAssignment(currentProjectID);
					}
					else{
						$(".dev-view").hide();
						$(".support-view").show();	
						 $(projectContainer).find("#title-1").text('Current Major RCA');
						 $(projectContainer).find("#title-2").text('Runbook Status for Tonight');
						 $(projectContainer).find("#title-3").text('Work Assignment');
						 $(projectContainer).find("#title-4").text('Backlog Management Index');					
						 services.getdefectResolutions(currentProjectID);
						 //services.getProgramStatistics(currentProjectID);
						 services.getMonthlyTicketCount(currentProjectID);
						 services.getResourceWorkload(currentProjectID);
						 services.getdefectAssignment(currentProjectID);
					}
				 }
 }
 
 function drawTaskAssignments(dynamicData) {
	 
	 var taskTable = "<table class ='table table-condensed table-striped task-table'>";
	
	 
	 taskTable += "<tr>";
	 taskTable += "<th>Developer</th>";
	 taskTable += "<th>Task</th>";
	 taskTable += "<th>Effort (in PD)</th>";
	 taskTable += "<th>Progress Percentage</th>";
	 taskTable += "</tr>";
	 
	 for(c in dynamicData) {
	 taskTable += "<tr>";
	 taskTable += "<td>"+dynamicData[c].developerName+"</td>";
	 taskTable += "<td>"+dynamicData[c].taskName+"</td>";
	 taskTable += "<td>"+dynamicData[c].totalPD+"</td>";
	 taskTable += '<td><div class="progress progress-striped"><div class="progress-bar bg" style="width: '+dynamicData[c].percentageCompl +'%"> '+dynamicData[c].percentageCompl +'</div> </div></td>';
	 taskTable += "</tr>";

	 }
	 taskTable += "</table>";
	 
$(projectContainer).find(".chart-03").html(taskTable);
	 
 }
