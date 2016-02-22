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
import com.dashboard.javabean.DefectResolutionVO;
import com.dashboard.javabean.MonthlyTicketCount;
import com.dashboard.javabean.ProgramStatistics;
import com.dashboard.javabean.ProjectConfig;
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

	public DefectResolutionVO[] getdefectResolutions(String applicationID) {
		DefectResolutionVO[] dList = null;

		PropertiesCache.getInstance()
				.getProperty("DEFECTS_RESOLUTION_FILENAME");
		
		return null;
	}
	
	public Object getProgramStatistics(String applicationID) {
		Object programStatisticsList = null;

		ProgramStatistics programStatistics = new ProgramStatistics();
		try {
			programStatisticsList = ProcessCSV.execute(PropertiesCache.getInstance()
					.getProperty("PROGRAM_STATISTICS"), programStatistics);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return programStatisticsList;
	}
	
	
	public Object getMonthlyTicketCount(String applicationID) {
		Object monthlyTicketCountList = null;

		MonthlyTicketCount monthlyTicketCount = new MonthlyTicketCount();
		try {
			monthlyTicketCountList = ProcessCSV.execute(PropertiesCache.getInstance()
					.getProperty("BACKLOG_MANAGEMENT_INDEX"), monthlyTicketCount);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return monthlyTicketCountList;
	}
	
	public Object getResourceWorkload(String applicationID) {
		Object resourceWorkloadList = null;

		ResourceWorkload resourceWorkload = new ResourceWorkload();
		try {
			resourceWorkloadList = ProcessCSV.execute(PropertiesCache.getInstance()
					.getProperty("RESOURCE_WORKLOAD_FILENAME"), resourceWorkload);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return resourceWorkloadList;
	}
}
