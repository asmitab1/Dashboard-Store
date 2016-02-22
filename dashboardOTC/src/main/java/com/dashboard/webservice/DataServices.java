package com.dashboard.webservice;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.dashboard.Utility;
import com.dashboard.javabean.DefectResolutionVO;
import com.dashboard.javabean.ProjectConfig;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@Path("services")
public class DataServices {
	
	DataServiceHelper dHelper = new DataServiceHelper();
	
	@GET
	@Path("allprojects")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllprojects() {
		Gson gson = new Gson();	
		ProjectConfig[] projects = dHelper.getAllprojects();
		gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		String output = gson.toJson(projects);
		return Response.status(200).entity(output).build();
	}
	
	@GET
	@Path("defectResolutions")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getdefectResolutions(@QueryParam("appID") String applicationID) {
		DefectResolutionVO[] resolutionVOs =  dHelper.getdefectResolutions(applicationID);
		String output = "";//Utility.getObjetToJson(cacheObject);
		return Response.status(200).entity(output).build();
	}
	
	
	@GET
	@Path("programStatistics")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProgramStatistics(@QueryParam("appID") String applicationID) {	
		String output = Utility.getObjetToJson(dHelper.getProgramStatistics(applicationID));
		return Response.status(200).entity(output).build();
	}
	
	
	@GET
	@Path("monthlyTicketCount")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getMonthlyTicketCount(@QueryParam("appID") String applicationID) {	
		String output = Utility.getObjetToJson(dHelper.getMonthlyTicketCount(applicationID));
		return Response.status(200).entity(output).build();
	}
	
}
