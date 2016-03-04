package com.dashboard.javabean;

import java.io.Serializable;

import com.google.gson.annotations.Expose;

public class ProjectConfig implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Expose
	private String projectId;
	@Expose
	private String projectName;
	@Expose
	private String projectType;
	private ProjectRelease projectRelease;
	@Expose
	private String runBookAvailable;

	public String getRunBookAvailable() {
		return runBookAvailable;
	}
	public void setRunBookAvailable(String runBookAvailable) {
		this.runBookAvailable = runBookAvailable;
	}
	/**
	 * @return the projectName
	 */
	public String getProjectName() {
		return projectName;
	}
	/**
	 * @param projectName the projectName to set
	 */
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	/**
	 * @return the projectType
	 */
	public String getProjectType() {
		return projectType;
	}
	/**
	 * @param projectType the projectType to set
	 */
	public void setProjectType(String projectType) {
		this.projectType = projectType;
	}
	/**
	 * @return the projectId
	 */
	public String getProjectId() {
		return projectId;
	}
	/**
	 * @param projectId the projectId to set
	 */
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	/**
	 * @return the projectRelease
	 */
	public ProjectRelease getProjectRelease() {
		return projectRelease;
	}
	/**
	 * @param projectRelease the projectRelease to set
	 */
	public void setProjectRelease(ProjectRelease projectRelease) {
		this.projectRelease = projectRelease;
	}
	
}
