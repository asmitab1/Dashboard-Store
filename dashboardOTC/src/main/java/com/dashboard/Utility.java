package com.dashboard;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.csvreader.CsvReader;
import com.dashboard.resourcemanager.PropertiesCache;
import com.google.gson.Gson;

public class Utility {

	public static String OPEN_DEFECTS_CACHE_REGION = "defect";
	
	public static String DEFECTS_CHART_CACHE_REGION = "defect-chart";
	
	public static String DEFECTS_SEVERITY_CHART_CACHE_REGION = "defect-severity-chart";
	
	public static String SPRINT_BURNDOWN_CHART_CACHE_REGION = "burndown";
	
	public static String SPRINT_PROGRESS_CACHE_REGION = "sprint";
	
	public static String STORY_ASSIGNMENT_CACHE_REGION = "story-assignment";
	
	public static String RELEASE_CACHE_REGION = "release";
	
	public static String getObjetToJson(Object obj){
		Gson gson = new Gson();
		return gson.toJson(obj);
	}
	
	
	public static List<Map<String, Object>> readCSV(String fileName) throws IOException{

		URL url = Utility.class.getClassLoader()
				.getResource(fileName);

		CsvReader csvDetails = new CsvReader(url.getPath());
		csvDetails.readHeaders();
		List<Map<String, Object>> csvData = new ArrayList<Map<String,Object>>();
		Map<String, Object> csvRowData = null;
		int count = 0;
		while (csvDetails.readRecord())	{
			count++;
			csvRowData = new HashMap<String, Object>();
			csvRowData.put("Developer", csvDetails.get("Developer"));
			csvRowData.put("StoryId", csvDetails.get("Story Id"));
			csvRowData.put("StoryPoints", csvDetails.get("Story Points"));
			csvRowData.put("StoryDescription", csvDetails.get("Story Description"));
			csvRowData.put("Project", csvDetails.get("Project"));
			if(count % 2 == 0){
				csvRowData.put("class", "cls-first");
			} else {
				csvRowData.put("class", "cls-second");
			}
			csvData.add(csvRowData);
			
		}
		return csvData;
	}
}
