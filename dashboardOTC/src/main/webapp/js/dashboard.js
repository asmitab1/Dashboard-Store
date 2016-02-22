 var canvas,
     context,
     sprintWidth = 80,
     barHeight = 30,
     projectContainer,
     currentProjectIndex = 0,
     currentProjectID,
     totalProjects,
     releaseWidth = 346,
     allProjectList,
     allProjectReleases,
     allDefectAssignments,
     noOfAssignedDefectsToShow = 5,
     defectChartdata,
     currSprintName,
	 pageRefreshInterval,
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
         height: 360,
         width: 500
     },
     colors: ['#74FF74', '#82D5FF', '#E4E4E4'],
     title: {
         text: ''
     },

     xAxis: {
         categories: ['Development', 'QA']
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

 var defectChartOptions = {
     colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9',
         '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'
     ],
     chart: {
         type: 'pie',
         backgroundColor: 'transparent',
         margin: [0, 0, 0, 0],
         spacing: [0, 0, 0, 0],
         height: 200,
         options3d: {
             enabled: true,
             alpha: 70,
             beta: 0
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
             depth: 20,
             dataLabels: {
                 enabled: true,
                 distance: 5,
                 format: "{y}"
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


 google.load("visualization", "1", {
     packages: ["gauge"]
 });
 google.load("visualization", "1", {
     packages: ["corechart"]
 });


 /************* Hard Coded Data sections ************/

 var storyProgressDataTemplate = {
     series: [{
         name: 'Completed',
         data: [5, 2],
         stack: 'Story'
     }, {
         name: 'In Progress',
         data: [4, 6],
         stack: 'Story'
     }, {
         name: 'Not Started',
         data: [1, 2],
         stack: 'Story'
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
                 for (pjt in response.projectList) {
                     $("div#bb-bookblock").append(
                         '<div class="bb-item" id="item' + pjt + '"></div>'
                     );
                     $(".bb-item#item" + pjt).html($("#project-template").html());
                 }
                 Page.init();
                 selectProjectContainer(currentProjectIndex);
                 services.getdefectResolutions(currentProjectID);
				 services.getProgramStatistics(currentProjectID);
				 services.getMonthlyTicketCount(currentProjectID);
                
             },
             error: function(request, status, error) {
                 console.log(error);
             },
             failure: function(status) {
                 console.log(status);
             }
         });
     },
     getdefectResolutions: function() {
         $.ajax({
             type: "GET",
             url: "/dashboard/rest/services/defectResolutions",
             async: false,
             dataType: "json",
             success: function(response) {
                 allProjectReleases = response;
                 if (allProjectReleases)
                     populateReleaseView(allProjectReleases[currentProjectIndex]);
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
     getMonthlyTicketCount: function(projectID) {
         $.ajax({
             type: "GET",
             url: "/dashboard/rest/services/monthlyTicketCount?appID=" + projectID,
             async: false,
             dataType: "json",
             success: function(response) {
                 if (response) {
                     var chartDataArray = createDefectChartData(response);
                     var customCodePos = getCustomCodePosition(response);
                     drawDefectChart(chartDataArray, customCodePos);
                 } else {
                     $(projectContainer).find('#defectChart').html("Category wise defect information is not available for this project.");
                 }
             },
             error: function(request, status, error) {
                 console.log(error);
             },
             failure: function(status) {
                 console.log(status);
             }
         });
     }
 };

 $(function() {
     services.getAllProjects();
 });

 $(document).ready(function() {
	 $('body').on('click', '.toggle-button', function() {
		$(this).toggleClass('toggle-button-selected'); 
		pageFlipOnOff($(this));
	});
	 
     releaseWidth = $("#release").width();
     pageRefreshInterval = setInterval(function() {
         refreshProject();
     }, intervalDuration);
 });



 function refreshProject() {
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
     populateReleaseView(allProjectReleases[currentProjectIndex]);
     services.getSprintDetailsData(currentProjectID);
     services.getAllDefectAssignments(currentProjectID);
     services.getSprintProgressChartData(currentProjectID);
     services.getStoryAssignment(currentProjectID);
     $('#bb-nav-next').click();

 }


 function drawBurnDownChart(dynamicData) {
     var dayArray = [],
         idealEffortArray = [],
         effortArray = [];
	if (currentProjectID == "Create") {	 
		 //effortArray = [84, 84, 84, 84, 84, 84, 84, 76, 110, 136, 136, 136, 136, 136, 136, 136, 123, 110, 110, 110, 110, 110, 110, 110, 123, 123];
		 effortArray = [110, 110, 106, 100, 100, 94, 88, 76, 76, 72, 70, 70, 66, 62, 58, 54, 50, 46, 46, 42, 42, 38, 34, 30, 26, 26];
	}else if(currentProjectID == "EZTool"){
		//effortArray = [ 13, 13, 13, 13, 31, 18, 18, 18, 18, 18, 45, 45, 45];
		effortArray = [ 63, 63, 52, 52, 48, 45, 31,31, 25, 25, 25, 18, 18];
	} else if(currentProjectID == "Connect"){
		//effortArray = [129, 129, 129, 116, 122, 88, 109, 109, 109, 110, 110, 76, 24, 12];
		effortArray = [122, 122, 116, 110, 109, 109, 109, 88, 88, 76, 70, 45, 24, 12];
	} 
		 
	if (currentProjectID == "Create" || currentProjectID == "Connect" || currentProjectID == "EZTool") {
         burnDownChartOptions.yAxis.title.text = 'Story Points';
		 //dynamicData[0].totalTimeEstimatedInDay = effortArray[0];
		 effortArray[0] = dynamicData[0].totalTimeEstimatedInDay;
	}
     else {
         burnDownChartOptions.yAxis.title.text = 'Person Days';
	 }

	 if(dynamicData[0].sprintSpanInDay < dynamicData[0].day) {
		dynamicData[0].sprintSpanInDay = dynamicData[0].day + 1;
	 }

     burnDownChartOptions.xAxis.categories = dayArray;
     for (c = 0; c < dynamicData[0].sprintSpanInDay; c++) {
         dayArray.push(c + 1);
         idealEffortArray.push(dynamicData[0].totalTimeEstimatedInDay - (dynamicData[0].totalTimeEstimatedInDay /( dynamicData[0].sprintSpanInDay -1)) * c);
     }
	if (currentProjectID != "Create" && currentProjectID != "Connect" && currentProjectID != "EZTool") {
	 effortArray.push(dynamicData[0].totalTimeEstimatedInDay);
     for (c = 1; c < dynamicData[0].day - 1; c++) {
         effortArray.push(dynamicData[0].totalTimeEstimatedInDay - ((dynamicData[0].totalTimeEstimatedInDay - dynamicData[0].remainingEffort) / dynamicData[0].day) * c + 2);
     }
	  for (c in dynamicData) {
         effortArray.push(dynamicData[c].remainingEffort);
     }
	}

    /*if (currentProjectID == "Acuity"){
		effortArray = [];
	for (c = 0; c < idealEffortArray.length; c++) {
         effortArray.push(idealEffortArray[c]*1.1 );
     }
	 effortArray.push(0);
	}*/

     burnDownChartDataTemplate.series[0].data = idealEffortArray;
     burnDownChartDataTemplate.series[1].data = effortArray;
     burnDownChartDataTemplate.subtitle.text = currSprintName;

     $(projectContainer).find('#burndowncontainer').highcharts($.extend(burnDownChartOptions, burnDownChartDataTemplate));
 }

 function drawSPChart(dynamicData) {
     var storyProgressDataDynamic = storyProgressDataTemplate;
     storyProgressDataDynamic.series[0].data = [dynamicData.storyCompleteCountDEV, dynamicData.storyCompleteCountQA];
     storyProgressDataDynamic.series[1].data = [dynamicData.storyWIPCountDEV, dynamicData.storyWIPCountQA];
     storyProgressDataDynamic.series[2].data = [dynamicData.storyNotStartedCountDEV, dynamicData.storyNotStartedCountQA];
     $(projectContainer).find('#chart-01').highcharts($.extend(sprintProgressnChartOptions, storyProgressDataDynamic));
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

 function drawSeverityWiseDefectChart(dynamicData) {

     var chartDataArray = [];
     /*['Defect Category', 'Defect Count']*/
     var chartElement;
     for (c in dynamicData) {
         chartElement = [dynamicData[c].priorityName.split("-")[1], dynamicData[c].count];
         chartDataArray.push(chartElement);
     }
     defectChartOptions.series[0].data = chartDataArray;
     $(projectContainer).find('#defectSeverityChart').highcharts(defectChartOptions);

 }

 function getDefectCountForPriority(priorityArray, priority) {
     for (var i in priorityArray) {
         if (priorityArray[i].priority == priority) {
             return priorityArray[i].count;
         }
     }
     return "-";
 }

 function getOutstandingDefectCount(outstandingDefectData) {
     var count = 0;
     for (var d in outstandingDefectData) {
         for (var i in outstandingDefectData[d].priority) {
             count += outstandingDefectData[d].priority[i].count;
         }
     }
     return count;
 }
  function getCategoryWiseTotalCount(outstandingDefectData, inpriority){
	   var count = 0;
	   for (var d in outstandingDefectData) {
		   for (var i in outstandingDefectData[d].priority) {
			   if(outstandingDefectData[d].priority[i].priority == inpriority){
					count += outstandingDefectData[d].priority[i].count;
			   }
         } 
	   }
	   return count;
  }


 function populateDefectAssignment(outstandingDefectData) {
     //$(projectContainer).find('.news-container').vTicker('stop');
     var outstandingDefectCount = getOutstandingDefectCount(outstandingDefectData);
     $(projectContainer).find("#outstanding-defect-count").html(outstandingDefectCount);
     var defectListHTML = "";
     $(projectContainer).find(".outstanding-defect-list-header").show();
     $(projectContainer).find(".no-defects-msg").hide();
     if (outstandingDefectData.length == 0) {
         $(projectContainer).find(".outstanding-defect-list-header").hide();
         $(projectContainer).find(".no-defects-msg").show();
     }
     var rowCounter = 0,
         classNme;

     for (var d in outstandingDefectData) {
         rowCounter++;
         if (rowCounter % 2 == 0) {
             classNme = "even";
         } else {
             classNme = "odd";
         }
         if (currentProjectID == "Acuity") {
             defectListHTML += "<li class=" + classNme + "> <span class='col1'>" + outstandingDefectData[d].name + "</span> <span class='col2'>" + getDefectCountForPriority(outstandingDefectData[d].priority, "1- Resolve Immediately") + "</span> <span class='col2'>" + getDefectCountForPriority(outstandingDefectData[d].priority, "2- High") + "</span> <span class='col2'>" + getDefectCountForPriority(outstandingDefectData[d].priority, "3- Normal") + "</span> <span class='col2'>" + getDefectCountForPriority(outstandingDefectData[d].priority, "4- Low") + "</span> </li>";
         } else if (currentProjectID == "Connect" || currentProjectID == "Create" || currentProjectID == "EZTool") {
             defectListHTML += "<li class=" + classNme + "> <span class='col1'>" + outstandingDefectData[d].name + "</span> <span class='col3'>" + getDefectCountForPriority(outstandingDefectData[d].priority, "1-Urgent") + "</span> <span class='col3'>" + getDefectCountForPriority(outstandingDefectData[d].priority, "2-Very High") + "</span> <span class='col3'>" + getDefectCountForPriority(outstandingDefectData[d].priority, "3-High") + "</span> <span class='col3'>" + getDefectCountForPriority(outstandingDefectData[d].priority, "4-Medium") + "</span> <span class='col3'>" + getDefectCountForPriority(outstandingDefectData[d].priority, "5-Low") + "</span> </li>";
         }
     }
	 
     if (currentProjectID == "Acuity" || currentProjectID == "OAS") {
         $(projectContainer).find(".outstanding-defect-list-header").html("<li><span class='col1'> Name</span> <span class='col2'> Resolve Immediately ("+ getCategoryWiseTotalCount(outstandingDefectData, "1- Resolve Immediately")+")</span> <span class='col2'> High ("+ getCategoryWiseTotalCount(outstandingDefectData, "2- High")+")</span> <span class='col2'> Normal ("+ getCategoryWiseTotalCount(outstandingDefectData, "3- Normal")+")</span>  <span class='col2'> Low ("+ getCategoryWiseTotalCount(outstandingDefectData, "4- Low")+")</span></li>");
     } else {
         $(projectContainer).find(".outstanding-defect-list-header").html("<li><span class='col1'> Name</span> <span class='col3'>Urgent ("+ getCategoryWiseTotalCount(outstandingDefectData, "1-Urgent")+")</span> <span class='col3'> Very High ("+ getCategoryWiseTotalCount(outstandingDefectData, "2-Very High")+")</span>  <span class='col3'> High ("+ getCategoryWiseTotalCount(outstandingDefectData, "3-High")+")</span> <span class='col3'> Medium ("+ getCategoryWiseTotalCount(outstandingDefectData, "4-Medium")+")</span>  <span class='col3'> Low ("+ getCategoryWiseTotalCount(outstandingDefectData, "5-Low")+")</span></li>");
     }
     $(projectContainer).find("#outstanding_defect_list").html(defectListHTML);

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

 function selectProjectContainer(projectIndex) {
     projectContainer = $(".bb-item:eq(" + projectIndex + ")");
 }

 function populateReleaseView(projectDetails) {
     allReleases = projectDetails["releases"];
     //$(projectContainer).find("#projectName").text(projectDetails["projectName"]);
	 if(currentProjectID == "Create") {
		$(projectContainer).find("#projectName").html("<img src='images/create_logo_us_fpo.png'/>");	 
	 } else if (currentProjectID == "Connect") {
		 $(projectContainer).find("#projectName").html("<img src='images/MHHE_Connect_homepage.png'/> Green");	 
	 } else if(currentProjectID == "Acuity") {
		 $(projectContainer).find("#projectName").html("<img src='images/Acuity_logo.png'/>");		 
	 } else if (currentProjectID == "EZTool") {
		 $(projectContainer).find("#projectName").html("<img src='images/MHHE_Connect_homepage.png'/> Tools");	 
	 } 

     $(projectContainer).find(".carousel-inner").children().filter(function(index) {
         if (index > 0) return true;
     }).remove();

     for (var count = 1; count < allReleases.length; count++) {
         var obj = $(projectContainer).find(".carousel-inner .item:eq(0)").clone();
         $(obj).removeClass("active");
         $(projectContainer).find(".carousel-inner").append(obj);
     }
     for (var index in allReleases) {
         populateReleaseChart(allReleases[index], $(projectContainer).find(".releaseContainer:eq(" + index + ")"));
     }

 }

 function populateReleaseChart(sprintJSON, parentElement) {
     var totalWidth = Math.ceil(releaseWidth * .85);
     var completed = parseInt(sprintJSON.completed);
     var inProgress = parseInt(sprintJSON.inProgress);
     var notStarted = parseInt(sprintJSON.notStarted);
     var totalCount = parseInt(sprintJSON.totalCount);
     var releaseName = sprintJSON.releaseName;
     $(parentElement).find("#releaseName").html(releaseName);
     $(parentElement).find("#projectID").html(currentProjectID + " ");


     canvas = $(parentElement).find("#myCanvas").get(0);
     context = canvas.getContext('2d');
     context.clearRect(0, 0, canvas.width, canvas.height);

     var txt = sprintJSON.targetDate;
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
         context.fillText(sprintJSON.sprintNames[allcounter++], (posX + sprintWidth / 8), canvas.height * .5);
         posX = posX + sprintWidth;
     }

     for (var i = 0; i < inProgress; i++) {
         context.fillStyle = "#3ADC3A"; //"#FFCC00";
         context.fillRect(posX, rectYstart, sprintWidth, barHeight);
         context.strokeRect(posX, rectYstart, sprintWidth, barHeight);
         context.fillStyle = "black";
         context.fillText(sprintJSON.sprintNames[allcounter++], (posX + sprintWidth / 8), canvas.height * .5);
         posX = posX + sprintWidth;
     }

     for (var i = 0; i < notStarted; i++) {
         context.fillStyle = "#C0C0C0";
         context.fillRect(posX, rectYstart, sprintWidth, barHeight);
         context.strokeRect(posX, rectYstart, sprintWidth, barHeight);
         context.fillStyle = "black";
         context.fillText(sprintJSON.sprintNames[allcounter++], (posX + sprintWidth / 8), canvas.height * .5);
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

 function updateSprintDetails(dynamicData) {
     currSprintName = dynamicData.name.replace(/"/g, "");
     var startDate = convertDate(dynamicData.startDate.substr(0, 10));
     var endDate = convertDate(dynamicData.endDate.substr(0, 10));
     $(projectContainer).find("#sprint-name").html(currSprintName);
     $(projectContainer).find("#sprint-start-date").html(startDate);	 
     $(projectContainer).find("#sprint-end-date").html(endDate);
     $(projectContainer).find("#sprint-total-story-count").html(dynamicData.totalStoryCount);
     $(projectContainer).find("#sprint-total-story-points").html(dynamicData.totalStoryPoints);
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

 function showStoryAssignment(jsonText) {
     var storyAssignmentHTML = "";
     $.each(jsonText, function(index, value) {
         storyAssignmentHTML += "<span class='" + value.class + "'>" + value.Developer + " :  Story- " + value.StoryId + " (<span class='story-desc'>" + value.StoryDescription + "</span>) | </span>";
     });
     $(projectContainer).find("#story-assignment").html(storyAssignmentHTML);

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