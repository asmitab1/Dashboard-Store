package com.dashboard.scheduler.job;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.dashboard.Utility;
import com.dashboard.resourcemanager.ApplicationCacheWrapper;

public class StoryAssignmentJob implements Job{

	private static final Logger LOGGER = Logger.getLogger(StoryAssignmentJob.class.getName());
	private ApplicationCacheWrapper applicationCacheWrapper = ApplicationCacheWrapper.getCacheWrapperInstance();
	
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		try {
			List<Map<String, Object>> readCSV = Utility.readCSV("story-assignment.csv");
			List<Map<String, List<Map<String, Object>>>> categorizedCSVDataByProject = categorizedCSVDataByProject(readCSV);
			for (Map<String, List<Map<String, Object>>> projectCSVData : categorizedCSVDataByProject) {
				for (String mapKey : projectCSVData.keySet()) {
					applicationCacheWrapper.saveToCache(Utility.STORY_ASSIGNMENT_CACHE_REGION, mapKey, projectCSVData.get(mapKey));
				}				
			}
		} catch (IOException e) {
			LOGGER.log(Level.FATAL, "Failed to cach data from CSV", e);
            throw new JobExecutionException(e); 
		}
	}

	private static List<Map<String, List<Map<String, Object>>>> categorizedCSVDataByProject(
			List<Map<String, Object>> readCSV) {
		
		List<Map<String, List<Map<String, Object>>>> projectStoryAssignmentList = new ArrayList<Map<String, List<Map<String, Object>>>>();
		Map<String, List<Map<String, Object>>> projectMap = null;
		Set<String> uniqueProject = new HashSet<String>();
		List<Map<String, Object>> storyAssignmentList = null;
		String project = "";
		for (Map<String, Object> map : readCSV) {
			project = (String) map.get("Project");
			if(uniqueProject.contains(project)){				
				List<Map<String, Object>> list = projectMap.get(project);
				list.add(map);
			} else {
				projectMap = new HashMap<String, List<Map<String,Object>>>();
				storyAssignmentList = new ArrayList<Map<String,Object>>();
				storyAssignmentList.add(map);
				projectMap.put(project, storyAssignmentList);	
				projectStoryAssignmentList.add(projectMap);
			}
			uniqueProject.add(project);
		}
		return projectStoryAssignmentList;
	}

}
