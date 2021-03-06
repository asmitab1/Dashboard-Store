package com.dashboard.webservice;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import com.dashboard.ProcessCSV;
import com.dashboard.javabean.DefectAssignment;
import com.dashboard.javabean.DefectResolution;
import com.dashboard.javabean.DefectWorkloadDemand;
import com.dashboard.javabean.Highlights;
import com.dashboard.javabean.EffortBurndown;
import com.dashboard.javabean.MonthlyTicketCount;
import com.dashboard.javabean.ProgramStatistics;
import com.dashboard.javabean.ProjectConfig;
import com.dashboard.javabean.ProjectRelease;
import com.dashboard.javabean.ResourceWorkload;
import com.dashboard.javabean.RunAgingData;
import com.dashboard.javabean.TaskAssignment;
import com.dashboard.resourcemanager.PropertiesCache;
import com.google.gson.Gson;

public class DataServiceHelper {

	public ProjectConfig[] getAllprojects() {

		ProjectConfig[] projects = null;
		FileReader fileReader = null;
		BufferedReader bufferedReader = null;
		Gson gson = new Gson();

		URL url = this.getClass().getClassLoader()
				.getResource("projects.config");

		String filePath = url.getPath();
		try {
			fileReader = new FileReader(filePath);
			bufferedReader = new BufferedReader(fileReader);
			String jsonText = IOUtils.toString(bufferedReader);
			JSONObject jsonObject = new JSONObject(jsonText);
			JSONArray jsonArray = jsonObject.getJSONArray("projectList");
			projects = gson.fromJson(jsonArray.toString(),
					ProjectConfig[].class);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				fileReader.close();
				bufferedReader.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return projects;
	}

	public Object getdefectResolutions(String applicationID) {
		Object defectResolutionsList = null;
		List<DefectResolution> defectResolutionsListFinal = new ArrayList<DefectResolution>();
		DefectResolution defectResolution = new DefectResolution();
		try {
			if (applicationID != null) {
				defectResolutionsList = ProcessCSV.execute(
						PropertiesCache.getInstance().getProperty(
								"DEFECTS_RESOLUTION_FILENAME"),
						defectResolution);
				for (DefectResolution p : (List<DefectResolution>) defectResolutionsList) {
					if (applicationID.equalsIgnoreCase(p.getTeam())) {
						defectResolutionsListFinal.add(p);
					}
				}
				defectResolutionsList = defectResolutionsListFinal;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return defectResolutionsList;
	}
	
	public Object getProgramStatistics(String applicationID) {
		Object programStatisticsList = null;
		List<ProgramStatistics> pStatisticsFinal = new ArrayList<ProgramStatistics>();

		ProgramStatistics programStatistics = new ProgramStatistics();
		try {
			programStatisticsList = ProcessCSV.execute(PropertiesCache.getInstance()
					.getProperty("PROGRAM_STATISTICS"), programStatistics);
			List<ProgramStatistics> pStatistics = (List<ProgramStatistics>) programStatisticsList;
			
			for (ProgramStatistics p: pStatistics){
				if(applicationID.equalsIgnoreCase(p.getTeam())) {
					pStatisticsFinal.add(p);
				}
			}
			programStatisticsList = pStatisticsFinal;
			
		} catch (IOException e) {
			e.printStackTrace();
		}

		return programStatisticsList;
	}
	
	
	public Object getMonthlyTicketCount(String applicationID) {
		Object monthlyTicketCountList = null;
		List<MonthlyTicketCount> monthlyTicketCountFinal = new ArrayList<MonthlyTicketCount>();
		MonthlyTicketCount monthlyTicketCount = new MonthlyTicketCount();
		try {
			monthlyTicketCountList = ProcessCSV.execute(PropertiesCache.getInstance()
					.getProperty("BACKLOG_MANAGEMENT_INDEX"), monthlyTicketCount);
			for (MonthlyTicketCount p: (List<MonthlyTicketCount>) monthlyTicketCountList){
				if(applicationID.equalsIgnoreCase(p.getTeam())) {
					monthlyTicketCountFinal.add(p);
				}
			}
			monthlyTicketCountList = monthlyTicketCountFinal;
		} catch (IOException e) {
			e.printStackTrace();
		}

		return monthlyTicketCountList;
	}
	
	public Object getResourceWorkload(String applicationID) {
		Object resourceWorkloadList = null;
		List<ResourceWorkload> resWorkloadListFinal = new ArrayList<ResourceWorkload>();
		ResourceWorkload resourceWorkload = new ResourceWorkload();
		try {
			resourceWorkloadList = ProcessCSV.execute(PropertiesCache.getInstance()
					.getProperty("RESOURCE_WORKLOAD_FILENAME"), resourceWorkload);
			for (ResourceWorkload p: (List<ResourceWorkload>) resourceWorkloadList){
				if(applicationID.equalsIgnoreCase(p.getTeam())) {
					resWorkloadListFinal.add(p);
				}
			}
			resourceWorkloadList = resWorkloadListFinal;
			
		} catch (IOException e) {
			e.printStackTrace();
		}

		return resourceWorkloadList;
	}
	
	public Object getdefectAssignment(String applicationID) {
		Object defectAssignmentList = null;
		List<DefectAssignment> defectAssignmentListFinal = new ArrayList<DefectAssignment>();
		DefectAssignment defectAssignment = new DefectAssignment();
		try {
			if (applicationID != null) {
				defectAssignmentList = ProcessCSV.execute(
						PropertiesCache.getInstance().getProperty(
								"DEFECT_ASSIGNMENT_FILENAME"),
								defectAssignment);
				for (DefectAssignment p : (List<DefectAssignment>) defectAssignmentList) {
					if (applicationID.equalsIgnoreCase(p.getTeam())) {
						defectAssignmentListFinal.add(p);
					}
				}
				defectAssignmentList = defectAssignmentListFinal;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return defectAssignmentList;
	}

	public Object getReleases(String applicationID) {

		ProjectRelease projectRelease = null;
		ProjectConfig[] projects = null;
		FileReader fileReader = null;
		BufferedReader bufferedReader = null;
		Gson gson = new Gson();

		URL url = this.getClass().getClassLoader()
				.getResource("projects.config");

		String filePath = url.getPath();
		try {
			fileReader = new FileReader(filePath);
			bufferedReader = new BufferedReader(fileReader);
			String jsonText = IOUtils.toString(bufferedReader);
			JSONObject jsonObject = new JSONObject(jsonText);
			JSONArray jsonArray = jsonObject.getJSONArray("projectList");
			projects = gson.fromJson(jsonArray.toString(),
					ProjectConfig[].class);
			
			for(ProjectConfig p: projects){
				if(applicationID.equals(p.getProjectId()) && p.getProjectRelease() != null){
					projectRelease = p.getProjectRelease();
				}
			}
			
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				fileReader.close();
				bufferedReader.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return projectRelease;
	}
	
	@SuppressWarnings("unchecked")
	public Object getHighlightsForDemand(String applicationID) {
		Object highlightsList = null;
		List<Highlights> highlightsListFinal = new ArrayList<Highlights>();
		Highlights highlights = new Highlights();
		try {
			if (applicationID != null) {
				highlightsList = ProcessCSV.execute(
						PropertiesCache.getInstance().getProperty(
								"HIGHLIGHTS_FILENAME"),
								highlights);
				for (Highlights p : (List<Highlights>) highlightsList) {
					if (applicationID.equalsIgnoreCase(p.getProject())) {
						highlightsListFinal.add(p);
					}
				}
				highlightsList = highlightsListFinal;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return highlightsList;
	
	}

	@SuppressWarnings("unchecked")
	public Object getBurnDownChartData(String applicationID) {
		Object effortBurndownList = null;
		List<EffortBurndown> effortBurndownListFinal = new ArrayList<EffortBurndown>();
		EffortBurndown effortBurndown = new EffortBurndown();
		try {
			if (applicationID != null) {
				effortBurndownList = ProcessCSV.execute(
						PropertiesCache.getInstance().getProperty(
								"EFFORT_BURNDOWN_FILENAME"),
								effortBurndown);
				for (EffortBurndown p : (List<EffortBurndown>) effortBurndownList) {
					if (applicationID.equalsIgnoreCase(p.getTeam())) {
						effortBurndownListFinal.add(p);
					}
				}
				effortBurndownList = effortBurndownListFinal;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return effortBurndownList;
	
	}

	public Object getTaskAssignments(String applicationID) {

		Object taskAssignmentsList = null;
		List<TaskAssignment> taskAssignmentsListFinal = new ArrayList<TaskAssignment>();
		TaskAssignment taskAssignment = new TaskAssignment();
		try {
			if (applicationID != null) {
				taskAssignmentsList = ProcessCSV.execute(
						PropertiesCache.getInstance().getProperty(
								"TASK_ASSIGNMENTS_FILENAME"),
								taskAssignment);
				for (TaskAssignment p : (List<TaskAssignment>) taskAssignmentsList) {
					if (applicationID.equalsIgnoreCase(p.getTeam())) {
						taskAssignmentsListFinal.add(p);
					}
				}
				taskAssignmentsList = taskAssignmentsListFinal;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return taskAssignmentsList;
	}
	
	
	public Object getDefectWorkloadDemand(String applicationID) {

		Object defectWorkloadDemandList = null;
		List<DefectWorkloadDemand> defectWorkloadDemandListFinal = new ArrayList<DefectWorkloadDemand>();
		DefectWorkloadDemand defectWorkloadDemand = new DefectWorkloadDemand();
		try {
			if (applicationID != null) {
				defectWorkloadDemandList = ProcessCSV.execute(
						PropertiesCache.getInstance().getProperty(
								"DEFECT_WORKLOAD"),
								defectWorkloadDemand);
				for (DefectWorkloadDemand p : (List<DefectWorkloadDemand>) defectWorkloadDemandList) {
					if (applicationID.equalsIgnoreCase(p.getTeam())) {
						defectWorkloadDemandListFinal.add(p);
					}
				}
				defectWorkloadDemandList = defectWorkloadDemandListFinal;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return defectWorkloadDemandList;
	}
	
	@SuppressWarnings("unchecked")
	public Object getRunAgingData(String applicationID) {

		Object runAgingDataList = null;
		List<RunAgingData> runAgingDataListFinal = new ArrayList<RunAgingData>();
		RunAgingData runAgingData = new RunAgingData();
		try {
			if (applicationID != null) {
				runAgingDataList = ProcessCSV.execute(
						PropertiesCache.getInstance().getProperty(
								"RUN_AGING_DATA"),
								runAgingData);
				for (RunAgingData p : (List<RunAgingData>) runAgingDataList) {
					if (applicationID.equalsIgnoreCase(p.getTeam())) {
						runAgingDataListFinal.add(p);
					}
				}
				runAgingDataList = runAgingDataListFinal;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return runAgingDataList;
	}
}
