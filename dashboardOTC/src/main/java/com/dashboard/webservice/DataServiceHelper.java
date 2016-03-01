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
import com.dashboard.javabean.MonthlyTicketCount;
import com.dashboard.javabean.ProgramStatistics;
import com.dashboard.javabean.ProjectConfig;
import com.dashboard.javabean.ProjectRelease;
import com.dashboard.javabean.ResourceWorkload;
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
					if (applicationID.equalsIgnoreCase(p.getProject())) {
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
}
