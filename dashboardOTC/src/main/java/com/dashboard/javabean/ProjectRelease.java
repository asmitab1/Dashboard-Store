package com.dashboard.javabean;


public class ProjectRelease{

	private String releaseName;
	private String startDate;
	private String endDate;
	private String[] keyFeatures;
	private String[] phaseNames;
	private String currentPhase;

	
	/**
	 * @return the keyFeatures
	 */
	public String[] getKeyFeatures() {
		return keyFeatures;
	}
	/**
	 * @param keyFeatures the keyFeatures to set
	 */
	public void setKeyFeatures(String[] keyFeatures) {
		this.keyFeatures = keyFeatures;
	}
	/**
	 * @return the startDate
	 */
	public String getStartDate() {
		return startDate;
	}
	/**
	 * @param startDate the startDate to set
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	/**
	 * @return the endDate
	 */
	public String getEndDate() {
		return endDate;
	}
	/**
	 * @param endDate the endDate to set
	 */
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getReleaseName() {
		return releaseName;
	}
	public void setReleaseName(String releaseName) {
		this.releaseName = releaseName;
	}
	/**
	 * @return the phaseNames
	 */
	public String[] getPhaseNames() {
		return phaseNames;
	}
	/**
	 * @param phaseNames the phaseNames to set
	 */
	public void setPhaseNames(String[] phaseNames) {
		this.phaseNames = phaseNames;
	}
	/**
	 * @return the currentPhase
	 */
	public String getCurrentPhase() {
		return currentPhase;
	}
	/**
	 * @param currentPhase the currentPhase to set
	 */
	public void setCurrentPhase(String currentPhase) {
		this.currentPhase = currentPhase;
	}
	
}
