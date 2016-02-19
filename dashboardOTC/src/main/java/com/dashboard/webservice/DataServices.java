package com.dashboard.webservice;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONException;

import com.dashboard.Utility;
import com.dashboard.resourcemanager.ApplicationCacheWrapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Path("services")
public class DataServices {

	@GET
	@Path("allprojects")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllprojects() {
		/*Gson gson = new Gson();
		BufferedReader br;
		ProjectConfigWrapper obj = JIRAWebserviceClient.getAllprojects();
		gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		String output = gson.toJson(obj);*/
		return Response.status(200).entity("").build();
	}
	
	@GET
	@Path("allReleases")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllReleases() {
		ApplicationCacheWrapper applicationCacheWrapper = ApplicationCacheWrapper.getCacheWrapperInstance();
		Object cacheObject = applicationCacheWrapper.getCachedObjectById(Utility.RELEASE_CACHE_REGION, "All Projects");
		//List<SpritDetailsVO> projectReleases = JIRAWebserviceClient.getReleaseDetailsForAllProjects();
		String output = Utility.getObjetToJson(cacheObject);
		return Response.status(200).entity(output).build();
	}
	
	
	@GET
	@Path("allOpenDefects")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllOpenDefects(@QueryParam("appID") String applicationID) {
		String output="";

		Object cacheObject = ApplicationCacheWrapper.getCacheWrapperInstance().getCachedObjectById(Utility.OPEN_DEFECTS_CACHE_REGION, applicationID);
		//defectClient.configureProperties();
		//String myCookie = defectClient.getAuthenticated();
		output = Utility.getObjetToJson(cacheObject);

		return Response.status(200).entity(output).build();
	}
	
	@GET
	@Path("defectsWithCategory")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCategoryWiseDefects(@QueryParam("appID") String applicationID) {
		String output="";	
		Object cacheObject = ApplicationCacheWrapper.getCacheWrapperInstance().getCachedObjectById(Utility.DEFECTS_CHART_CACHE_REGION, applicationID);
		//defectClient.configureProperties();
		//String myCookie = defectClient.getAuthenticated();
		output = Utility.getObjetToJson(cacheObject);
		return Response.status(200).entity(output).build();
	}
	
	@GET
	@Path("effortChart")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getEffortChartData(@QueryParam("appID") String applicationID) {
		return Response.status(200).entity("").build();
	}
	
	
	
	
	@GET
	@Path("defectsWithSeverity")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getDefectsWithPriority(@QueryParam("appID") String applicationID) {
		Object cacheObject = ApplicationCacheWrapper.getCacheWrapperInstance().getCachedObjectById(Utility.DEFECTS_SEVERITY_CHART_CACHE_REGION, applicationID);
		String output = Utility.getObjetToJson(cacheObject);
		return Response.status(200).entity(output).build();
	}
	
	@GET
	@Path("storyAssignment")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getStoryAssignment(@QueryParam("appID") String applicationID) {
		Object cacheObject = ApplicationCacheWrapper.getCacheWrapperInstance().getCachedObjectById(Utility.STORY_ASSIGNMENT_CACHE_REGION, applicationID);
		String output = Utility.getObjetToJson(cacheObject);
		return Response.status(200).entity(output).build();
	}

}
